import React, { useEffect, useRef, useState } from 'react'

const Playground = (props: { boxses_final: any[], width_data:any, length_data:any }) => {
  console.log("playground")
    const [xValue, setXValue] = useState()
    const widthZone = props.width_data
    const lengthZone = props.length_data
    const ratio=25
    const canvas = useRef();
    let ctx: { clearRect: (arg0: number, arg1: number, arg2: any, arg3: any) => void; fillStyle: string; beginPath: () => void; fillRect: (arg0: any, arg1: any, arg2: any, arg3: any) => void; font: string; fillText: (arg0: any, arg1: any, arg2: any) => void; } | null = null;

    let isDown = false;
    let dragTarget: { x: number; y: number; } | null = null;
    let startX: number | null = null
    let startY: number | null = null

    const download_image = () => {
        const canvas_ele = document.getElementById("canvas");
        const image = canvas_ele.toDataURL("image/png").replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = 'playground_layout.png';
        link.href = image;
        link.click();
      }

    // initialize the canvas context
    useEffect(() => {
      // dynamically assign the width and height to canvas
      const canvasEle = canvas.current;
      canvasEle.width = canvasEle.clientWidth;
      canvasEle.height = canvasEle.clientHeight;
   
      // get context of the canvas
      ctx = canvasEle.getContext("2d");
    }, []);
   
    useEffect(() => {
      console.log("useEffect playground")
      draw();
    }, []);
   
    // draw rectangle
    const draw = () => {
      console.log("draw")
      ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
      props.boxses_final.map(info => drawFillRect(info));
    }

    // draw rectangle with background
    const drawFillRect = (info: { x: number; y: number; w: number; h: number; stacked: boolean; label: string; }, style = {}) => {
      console.log("frawFIllRect")
      const { x, y, w, h, stacked, label } = info;
      const { stackedColor = '#F3DA0B' } = style;
      const { nonStackedColor = '#FEE2C5' } = style;
      stacked ? ctx.fillStyle = stackedColor : ctx.fillStyle = nonStackedColor
      ctx.beginPath();
      ctx.fillRect(x, y, w, h);
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#000000'
      ctx.fillText(label, x+(w/2.8), y+(h/1.9));
    }
   
    // identify the click event in the rectangle
    const hitBox = (x: number, y: number) => {
      let isTarget = null;
      for (let i = 0; i < props.boxses_final.length; i++) {
        const box = props.boxses_final[i];
        if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) {
          dragTarget = box;
          isTarget = true;
          break;
        }
      }
      return isTarget;
    }
   
    const handleMouseDown = e => {
      startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
      startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
      isDown = hitBox(startX, startY);
    }

    const handleMouseMove = e => {
      if (!isDown) return;
   
      const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
      const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
      const dx = mouseX - startX;
      const dy = mouseY - startY;
      startX = mouseX;
      startY = mouseY;
      dragTarget.x += dx;
      dragTarget.y += dy;
      draw();
    }

    const handleMouseUp = e => {
      dragTarget = null;
      isDown = false;
    }

    const handleMouseOut = e => {
      handleMouseUp(e);
    }
 
  return (
    <div className='w-full flex flex-col justify-center items-center gap-6'>
        <div className='w-full flex flex-col gap-6'>
            <div className='flex justify-between items-center w-full'>
                <span className='font-bold text-2xl'>Playground</span>
                <button id="download" className='bg-intel-blue px-4 py-2 rounded-lg text-white hover:bg-blue-800' onClick={download_image} >Save Layout</button>
            </div>
            
            <div className='border rounded-lg overflow-auto p-4 w-full max-h-[500px] justify-start items-center flex'>
                <canvas id='canvas'
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseOut}
                ref={canvas} width={widthZone*ratio} height={lengthZone*ratio} className="border bg-white"></canvas>
            </div>
        </div>
        
        {/* <div className='flex flex-col w-full justify-center items-center gap-3'>
                <div className='w-1/3 grid grid-cols-3 gap-6 font-bold'>
                    <span>Crate Label</span>
                    <span>x axis</span>
                    <span>y axis</span>
                </div>
            {props.boxses_final.map(b => {
                return (
                    <div className='w-1/3 grid grid-cols-3 gap-6 items-center'>
                        <span>{b.label}</span>
                        <input type="text" className='border p-3' value={b.x}/>
                        <input type="text" className='border p-3' value={b.y}/>
                    </div>
                )
            } )}    

        </div> */}
    </div>

  )
}

export default Playground