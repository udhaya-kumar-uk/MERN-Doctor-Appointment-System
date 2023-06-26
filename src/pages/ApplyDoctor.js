import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import moment from 'moment'

const ApplyDoctor = () => {
    const { user } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post("http://localhost:5000/api/user/apply-doctor",
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
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('somthing went wrong')
        }
    }
    return (
        <Layout>
            <h1 className='text-center'>ApplyDoctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
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
                            Submit
                        </button>
                    </Col>
                </Row>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor
