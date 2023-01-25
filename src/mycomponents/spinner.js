import React from 'react'
import loading from './reloading.gif'


export default function spinner() {
    return (
        <div className='text-center my-5 '>
            <img alt='Loading' style={{ width: '100px', height: '100px' }} src={loading} />
        </div>
    )
}
