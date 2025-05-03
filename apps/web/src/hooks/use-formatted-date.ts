import dayjs from 'dayjs'

type Options = {
  relative?: boolean
  format?: string
}

export const useFormattedDate = (date: Date | string, options: Options = {}) => {
  const {
    relative = false,
    format = 'MMM D, YYYY'
  } = options

  const now = new Date()
  const convertedDate = typeof date === 'string' ? new Date(date) : date

  if (relative) {
    const weeksDiff = dayjs().diff(date, 'week')

    if (Math.abs(weeksDiff) > 1) {
      return dayjs(convertedDate).format(format)
    } else {
      const diff = dayjs(convertedDate).diff(now, 'day')
      if (diff === 0) return 'Today'
      if (diff === 1) return 'Tomorrow'
      if (diff === -1) return 'Yesterday'
      if (diff > 0) return `${diff} days from now`
      return `${Math.abs(diff)} days ago`
    }
  } else {
    return dayjs(convertedDate).format(format)
  }
}
