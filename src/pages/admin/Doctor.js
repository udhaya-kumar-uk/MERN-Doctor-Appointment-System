import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import { Table, message } from 'antd'

const Doctor = () => {
    const [doctors, setdoctors] = useState([])

    const getDoctors = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/getAllDoctors", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setdoctors(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //handle status
    const handleAccounStatus = async (record, status) => {
        try {
            const res = await axios.post("http://localhost:5000/api/admin/changeAccountStatus",
                { doctorId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                message.success(res.data.message)
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
            message.error("somthing went wron handle status")
        }
    }

    useEffect(() => {
        getDoctors()
    }, [])

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            )
        },
        {
            title: "Status",
            dataIndex: "status"
        },
        {
            title: "Phone",
            dataIndex: "phone",

        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (<div className='d-flex'> {record.status === 'pending' ?
                <button className='btn btn-success' onClick={() => handleAccounStatus(record, "approved")} >Approve</button>
                : <button className='btn btn-danger'>Reject</button>} </div>)
        },
    ]

    return (
        <Layout>
            <h1>Doctor List</h1>
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    )
}

export default Doctor
