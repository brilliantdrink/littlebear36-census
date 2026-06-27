import {createMemo, createSignal, JSX, onMount, Show} from 'solid-js'
import {Bar, DefaultChart, Scatter} from 'solid-chartjs'
import {Chart, ChartData, Colors, Legend, LinearScale, Title, Tooltip} from 'chart.js'
import DataLabels from 'chartjs-plugin-datalabels'
import Annotation from 'chartjs-plugin-annotation'
import {createWindowSize} from '@solid-primitives/resize-observer'
import {createMediaQuery} from '@solid-primitives/media'

import styles from './slide.module.scss'
import {plugins, stackedBarChart} from './options'
import getStackedBarData from './getStackedBarData'
import {trans} from './colors'

export default function BarChartSlide({dataFile, asyncPollDataFile, title, note}: {
  dataFile?: string,
  asyncPollDataFile?: string,
  title: string,
  note?: string | JSX.Element
}) {
  const [data, setData] = createSignal<ChartData>(null!)
  const size = createWindowSize()
  const isMedium = createMediaQuery("(max-width: 1200px)")
  const isVertical = createMediaQuery("(max-width: 1100px)")
  const isSmall = createMediaQuery("(max-width: 700px)")
  const isTiny = createMediaQuery("(max-width: 600px)")
  let chartWrapper: HTMLDivElement = null!
  const canvasWidth = createMemo(() => {
    if (isVertical()) {
      return chartWrapper?.getBoundingClientRect().width ?? 0
    } else return undefined
  })
  const canvasHeight = createMemo(() => {
    // if (isVertical()) {
      return chartWrapper?.getBoundingClientRect().height ?? 0
      // console.log(size.height - 1200)
      // return 300
    // }
    // return size.height * .8 - 22 * 2
  })

  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors, DataLabels, LinearScale, Annotation)
    getStackedBarData(dataFile, asyncPollDataFile, title)
      .then(data => {
        if (title.toLowerCase().includes('trans')) {
          data.datasets.forEach((d, i) => {
            d.backgroundColor = trans[i % trans.length]
          })
        }
        return data
      })
      .then(setData)
  })

  return <>
    <div class={styles.slide}>
      <h2>{title}</h2>
      {note && <p class={styles.note}>{note}</p>}
      <div class={styles.legends}>
        <Show when={!!dataFile}>
          <span>Synchronous Poll</span>
          <div class={styles.legend} id={`${title}-sync-legend`}></div>
        </Show>
        <Show when={!!asyncPollDataFile}>
          <span>Asynchronous Poll</span>
          <div class={styles.legend} id={`${title}-async-legend`}></div>
        </Show>
      </div>
      {/* @ts-ignore */}
      <div class={styles.chartWrapper} ref={chartWrapper}>
        <Bar
          data={data()} options={stackedBarChart(title, isTiny())} plugins={plugins}
          height={canvasHeight()} width={canvasWidth()} />
      </div>
    </div>
  </>
}
