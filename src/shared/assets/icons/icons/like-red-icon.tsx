import * as React from 'react'
import { SVGProps, Ref, forwardRef } from 'react'
export const LikeRedIcon = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" ref={ref} {...props}>
    <path
      fill="#CC1439"
      d="M8 14a.666.666 0 0 1-.474-.193L2.346 8.62a3.507 3.507 0 0 1 0-4.933 3.493 3.493 0 0 1 4.934 0l.72.72.72-.72a3.493 3.493 0 0 1 4.933 0 3.506 3.506 0 0 1 0 4.933l-5.18 5.187A.667.667 0 0 1 8 14Z"
    />
  </svg>
))
