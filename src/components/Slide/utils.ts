import {ChartData, ChartDataset} from 'chart.js'
import cloneDeep from 'lodash.clonedeep'

export function normaliseArray(array: number[], total?: number) {
  const sum = total ?? array.reduce((a, b) => a + b, 0)
  return array.map(number => number / sum)
}

export const originalDatasets: Record<string, Record<string, ChartDataset>> = {}

export function normalizeChartDataY(data: ChartData['datasets'], id: string, totals?: number[]) {
  const yAxis: number[][] = Array(data[0].data.length).fill(0).map(() => [])
  for (const set of data) {
    originalDatasets[id] ??= {}
    originalDatasets[id][set.label as string] = cloneDeep(set)
    set.data.forEach((number, i) => yAxis[i].push(number as number))
  }
  yAxis.map((numbers, x) => {
    normaliseArray(numbers, totals ? totals[x] : undefined)
      .forEach((number, y) => data[y].data[x] = number)
  })
  return data
}
