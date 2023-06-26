import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NotificationPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user)

    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:5000/api/user/get-all-notification", {
                userId: user._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if (res.status.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("somthing went wrong Read message")
        }
    }
    //delete notification
    const handleDeleteRead = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:5000/api/user/delete-all-notification",
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            )
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            message.error("somthing went wrong delete message")
        }
    }
    return (
        <Layout>
            <h4 className='p-3 text-center'>Notification Page</h4>
            <Tabs>
                <Tabs.TabPane tab="unRead" key={0}>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
                    </div>
                    {
                        user?.notification.map(notificationmsg => (
                            <div className='card'

                                style={{ cursor: "pointer" }}
                            >
                                <div className='card-text'
                                    onClick={() => navigate(notificationmsg.onClickPath)}>
                                    {notificationmsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={1}>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2 text-primary' style={{ cursor: 'pointer' }} onClick={handleDeleteRead}>Delete All Read</h4>
                    </div>
                    {
                        user?.notification.map(notificationmsg => (
                            <div className='card'

                                style={{ cursor: "pointer" }}
                            >
                                <div className='card-text'
                                    onClick={() => navigate(notificationmsg.onClickPath)}>
                                    {notificationmsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default NotificationPage
