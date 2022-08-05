import React, { useEffect, useRef } from 'react'

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
  id:number,
  width:number,
  length:number,
  x:number,
  y:number
}

interface AilseItem {
  id:number,
  width:number,
  length:number,
  x:number,
  y:number
}

const Map = (props: { map_data: CrateItem[], ailse_data:AilseItem[] ,pole_data:PoleItem[], width_data: any, length_data: any }) => {
  const ratio = 20
  const width = parseFloat(props.width_data)
  const length = parseFloat(props.length_data)
  return (
    <div className='bg-white flex flex-col justify-start items-start w-full gap-4'>
      <span className='font-bold text-2xl'>Layout</span>
      <div className='border rounded-lg p-4 w-full overflow-auto'>
        {/* className='bg-green-100 border' */}
        
        <svg width={width * ratio} height={length * ratio} fill-opacity="0.8" stroke="blue" stroke-opacity="0.3" >
          <g className="grid y1-grid">
            <line x1="0" y1="0" x2="0" y2={length * ratio} stroke-width="0.5%"></line>
          </g>
          <g className="grid x1-grid">
            <line x1="0" y1="0" x2={width * ratio} y2="0" stroke-width="0.5%"></line>
          </g>
          <g className="grid x2-grid">
            <line x1="0" y1={length * ratio} x2={width * ratio} y2={length * ratio} stroke-width="0.5%"></line>
          </g>
          <g className="grid y2-grid">
            <line x1={width * ratio} y1={width * ratio} x2={width * ratio} y2="0" stroke-width="0.5%"></line>
          </g>

          {props.ailse_data.map((ailse: AilseItem) => {
            let w = ailse.width
            let l = ailse.length
            // if (crate.rotation == 1) {
            //   w = crate.length
            //   l = crate.width
            // }
            return (
              <g>
                <rect aria-label='3'
                  x={ailse.x * ratio}
                  y={ailse.y * ratio}
                  width={w * ratio}
                  height={l * ratio}
                  fill={"#CEBBA8"} />
              </g>
            )
          })}

          {props.pole_data.map((pole: PoleItem) => {
            let w = pole.width
            let l = pole.length
            // if (crate.rotation == 1) {
            //   w = crate.length
            //   l = crate.width
            // }
            return (
              <g>
                <rect aria-label='3'
                  x={pole.x * ratio}
                  y={pole.y * ratio}
                  width={w * ratio}
                  height={l * ratio}
                  fill={"#000000"} />
              </g>
            )
          })}


          {props.map_data.map((crate: CrateItem) => {
            let w = crate.width
            let l = crate.length
            if (crate.rotation == 1) {
              w = crate.length
              l = crate.width
            }
            return (
              <g>
                <rect aria-label='3'
                  x={crate.x * ratio}
                  y={crate.y * ratio}
                  width={w * ratio}
                  height={l * ratio}
                  fill={crate.stacked === 'No' ? "#F3DA0B" : "#fc1c6e"} />

                <rect aria-label='3'
                  x={crate.x * ratio}
                  y={crate.y * ratio}
                  width={w * ratio}
                  height={l * ratio}
                  fill={crate.stacked ? "#F3DA0B" : "#fc1c6e"}
                  className='hover:stroke-[#d3d3d3] hover:fill-[rgba(255,255,255,0.4)] cursor-pointer' />

                {crate.stacked === 'Yes' ?
                  <text
                    x={(crate.x * ratio + (w * ratio / 2.8))}
                    y={(crate.y * ratio + (l * ratio / 1.8))}
                    font-size={ratio / 2}
                    fill="black"
                    className='pointer-events-none'>
                    {crate.tracking}
                  </text> :
                  <text
                    x={(crate.x * ratio + (w * ratio / 2.3))}
                    y={(crate.y * ratio + (l * ratio / 1.8))}
                    font-size={ratio / 2} fill="black"
                    className='pointer-events-none'>
                    {crate.tracking}
                  </text>}

              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default Map