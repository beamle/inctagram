import { ElementType, useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

export const MessengerApp = (props: any) => {
  const [Component, setComponent] = useState<ElementType | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line import/no-unresolved
      setComponent(dynamic(() => import('Messenger/messenger-component'), { ssr: false }))
    }
  }, [])

  return <div>{Component && <Component {...props} />}</div>
}
