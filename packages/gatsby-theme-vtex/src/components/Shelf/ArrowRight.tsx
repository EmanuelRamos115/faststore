import React, { FC } from 'react'

const ArrowRight: FC<{ size: number }> = ({ size }) => (
  <div>
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      height={`${size}px`}
      viewBox={`0 0 ${size} ${size}`}
    >
      <image
        height={size.toString()}
        x="0"
        y="0"
        href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmVyc2lvbj0iMS4xIj4KICA8cGF0aCBkPSJNNSAxNUwxMiA4TDUgMSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+"
      />
    </svg>
  </div>
)

export default ArrowRight
