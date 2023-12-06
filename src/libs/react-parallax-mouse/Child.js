import React, { useCallback } from "react"
import { animated } from "react-spring"
import { useParallaxOffset } from "./Context"

const MouseParallaxChild = ({
                              factorX = 1,
                              factorY = 1,
                              inverted = false,
                              className,
                              style,
                              children
                            }) => {
  const offset = useParallaxOffset()
  const calculateChildOffset = useCallback(
      offset => {
        const calcX = x => x * factorX * (inverted ? -1 : 1)
        const calcY = y => y * factorY * (inverted ? -1 : 1)
        return { x: offset.x.to(calcX), y: offset.y.to(calcY) }
      },
      [factorX, factorY]
  )

  const divStyle = {
    ...calculateChildOffset(offset),
    ...style
  }

  return (
      <>
        <animated.div {...{ className }} style={divStyle}>
          {children}
        </animated.div>
      </>
  )
}

export { MouseParallaxChild }
