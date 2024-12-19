import React, { Component } from 'react'

export class Adddonationcat extends Component {
  render() {
    return (
      <div>
      <h1>Add Donation Category</h1>
     <div className='Card'>
     <div className='drop-group'> 
          <div className='drop-col'>  <span className='drop-lable'>Category Name</span>
          <input type="text" />
        </div>
          <div className='drop-col'>  <span className='drop-lable'>Status</span>
        
         <select className='drop' name="scategory" id="scat">
                  <option value="1">Active</option>
                  <option value="2">Disabled</option>
             </select>
        </div>
        
        </div>
        <div className='drop-col'>
       <span>Upload Image (Flag Icon)</span>
      <label className='imginputbox' htmlFor="frontimg">
          <input type="file" accept='image/*' name="frontimg" id="frontimg" hidden />
          <p><span className='txtprimary'>Upload a file</span>or drag and drop</p>
          <span className='txtlight'>PNG,JPG,GIF upto 10MB</span>
      </label>
        </div>

      <div className='center'>  <button className='addButton'>Add Category</button></div>
     </div>
   </div>
    )
  }
}

export default Adddonationcat
