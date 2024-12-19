import React, { Component, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate,Link, useParams } from 'react-router-dom';
import moment from 'moment';
import TitleComponent from '../../components/form-components/Title'
import DescriptionComponent from '../../components/form-components/Description'




function ScriptureStyle(props){

const [Formdata,SetFormdata] = useState();

    return (

        <div>
             <div className='Card'>
   {
    TitleComponent(e=>props(Formdata))
   }
      </div>
               <div className='Card'>
             {
              DescriptionComponent(e=>SetFormdata(e))
             }
      </div>
        </div>
    )
}

export default ScriptureStyle