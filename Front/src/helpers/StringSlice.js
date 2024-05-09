import React from 'react'

export default function StringSlice(title,end) {
return title.length>end?title.slice(1,end)+"...":title;

}
