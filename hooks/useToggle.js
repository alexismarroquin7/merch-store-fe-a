import { useState } from "react"

export const useToggle = (initialToggled = false) => {
  const [toggled, setToggled] = useState(initialToggled);
  const flipToggle = () => setToggled(!toggled);
  return {
    toggled,
    setToggled,
    flipToggle
  }
}