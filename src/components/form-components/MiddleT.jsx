import React from "react";
import { Quill } from "react-quill";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.core.css";



function MiddleTComponent(value,onchange){
//Text Editor Code


return (
<div className='drop-col'>
<span>Add Middle Title</span>

<ReactQuill
       theme="snow"
       value={value}
       onChange={e=>onchange(e)}
       modules={{  toolbar: [
         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
         ['blockquote', 'code-block'],
         ['link', 'image', 'video', 'formula'],
         [{ 'header': 1 }, { 'header': 2 }],               // custom button values
         [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
         [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
         [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
         [{ 'direction': 'rtl' }],                         // text direction
       
         [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
       
         [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
         [{ 'font': [] }],
         [{ 'align': [] }],
       
         ['clean']                                   
         
       ]
     }}
      />

 </div>    )


}

export default MiddleTComponent
