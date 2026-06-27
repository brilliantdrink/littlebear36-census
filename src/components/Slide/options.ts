import {ChartOptions, LegendItem, Plugin, Scale} from 'chart.js'
import {originalDatasets} from './utils'

const font = {
  family: 'Karla',
  size: 16,
  lineHeight: 1.2,
}

export const common = (id: string, tiny: boolean): ChartOptions => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 12,
      right: 32,
      top: -12,
      bottom: 0,
    },
  },
  // when animations are enabled, the line annotation often is rendered in the wrong place
  animation: false,
  plugins: {
    // legend: {labels: {font}},
    legend: {
      display: false
    },
    // @ts-ignore
    htmlLegend: {
      id
    },
    tooltip: {
      yAlign: 'center',
      callbacks: {
        label: tooltipItem => {
          const totalAmount = originalDatasets[id][tooltipItem.dataset.label as string].data[tooltipItem.dataIndex]
          const percentage = (tooltipItem.raw as number * 100).toFixed(2) + '%'
          return `${tooltipItem.dataset.label?.replace(/\[\w+] /, '')}: ${percentage} (${totalAmount})`
        }
      },
      titleFont: font,
      bodyFont: font,
      footerFont: font,
    },
    datalabels: {
      labels: {
        sets: {
          anchor: 'center',
          align: 'center',
          textAlign: 'center',
          color: 'black',
          font,
          formatter: (value, context) => {
            const data = originalDatasets[id][context.dataset.label as string]
              ?? originalDatasets[id + '-async_poll'][context.dataset.label as string]
            const totalAmount = data.data[context.dataIndex]
            let label = (context.dataset.label as string).replace(/\[\w+] /, '')
            const maxCharacters = 22
            if (label.length > maxCharacters) {
              label = label.substring(0, maxCharacters - 2) + '…'
            }
            const roundedPercentageValue = tiny
              ? Math.round(Number(value) * 100)
              : Math.round(Number(value) * 100 * 100) / 100
            const percentage = roundedPercentageValue + '%'
            if (!value || value < .015) return ''
            else if (tiny || value < .05) return percentage
            else if (value < .05) return percentage
            else if (value < .10) return label + '\n' + percentage
            else return label + '\n' + percentage + '\n' + totalAmount
          }
        },
        stacks: {
          align: 'bottom',
          anchor: 'start',
          font,
          formatter: (value, context) => {
            // @ts-ignore
            if (context.dataset.intraStackIndex !== 0) return ''
            else {
              if (tiny) {
                if (context.dataset.stack?.toLowerCase().startsWith('async')) return 'Async Poll'
                if (context.dataset.stack?.toLowerCase().startsWith('sync')) return 'Sync Poll'
                return context.dataset.stack
              } else {
                return context.dataset.stack
              }
            }
          }
        },
      },
    },
    annotation: {
      annotations: [{
        type: 'line',
        yMin: 1,
        yMax: 1,
        borderColor: 'rgba(255, 255, 255, .2)',
        borderWidth: 2,
        label: {
          display: true,
          position: '0%',
          content: '100%',
          color: 'rgba(255, 255, 255, .4)',
          backgroundColor: 'rgba(0, 0, 0, .6)',
          borderRadius: 0,
          padding: 3,
        }
      }]
    }
  },
})

export const stackedBarChart = (id: string, tiny: boolean = false): ChartOptions => ({
  ...common(id, tiny),
  scales: {
    x: {
      stacked: true,
      ticks: {
        callback(this: Scale, value: number) {
          if (tiny) {
            const [month, year] = this.getLabelForValue(value).split(' ')
            return month.substring(0, 3) + ' \'' + year.substring(2, 4)
          } else {
            return this.getLabelForValue(value)
          }
        },
        // minRotation: tiny ? 90 : 0,
        // maxRotation: 90,
        font,
        padding: 24,
      }
    },
    y: {
      stacked: true,
      ticks: {
        display: false,
        callback: value => (Number(value) * 100) + '%',
        font
      }
    }
  },
})

const legendSpacingPlugin: Plugin = {
  id: 'legendSpacingPlugin',
  beforeInit(chart) {
    if (!chart.legend) return
    const originalFit = chart.legend.fit
    chart.legend.fit = function fit() {
      originalFit.bind(chart.legend)()
      this.height += 15
    }
  },
}

const htmlLegendPlugin: Plugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const items = chart.options.plugins?.legend?.labels?.generateLabels?.(chart) as LegendItem[]
    const syncEl = document.getElementById(options.id + '-sync-legend') as HTMLElement
    const asyncEl = document.getElementById(options.id + '-async-legend') as HTMLElement

    if (syncEl) syncEl.innerHTML = ''
    if (asyncEl) asyncEl.innerHTML = ''


    items.forEach((item, index) => {
      const li = document.createElement('li')
      li.style.cursor = 'pointer'
      li.style.display = 'flex'
      li.style.alignItems = 'center'
      li.style.marginBottom = '5px'

      /*li.onclick = () => {
        chart.setDatasetVisibility(item.datasetIndex as number, !chart.isDatasetVisible(item.datasetIndex as number))
        chart.update()
      };*/

      li.innerHTML = `
        <span style="background-color:${item.fillStyle};"></span>
        ${item.text.replace(/\[\w+] /, '')}
      `

      // Route datasets to specific legend boxes
      if (item.text.startsWith('[Synchronous]')) {
        syncEl?.appendChild(li)
      } else {
        asyncEl?.appendChild(li)
      }
    });
  }
}

export const plugins: Plugin[] = [legendSpacingPlugin, htmlLegendPlugin]
