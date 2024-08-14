import { useEffect, useState } from 'react';
import './SideSlider.css'


function SideSlider({open, children, style, hasBeenOpened}) {
  const [openDelay, setOpenDelay] = useState(false)
  useEffect(() => {
        if (open && !openDelay) {
            setOpenDelay(true)
        } else if (!open && openDelay){
            setTimeout(() => {
                setOpenDelay(false)
        },800)
      }
  })

  useEffect (() => {
    if (openDelay && hasBeenOpened) {
        hasBeenOpened();
    }
  }, [openDelay, hasBeenOpened])
  
  return (
      <>
        {openDelay && <div className={`side-slider-layer ${open ? "show" : "hide"}`} >
            <div  className={`side-slider-wrapper ${open ? "in" : "out"}`} style={style}>
                {children}
            </div>
        </div>}
      </>
  );
}



export default SideSlider; 