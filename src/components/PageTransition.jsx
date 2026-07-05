
import { motion } from "framer-motion"

// Respect the user's OS-level "reduce motion" accessibility setting
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function PageTransition({children}) {
  return (
    <motion.div
    initial ={prefersReducedMotion ? false : {opacity:0,y:20}}
    animate ={{opacity:1,y:0}}
    exit={prefersReducedMotion ? undefined : {opacity:0,y:-20}}
    transition={{duration: prefersReducedMotion ? 0 : 0.3}}
    >
        {children}
    </motion.div>
  )
}

export default PageTransition
