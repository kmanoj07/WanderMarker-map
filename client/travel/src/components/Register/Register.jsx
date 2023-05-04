import React, {useRef} from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';

import './Register.css'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import axios from 'axios'

const userRegisterSuccess = () => {
    toast.success('Registerd Successfully!')
}

const userRegisterFail = () => {
    toast.error('Failed to Register!')
}


function Register({setShowRegister}) {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e)=> {
        e.preventDefault();
        //create newUser
        
        const newUser = {
            userName: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        console.log(newUser);
        try {
            const response = await axios.post("/users/register", newUser)
            console.log(response.data)
            // Notify for success
            userRegisterSuccess()
            setShowRegister(false)
        }
        catch (err) {
            // Produce error notification
            console.log(err)
            userRegisterFail()
        }
    
    }

    return (
        <div className='register_container'>
            <div className='application'>
                <ExitToAppIcon/>
                Create a profile.
            </div>

            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='username' ref={nameRef} />
                <input type='email' placeholder='email' ref={emailRef}/>
                <input type='password' placeholder='password' ref={passwordRef}/> 

                <button className='register_button'>Register</button>
            </form>
            <CancelIcon className='register_cancel' onClick={()=> {setShowRegister(false)}} />
        </div>
    )
}

export default Register;