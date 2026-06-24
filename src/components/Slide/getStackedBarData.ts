import {parse} from 'csv-parse/browser/esm/sync'
import {ChartData} from 'chart.js'
import {color} from './colors'
import {normalizeChartDataY} from './utils'
import cloneDeep from 'lodash.clonedeep'

export default async function getStackedBarData(url: string | undefined, asyncPollUrl: string | undefined, id: string) {
  const datasets = []
  const labels = new Set<string>()

  if (url) {
    const csvText = await fetch(url).then(res => res.text())
    const res = parse(csvText) as string[][]
    ;(res.shift() as string[]).forEach(item => item && labels.add(item))
    datasets.push(...normalizeChartDataY(res.map((groupData, index, arr) => {
      const label = '[Synchronous] ' + groupData.shift()
      return {
        label,
        data: groupData.map(Number),
        backgroundColor: color(index, arr.length),
        stack: 'Synchronous Poll'
      }
    }), id))
  }

  if (asyncPollUrl) {
    const csvText = await fetch(asyncPollUrl).then(res => res.text())
    const res = parse(csvText) as string[][]
    const surveyeesRowIndex = res.findIndex(([name]) => name === 'SURVEYEES')
    const surveyees = surveyeesRowIndex === -1
        ? undefined
        : res.splice(surveyeesRowIndex, 1)[0].map(Number)
    surveyees?.shift()
    ;(res.shift() as string[]).forEach(item => item && labels.add(item))
    datasets.push(...normalizeChartDataY(res.map((groupData, index, arr) => {
      const label = '[Asynchronous] ' + groupData.shift()
      return {
        label,
        data: groupData.map(Number),
        backgroundColor: color(index, arr.length),
        stack: 'Asynchronous Poll'
      }
    }), id, surveyees))
  }

  const data: ChartData = {
    labels: labels.values().toArray(),
    datasets
  }
  return data
}
