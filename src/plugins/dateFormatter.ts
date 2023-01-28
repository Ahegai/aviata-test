import dayjs from 'dayjs'
import 'dayjs/locale/ru'

type TDateTime = {
  date: string
  time: string
}

export const dateFormatter = (_date: string): TDateTime => {
  let date = _date.split(' ')[0]
  const time = _date.split(' ')[1]
  date = dayjs(date).locale("ru").format("DD MMM, dd")
  return {
    date: date, 
    time: time
  }
}

export const timeFormatter = (_time: number): string => {
  const h = Math.floor(_time / 3600);
  const m = Math.floor(_time % 3600 / 60);
  
  return `${h} ч ${m} м`; 
}

export const stopDifferent = (arr: string, dep: string) => {
  const difference = dayjs(arr).diff(dep)
  console.log(difference)
  return timeFormatter(difference / 1000)
}