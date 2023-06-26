import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import { Form, Input, message } from 'antd'
import '../styles/Registerstyles.css'



const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onfinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:5000/api/user/register", values)
            dispatch(hideLoading())
            if (res.data.success) {
                message.success('Register successfully')
                navigate('/login')
            } else {
                dispatch(hideLoading())
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error('Somthing Went Wrong')
        }
    }

    return (
        <>
            <div className='form-container'>
                <Form layout='vertical' onFinish={onfinish} className='register-form'>
                    <h3 className='text-center' >Register Form</h3>
                    <Form.Item label="Name" name="name">
                        <Input type="text" required />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email" required />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" required />
                    </Form.Item>
                    <Link to='/login' className='m-2'>Already User Login Here</Link>
                    <button className="btn btn-primary" type="submit" >Register</button>
                </Form>
            </div>

        </>
    )
}

export default Register
