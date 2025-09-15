import React from 'react'

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[80vh] gap-2'>
        <div className='animate-spin rounded-full h-14 w-14 border-2 border-t-primary'>
        </div>
            Loading....
    </div>
  )
}

export default Loading