import React, { Component } from 'react'

export class StyleCard extends Component {
  render() {
    return (
      <div>
        <div className='Card'>

            <h1>Card Style</h1>
            <div className='drop-group'>
                <div className='drop-col'>
                    <span>Select Card Style</span>
                   <select name="">
                    <option value="c1">Style 1</option>
                   </select>
                </div>
                <div className='drop-col'>
                    <span>Card Color</span>
                   <select name="">
                    <option value="c1">Style 1</option>
                   </select>
                </div>
                <div className='drop-col'>
                    <span>Card Shadow</span>
                   <select name="">
                    <option value="c1">Style 1</option>
                   </select>
                </div>
                <div className='drop-col'>
                    <span>Shadow Color</span>
                  <input type="text" />
                </div>
                <div className='drop-col'>
                    <span>Blur</span>
                  <input type="text" />
                </div>
                <div className='drop-col'>
                    <span>Spread</span>
                  <input type="text" />
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default StyleCard
