import { useEffect, useRef, useState } from "react";

const useClickAwayToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickAway = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClickAway);
    return () => {
      document.removeEventListener("mouseup", handleClickAway);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickAwayToggle;
