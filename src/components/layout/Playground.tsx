import { KeyboardDoubleArrowUpOutlined } from '@mui/icons-material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

interface CrateItem {
  id: number,
  zone_id: number,
  crate_label: string,
  tracking: number,
  stacked: string,
  width: number,
  length: number,
  x: number,
  y: number,
  rotation: number
}


interface PoleItem {
  id: number,
  width: number,
  length: number,
  x: number,
  y: number
}

interface AilseItem {
  id: number,
  width: number,
  length: number,
  x: number,
  y: number
}

const Playground = (props: { boxses_final: CrateItem[], poles_final: PoleItem[], ailse_final: AilseItem[], width_data: number, length_data: number }) => {
  console.log("Playground")
  const options = [
    { value: 'Yes', text: 'Yes' },
    { value: 'No', text: 'No' },
  ];

  const optionsRotation = [
    { value: 1, text: 'Yes' },
    { value: 0, text: 'No' },
  ];
  const ratio = 35
  let widthZone = 0
  let lengthZone = 0
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [crateLabel, setCrateLabel] = useState("")
  const [trackingNumber, settrackingNumber] = useState("")
  const [x, setX] = useState<number>()
  const [y, setY] = useState<number>()
  const [width, setWidth] = useState()
  const [length, setLength] = useState()
  const [stack, setStack] = useState(options[0].value)
  const [rotationInput, setRotationInput] = useState(optionsRotation[0].value)
  const [error, setError] = useState("")
  let { id } = useParams()
  let navigate = useNavigate()

  let ctx: any = null;
  let isDown: boolean | null = false;
  let dragTarget: CrateItem 
  let startX: number | null = null
  let startY: number | null = null
  let currentLocX:number = 0
  let currentLocY:number = 0
  let current_box = null
  let isDragging = false
  const [isLoading, setIsloading] = useState(true)
  let prviousx: number = 0
  let prviousy: number = 0
  let prviousw:number = 0
  let prviousl:number = 0

  const renderCanvas = () => {
    widthZone = props.width_data * ratio
    lengthZone = props.length_data * ratio
    if (widthZone != 0 && lengthZone != 0) {
      return (
        <div className='border rounded-lg overflow-auto p-4 w-full max-h-[1000px] justify-start lg:justify-center items-center '>
          <canvas id='canvas'
            ref={canvas} width={widthZone} height={lengthZone} className="border bg-white"></canvas>
        </div>
      )
    } else {
      return;
    }

  }

  const token = localStorage.getItem("token")

  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': `${token}`
  }

  const onChangeInputCrateLableOutBounce = (e: { target: { value: any } }) => {
    setCrateLabel(e.target.value)
  }
  const onChangeInputCrateLabel = (e: { target: { value: any } }) => {
    setCrateLabel(e.target.value)
  }
  const onChangeInputTrackingNumber = (e: { target: { value: any } }) => {
    settrackingNumber(e.target.value)
  }
  const onChangeInputX = (e: { target: { value: any } }) => {
    setX(e.target.value)
  }
  const onChangeInputY = (e: { target: { value: any } }) => {
    setY(e.target.value)
  };
  const onChangeInputWidth = (e: { target: { value: any } }) => {
    setWidth(e.target.value)
  }
  const onChangeInputLength = (e: { target: { value: any } }) => {
    setLength(e.target.value)
  }
  const handleChangeStack = (e: any) => {
    setStack(e.target.value)
  }
  const handleChangeRotation = (e: { target: { value: any } }) => {
    setRotationInput(e.target.value)
  }

  const download_image = () => {
    const canvas_ele = document.getElementById("canvas") as HTMLCanvasElement;
    const image = canvas_ele?.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = 'playground_layout.png';
    link.href = image;
    link.click();
  }
  let data = {
    crate_label: crateLabel,
    tracking: trackingNumber,
    stacked: stack,
    width: width,
    length: length,
    x: x,
    y: y,
    rotation: rotationInput

  }

  const inBound = async (e: any) => {
    e.preventDefault()
    console.log("inbound")
    console.log(x)
    console.log(y)
    if (crateLabel != "" && x != null && y != null && width != "" && length != "" && (stack == 'Yes' || stack == 'No' && (rotationInput == 1 || rotationInput == 0))) {
      await axios.post(`http://127.0.0.1:5000/playground/${id}`, data, {
        headers: headers
      })
        .then((response) => {
          console.log(response.data);
          console.log(response.status)
          if (response.status == 200) {
            window.location.reload();
          }

          if (response.status == 401) {
            localStorage.clear()
            navigate('/login')
          }
        }, (error) => {
          console.log(error.response.data);
          if (error.response.status == 500) {
            setError(error.response.data.message)
          } else {
            setError("No connection")
          }

        });
    } else {
      setError("Invalid input")
    }
  }
  const outBounce = async (e: any) => {
    e.preventDefault()
    if (crateLabel != "") {
      await axios.delete(`http://127.0.0.1:5000/playground/${id}/${crateLabel}`, {
        headers: headers
      })
        .then((response) => {
          console.log(response.data);
          console.log(response.status)
          if (response.status == 200) {
            window.location.reload();
          }
          if (response.status == 401) {
            localStorage.clear()
            navigate('/login')
          }
        }, (error) => {
          console.log(error);
          setError("fail to outbounce")
        });
    } else {
      setError("Invalid")
    }
  }

  // initialize the canvas context
  useEffect(() => {
    console.log("ComponentDidMount()")
    // dynamically assign the width and height to canvas
    const canvasEle = canvas?.current as HTMLCanvasElement;
    if (!canvasEle) {
      return;
    }
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    // get context of the canvas
    ctx = canvasEle.getContext("2d");
    if (!ctx) {
      return;
    }
    if (isLoading == true) {
      draw(canvasEle)
    }
  }, [])

  useEffect(() => {
    const canvasEle = canvas?.current as HTMLCanvasElement;
    if (!canvasEle) {
      return;
    }

    canvasEle.addEventListener('mousedown', (event: MouseEvent) => {
      handleMouseDown(event,canvasEle)
    })

    canvasEle.addEventListener('mousemove', (event: MouseEvent) => {
      handleMouseMove(event, canvasEle)
    })

    canvasEle.addEventListener('mouseout', (event: any) => {
      handleMouseOut(event)
    })

    canvasEle.addEventListener('mouseup', (event: any) => {
      handleMouseUp(event)
    })

  },[1])

  const draw = (canvasEle: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvasEle.clientWidth, canvasEle.clientHeight);
    props.poles_final.map(pole => drawPole(pole))
    props.boxses_final.map(info => drawFillRect(info));
    setIsloading(false)
  }

  const drawPole = (pole: PoleItem) => {
    console.log("drawPole")
    let {
      id,
      width,
      length,
      x,
      y
    } = pole;

    ctx.beginPath()
    ctx.fillStyle = '#E0BBE4'
    ctx.fillRect(x, y, width, length)
  }

  // draw rectangle with background
  const drawFillRect = (info: CrateItem) => {
    console.log("drawFillReact")
    let { id,
      zone_id,
      crate_label,
      tracking,
      stacked,
      width,
      length,
      x,
      y,
      rotation } = info;
    let final_width = width
    let final_length = length
    if (rotation == 1) {
      final_width = length
      final_length = width
    }
    stacked ? ctx.fillStyle = '#F3DA0B' : ctx.fillStyle = '#FEE2C5'
    ctx.beginPath();
    ctx.fillRect(x, y, final_width, final_length);
    // ctx.strokeRect(x, y, final_width, final_length)
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#000000'
    ctx.fillText(tracking, x + (final_width / 3), y + (final_length / 1.9));
  }

  // identify the click event in the rectangle
  const hitBox = (x: number, y: number) => {
    // setX(Math.round((x! / ratio) * 100) / 100)
    // setY(Math.round((y! / ratio) * 100) / 100)
    let isTarget = null;
    let finalLength = 0
    let finalWidth = 0
    for (let i = 0; i < props.boxses_final.length; i++) {
      const box: CrateItem = props.boxses_final[i]
      if (box.rotation == 1) {
        finalLength = box.width
        finalWidth = box.length
      } else {
        finalLength = box.length
        finalWidth = box.width
      }
      if (x >= box.x && x <= box.x + finalWidth && y >= box.y && y <= box.y + finalLength) {
        console.log(box)
        dragTarget = box;
        prviousx = box.x
        prviousy = box.y
        prviousw = finalWidth
        prviousl = finalLength
        setCrateLabel(box.crate_label)
        isTarget = true
        isDragging = true
        break;

      } else {
        setCrateLabel("")
      }
    }
    return isTarget;
  }

  const handleMouseDown = (event: MouseEvent, canvasEle:HTMLCanvasElement) => {
    console.log("handleMouseDown")
    var rect = canvasEle.getBoundingClientRect();
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
    hitBox(startX, startY)
  }

  const handleMouseMove = (event: MouseEvent, canvasEle:HTMLCanvasElement) => {
    console.log("handleMouseMove")
    var rect = canvasEle.getBoundingClientRect();
    if (isDragging) {
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      let dx = mouseX - startX!;
      let dy = mouseY - startY!;
      dragTarget!.x += dx;
      dragTarget!.y += dy;
      draw(canvasEle);
      startX = mouseX
      startY = mouseY
    } else {
      return;
    }

  }

  const handleMouseOut = (e: any) => {
    console.log("handleMouseOut")
    if (!isDragging) { return; }
    isDragging = false
  }

  const handleMouseUp = (e: any) => {
    console.log("handleMouseUp")
    if (!isDragging) { 
      return;

    }
    isDragging = false;
  }

  return (
    <div className='w-full flex flex-col justify-center items-center gap-6'>
      <div className='w-full flex flex-col gap-6'>
        <div className='flex justify-between items-center w-full'>
          <span className='font-bold text-2xl'>Playground</span>
          <button id="download" className='bg-intel-blue px-4 py-2 rounded-lg text-white hover:bg-blue-800' onClick={download_image} >Save Layout</button>
        </div>

        {renderCanvas()}

        {/* INBOUND OUTBOUND */}
        <div className='w-full flex h-6 flex-col pb-80 gap-10'>
          {/* INBOUND CRATE + */}
          <div className='flex flex-col w-full justify-center items-center gap-5'>
            <h3 style={{ color: 'red', fontWeight: 'bold' }}>{error}</h3>
            <div className="grid grid-cols-9 gap-6">
              <div className="col-span-3">
                <label htmlFor="zone-name"
                  className="block text-sm font-medium text-gray-700">Crate Label</label>
                <input onChange={onChangeInputCrateLabel} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Enter crate label' />
              </div>
              {/* <div className="col-span-3">
                <label htmlFor="project-name"
                  className="block text-sm font-medium text-gray-700">Tracking Number</label>
                <input onChange={onChangeInputTrackingNumber} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Enter tracking number' />
              </div> */}
              <div className="col-span-3">
                <label htmlFor="project-name"
                  className="block text-sm font-medium text-gray-700">X Position</label>
                <input onChange={onChangeInputX} value={x} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Enter X Value' />
              </div>

              <div className="col-span-3">
                <label htmlFor="project-name"
                  className="block text-sm font-medium text-gray-700">Y Position</label>
                <input onChange={onChangeInputY} value={y} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Enter Y Value' />
              </div>
              <div className="col-span-3">
                <label htmlFor="project-name"
                  className="block text-sm font-medium text-gray-700">Width</label>
                <input onChange={onChangeInputWidth} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Enter Width' />
              </div>
              <div className="col-span-3">
                <label htmlFor="project-name"
                  className="block text-sm font-medium text-gray-700">Length</label>
                <input onChange={onChangeInputLength} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Enter Length' />
              </div>

              {/* <div className="col-span-3">
                <label htmlFor="project-name"
                  className="block text-sm font-medium text-gray-700">Stack</label>
                <input onChange={onChangeInputStack} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Y Position' />
              </div> */}

              <div className="col-span-3">
                <label htmlFor="project-name"
                  className="block text-sm font-medium text-gray-700">Stack</label>
                <select value={stack} onChange={handleChangeStack} className="px-1 md:px-6 py-2 rounded-lg border focus:outline-none cursor-pointer" id="">
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>


              <div className="col-span-3">
                <label htmlFor="project-name"
                  className="block text-sm font-medium text-gray-700">Rotation</label>
                <select value={rotationInput} onChange={handleChangeRotation} className="px-1 md:px-6 py-2 rounded-lg border focus:outline-none cursor-pointer" id="">
                  {optionsRotation.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <div onClick={inBound} className='mt-2 px-8 py-3 text-white font-medium bg-yellow-300 rounded-lg cursor-pointer hover:bg-yellow-400'>+ Inbound Crate</div>
          </div>

          {/* OUTBOUND CRATE - */}
          <div className='flex flex-col w-full justify-center items-center gap-5'>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3">
                <label htmlFor="zone-name"
                  className="block text-sm font-medium text-gray-700">Crate Name</label>
                <input onChange={onChangeInputCrateLableOutBounce} value={crateLabel} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Crate Name' />
              </div>

            </div>
            <div onClick={outBounce} className='mt-2 px-8 py-3 text-white font-medium bg-red-300 rounded-lg cursor-pointer hover:bg-red-400'>- Outbound Crate</div>
          </div>
        </div>
      </div>


    </div>

  )
}

export default Playground