import moment from 'moment'

import Layout from '../constants/Layout'

function getDelimeters(numberOfDelimeters: number) {
  const add = 100 / (numberOfDelimeters + 1)
  return [...new Array(numberOfDelimeters)].map((_, idx) => (idx + 1) * add)
}

function getTimeIndexes(numberOfIndexes: number, length: number) {
  const delimeters = getDelimeters(numberOfIndexes - 2)
  const calculated = delimeters.map((d) => Math.ceil((d * length) / 100))
  return [0, ...calculated, length]
}

export function getChartOptions(
  data: {
    value: number
    time: string
  }[],
  interval: 'DAY' | '3DAYS' | 'WEEK' | '2WEEKS',
) {
  if (interval === 'DAY') {
    const timeIndexes = getTimeIndexes(4, data.length)
    return {
      labels: data.map((d, idx: number) => {
        if (timeIndexes.includes(idx)) {
          return d.time
        } else {
          return ''
        }
      }),
      width: Layout.window.width,
      dotRadius: Layout.window.width / data.length / 2,
    }
  } else if (interval === '3DAYS') {
    const timeIndexes = getTimeIndexes(5, data.length)
    return {
      labels: data.map((d, idx: number) => {
        if (timeIndexes.includes(idx)) {
          return d.time
        } else {
          return ''
        }
      }),
      width: Layout.window.width * 1.5,
      dotRadius: (Layout.window.width * 1.5) / data.length / 2,
    }
  } else if (interval === 'WEEK') {
    const timeIndexes = getTimeIndexes(7, data.length)
    return {
      labels: data.map((d, idx: number) => {
        if (timeIndexes.includes(idx)) {
          return d.time
        } else {
          return ''
        }
      }),
      width: Layout.window.width * 4,
      dotRadius: (Layout.window.width * 4) / data.length / 2,
    }
  } else if (interval === '2WEEKS') {
    const timeIndexes = getTimeIndexes(12, data.length)
    return {
      labels: data.map((d, idx: number) => {
        if (timeIndexes.includes(idx)) {
          return d.time
        } else {
          return ''
        }
      }),
      width: Layout.window.width * 8,
      dotRadius: (Layout.window.width * 8) / data.length / 2,
    }
  } else {
    return {
      labels: data.map((d) => d.time),
      width: Layout.window.width,
      dotRadius: Layout.window.width / data.length,
    }
  }
}

export function formatDate(date?: string): string {
  if (!date) {
    return ''
  }
  const isAnotherDay = !moment(date).isSame(moment(), 'day')

  if (!isAnotherDay) {
    return moment(date).format('HH:mm')
  }

  const isBefore24Hours = !moment(date).isBetween(moment().subtract(1, 'day'), moment(), 'hours', '[]')

  if (!isBefore24Hours) {
    return moment(date).format('HH:mm')
  }

  const isAnotherYear = !moment(date).isSame(moment(), 'year')

  if (isAnotherDay && !isAnotherYear) {
    return moment(date).format('DD.MM. HH:mm')
  } else {
    return moment(date).format('DD.MM.YYYY HH:mm')
  }
}
