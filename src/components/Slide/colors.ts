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

export const trans = ['#5bcefa', '#f5a9b8', '#fff']
