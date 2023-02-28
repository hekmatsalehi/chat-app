import { IoMdAttach } from 'react-icons/io';
import { BsImageFill, BsSend } from "react-icons/bs";

import './input.scss';

function Input() {
  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' />
      <div className="send">
        <IoMdAttach/>
        <input type="file" style={{display: "none"}} id="file"/>
        <label htmlFor='file'>
        <BsImageFill/>
        </label>
        <button><BsSend/></button>
      </div>
    
    </div>
  )
}

export default Input