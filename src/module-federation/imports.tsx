import { ElementType, lazy, useEffect, useState } from 'react'

export const MessengerApp = (props: any) => {
  const [Component, setComponent] = useState<ElementType | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line import/no-unresolved
      setComponent(lazy(() => import('messenger/messenger')))
    }
  }, [])

  return <div>{Component && <Component {...props} />}</div>
}
