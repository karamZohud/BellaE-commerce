import React from 'react'
import Skeleton from 'react-loading-skeleton';

export default function SkeletonShow(props) {
    const skeletonLength=Array.from({length:props.length}).map((ele,key)=>
        <div className={props.classess}>
        <div className=' me-1'>
        <Skeleton  width={props.width} baseColor={props.baseColor} height={props.height} />
        </div>
  
  </div>
    );


  return (
skeletonLength
  )
}
