import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, message } from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import '../styles/Registerstyles.css'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onfinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:5000/api/user/login", values)
            window.location.reload()
            dispatch(hideLoading())
            if (res.data.success) {
                localStorage.setItem('token', res.data.token)
                message.success('Login successfully')
                navigate('/')
            }
        } catch (error) {
            dispatch(hideLoading())
            message.error('something went wrong Login')
        }
    }

    return (
        <div className='form-container'>
            <Form layout='vertical' onFinish={onfinish} className='register-form'>
                <h3 className='text-center' >Register Form</h3>

                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>
                <Link to='/register' className='m-2'>Not A User Register Here</Link>
                <button className="btn btn-primary" type="submit" >Login</button>
            </Form>
        </div>
    )
}

export default Login
