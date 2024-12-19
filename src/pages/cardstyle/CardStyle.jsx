import React, { Component } from 'react'

export class CardStyle extends Component {
  render() {
    return (
        <div>
        <h1>Card Styles</h1>
    <div className='cards-group'>
        <div className='Style-Card'>
            <span>Style 1 (Chapters)</span>
        </div>
        <div className='Style-Card'>
            <span>Style 2 (Temples)</span>
        </div>
        <div className='Style-Card'>
            <span>Style 3 (Text)</span>
        </div>
    </div>
      </div>
    )
  }
}

export default CardStyle
