import React, { Component } from 'react'
import loading from './Reload.gif'
export default class spinner extends Component {
    render() {
        return (
            <div className='text-center my-5 '>
                <img alt='Loading' style={{ width: '300px', height: '200px' }} src={loading} />
            </div>
        )
    }
}