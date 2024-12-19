import React from 'react'
import ReactHtmlParser from 'react-html-parser';
function Deletepopup(name,id,onclick){
    return  (

<div className='modal-del'>
        <div className="warn-text">Are you sure you want to delete {ReactHtmlParser(name)} ? </div>
        <div className="model-btns"><button className='close-del'>Close</button>
    <button onClick={e=>onclick(id)} className='modal-delbtn'>Delete</button>
    </div>
    </div>

    )
}

export default Deletepopup