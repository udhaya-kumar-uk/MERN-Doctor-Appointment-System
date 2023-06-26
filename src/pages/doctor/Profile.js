import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../../redux/features/alertSlice'
import axios from 'axios'
import moment from 'moment'

const Profile = () => {
    const { user } = useSelector((state) => state.user)
    const [doctor, setdoctor] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //update doctor
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post("http://localhost:5000/api/doctor//updateProfile",
                {
                    ...values, userId: user._id,
                    timings: [
                        moment(values.timings[0]).format('HH:mm'),
                        moment(values.timings[1]).format('HH:mm')
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate("/")
            } else {
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('somthing went wrong')
        }
    }


    const getDoctorInfo = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/doctor/getDoctorInfo",
                { userId: params.id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                setdoctor(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDoctorInfo()
        //eslint-disable-line
    }, [])

    return (
        <Layout>
            <h1>Manage profiles</h1>
            {doctor && (
                <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{
                    ...doctor,
                    timings: [
                        moment(doctor.timings[0], 'HH:mm'),
                        moment(doctor.timings[1], 'HH:mm')
                    ]
                }}>
                    <h4 className=''>Personal Details:</h4>
                    <Row gutter={20}>

                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Your First Name' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Your Last Name' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Mobile" name="phone" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Your Mobile Number' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                                <Input type='email' placeholder='Your Email' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="website" name="website">
                                <Input type='text' placeholder='Your website' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="address" name="address" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Your Clinic address' />
                            </Form.Item>
                        </Col>
                    </Row>


                    <h4 className=''>Professional Details:</h4>
                    <Row gutter={20}>

                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="specialization" name="specialization" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Doctor specialization' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label=" experience" name="experience" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Doctor experience' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="fees perCunsaltation" name="feesperCunsaltation" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='fees perCunsaltation' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="timings" name="timings" required >
                                <TimePicker.RangePicker format="HH:mm" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8} ></Col>
                        <Col xs={24} md={24} lg={8} >
                            <button className='btn btn-primary form-btn' type='submit'>
                                Update
                            </button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Layout>
    )
}

export default Profile
