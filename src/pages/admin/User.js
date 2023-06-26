import React, { useState, useEffect } from 'react'
import axios from "axios"
import Layout from '../../components/Layout'
import { Table } from 'antd'

const User = () => {
    const [users, setusers] = useState([])

    const getusers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setusers(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getusers()
    }, [])

    const colums = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Doctor",
            dataIndex: "isDoctor",
            render: (text, record) => (
                <span>{record.isDoctor ? 'yes' : 'No'}</span>
            )
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className='d-flex'>
                    <button className='btn btn-danger'>Block</button>
                </div>
            )
        },
    ]



    return (
        <Layout>
            <h1>User List</h1>
            <Table columns={colums} dataSource={users} />
        </Layout>
    )
}

export default User
