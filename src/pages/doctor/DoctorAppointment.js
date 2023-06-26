import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table, message } from 'antd'

const DoctorAppointment = () => {
    const [appointments, setAppointments] = useState([])

    const getAppointment = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/doctor/doctor-appointments", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointment()
    })

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post("http://localhost:5000/api/doctor/update-status", { appointmentsId: record._id, status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            if (res.data.success) {
                message.success(res.data.message);
                getAppointment()
            }
        } catch (error) {
            console.log(error)
            message.error('somthing went wron doctor appointment')
        }
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "_id"
        },
        {
            title: "Date & Time",
            dataIndex: "date",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            )
        },
        {
            title: "Status",
            dataIndex: "status"
        },
        {
            title: "Actions",
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {
                        record.status === "pending" && (
                            <div className='d-flex'>
                                <button className='btn btn-success' onClick={() => handleStatus(record, 'approved')} >Approved</button>
                                <button className='btn btn-danger ms-2' onClick={() => handleStatus(record, 'reject')} >Reject</button>
                            </div>
                        )
                    }
                </div>
            )
        }
    ]
    return (
        <Layout>
            <h1>Appointment List</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default DoctorAppointment
