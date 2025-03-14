import React from 'react'
import Masonry from 'react-masonry-css';
// import pin from '../../../shareme_backend/schemas/pin';
import Pin from './Pin';

const breakpointObj = {
    default: 4,
    3000:6, 
    2000:5, 
    1200:3, 
    1000: 2, 
    500: 1, 
}

export const MasonryLayout = ({pins}) => {
  return (
    <div>
        <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj} >
            {pins?.map((pin) => <Pin key ={pin._id} pin={pin} className="w-max" /> )}
        </Masonry>

    </div>
  )
}
