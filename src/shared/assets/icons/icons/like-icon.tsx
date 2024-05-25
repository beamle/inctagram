import * as React from 'react'
import { SVGProps, Ref, forwardRef } from 'react'
export const LikeIcon = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" ref={ref} {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M8 14a.666.666 0 0 1-.474-.193L2.346 8.62a3.507 3.507 0 0 1 0-4.933 3.493 3.493 0 0 1 4.934 0l.72.72.72-.72a3.493 3.493 0 0 1 4.933 0 3.506 3.506 0 0 1 0 4.933l-5.18 5.187A.667.667 0 0 1 8 14ZM4.813 4a2.133 2.133 0 0 0-1.52.627 2.16 2.16 0 0 0 0 3.046L8 12.387l4.706-4.714a2.16 2.16 0 0 0 0-3.046 2.213 2.213 0 0 0-3.04 0l-1.193 1.2a.667.667 0 0 1-.947 0l-1.193-1.2A2.133 2.133 0 0 0 4.813 4Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
))
