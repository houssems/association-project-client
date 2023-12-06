import React, { useCallback, useEffect, useState } from "react"
import { useSpring } from "react-spring"
import { OffsetContext } from "./Context"
import { defaultSpring } from "./defaults"

const MouseParallaxContainer = ({
                                  globalFactorX = 1,
                                  globalFactorY = 1,
                                  resetOnLeave,
                                  useWindowMouseEvents,
                                  inverted,
                                  springConfig,
                                  enabled = true,
                                  containerStyle,
                                  className,
                                  children
                                }) => {
  const [offset, offsetApi] = useSpring(() => ({
    ...defaultSpring,
    ...(springConfig ? { config: springConfig } : {})
  }))
  const resetOffset = () => offsetApi.start(defaultSpring)

  const [containerRef, setContainerRef] = useState({ current: null })
  const containerRefWithCallback = useCallback(node => {
    if (node !== null) {
      setContainerRef({ current: node })
    }
  }, [])

  const getMousePosition = useCallback(
      event => {
        const rect = containerRef.current
            ? containerRef.current.getBoundingClientRect()
            : { left: 0, top: 0 }
        return { x: event.clientX - rect.left, y: event.clientY - rect.top }
      },
      [containerRef]
  )

  const mouseMovementHandler = useCallback(
      event => {
        if (containerRef.current) {
          const containerHeight = containerRef.current.clientHeight
          const containerWidth = containerRef.current.clientWidth
          const mousePosition = getMousePosition(event)
          const offsetRelativeToCenter = {
            x:
                (containerWidth / 2 - mousePosition.x) *
                globalFactorX *
                (inverted ? -1 : 1),
            y:
                (containerHeight / 2 - mousePosition.y) *
                globalFactorY *
                (inverted ? -1 : 1)
          }
          offsetApi.start(offsetRelativeToCenter)
        }
      },
      [containerRef, getMousePosition, inverted]
  )

  // Use window event handler when useWindowMouseEvents is enabled
  useEffect(() => {
    if (enabled && useWindowMouseEvents && containerRef.current) {
      window.addEventListener("mousemove", mouseMovementHandler, false)
      if (resetOnLeave) {
        window.addEventListener("mouseout", resetOffset, false)
      }
    }
    return () => {
      if (enabled && useWindowMouseEvents && containerRef.current) {
        window.removeEventListener("mousemove", mouseMovementHandler, false)
        if (resetOnLeave) {
          window.removeEventListener("mouseout", resetOffset, false)
        }
      }
    }
  }, [
    containerRef,
    mouseMovementHandler,
    resetOnLeave,
    useWindowMouseEvents,
    enabled
  ])

  const useMouseMoveHandler = enabled && !useWindowMouseEvents
  const useMouseLeaveHandler = enabled && !useWindowMouseEvents && resetOnLeave
  const divEvents = {
    onMouseMove: useMouseMoveHandler ? mouseMovementHandler : undefined,
    onMouseLeave: useMouseLeaveHandler ? resetOffset : undefined
  }

  return (
      <OffsetContext.Provider value={offset}>
        <div
            id="mouse-parallax-container"
            ref={containerRefWithCallback}
            style={{ overflow: "hidden", position: "relative", ...containerStyle }}
            {...{ className }}
            {...divEvents}
        >
          {children}
        </div>
      </OffsetContext.Provider>
  )
}

export { MouseParallaxContainer }
