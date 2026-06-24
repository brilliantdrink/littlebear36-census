import {createMemo, createSignal, JSX, onMount, Show} from 'solid-js'
import {Bar} from 'solid-chartjs'
import {Chart, ChartData, Colors, Legend, LinearScale, Title, Tooltip} from 'chart.js'
import DataLabels from 'chartjs-plugin-datalabels'
import {createWindowSize} from '@solid-primitives/resize-observer'
import {createMediaQuery} from '@solid-primitives/media'

import styles from './slide.module.scss'
import {plugins, stackedBarChart} from './options'
import getStackedBarData from './getStackedBarData'

export default function BarChartSlide({dataFile, asyncPollDataFile, title, note}: {
  dataFile?: string,
  asyncPollDataFile?: string,
  title: string,
  note?: string | JSX.Element
}) {
  const [data, setData] = createSignal<ChartData>(null!)
  const size = createWindowSize()
  const isMedium = createMediaQuery("(max-width: 1200px)")
  const isSmall = createMediaQuery("(max-width: 700px)")
  const isTiny = createMediaQuery("(max-width: 600px)")
  const canvasWidth = createMemo(() => {
    if (isSmall()) return size.width - 36
    else if (isMedium()) return size.width * .8
    else return size.width * .6
  })
  const canvasHeight = createMemo(() => {
    return size.height * .8 - 22 * 2
  })

  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors, DataLabels, LinearScale)
    getStackedBarData(dataFile, asyncPollDataFile, title).then(setData)
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
      <Bar class={styles.chart} data={data()} options={stackedBarChart(title, isTiny())} plugins={plugins}
           height={canvasHeight()} />
    </div>
  </>
}
