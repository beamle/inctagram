import { useEffect, useState } from 'react'

export const useTriggerAddTimeout = (trigger: boolean, timeOut: number) => {
  const [switcher, setSwitcher] = useState(false)
  let timerId: NodeJS.Timeout

  useEffect(() => {
    if (trigger) setSwitcher(true)
    else timerId = setTimeout(() => setSwitcher(false), timeOut)
  }, [trigger])
  useEffect(() => {
    return clearTimeout(timerId)
  }, [])

  return { switcher }
}
