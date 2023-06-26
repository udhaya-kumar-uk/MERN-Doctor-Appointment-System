import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Layout from '../components/Layout'
import { Table } from 'antd'

const Appoointment = () => {
    const [appointments, setAppointments] = useState([])

    const getAppointment = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/user/user-appointments", {
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
    }, [])

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
        }
    ]

    return (
        <Layout>
            <h1>Appointment List</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default Appoointment
