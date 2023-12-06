import { createContext, useContext } from "react"
import { defaultSpringValue } from "./defaults"

// Parallax Context
export const OffsetContext = createContext(defaultSpringValue)
export const useParallaxOffset = () => useContext(OffsetContext)