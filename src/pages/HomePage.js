import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Row } from 'antd'
import DoctorList from '../components/DostorList'

const HomePage = () => {
    const [doctors, setdoctors] = useState([])
    const getUserdata = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/user/getAllDoctors", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (res.data.success) {
                setdoctors(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserdata()
    }, [])
    return (
        <Layout>
            <h1 > HomePage</h1>
            <Row>
                {doctors && doctors.map(doctor => (
                    <DoctorList doctor={doctor} />
                ))}
            </Row>
        </Layout>
    )
}

export default HomePage
