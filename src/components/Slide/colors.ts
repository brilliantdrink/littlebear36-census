/*export const colors = [
  '#40A4D8', '#33BEB7', '#B2C224',
  '#FECC2F', '#F8A227', '#F66222',
  '#DC393A', '#EF647B', '#A564DA',
  '#7464da', '#4359ec', '#328ecf',
]*/

import Color from 'color'

export function color(i: number, of: number) {
  // const base = Color.hsv(Math.max(40, 360 / (of)) * i, 70, 80)
  // const colorValues = base.lab().array()
  // return Color.lab(60, colorValues[1], colorValues[2]).hex()
  const chromaStep = Math.min(40, Math.max(30, 360 / of))
  return Color.lch(65, 90, chromaStep * i + -120).hex()
}

/*export const colors = [
  '#457B9D','#2A9D8F','#4d9c4b',
  '#97cb40', '#efbe47', '#f19751',
  '#E76F51'
]*/
