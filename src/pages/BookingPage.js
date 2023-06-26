import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import { DatePicker, message, TimePicker } from 'antd'
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from "../redux/features/alertSlice"

const BookingPage = () => {
    const { user } = useSelector((state) => state.user)
    const params = useParams()
    const [doctors, setdoctors] = useState([])
    const [data, setdata] = useState("")
    const [timing, settiming] = useState("")
    const [available, setavailable] = useState(false)
    const dispatch = useDispatch()
    const getUserdata = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/doctor/getDoctorById",
                {
                    doctorId: params.doctorId
                },
                {
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

    const handleAvailability = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:5000/api/user/booking-availbility",
                { doctorId: params.doctorId, data, timing },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            dispatch(hideLoading())
            if (res.data.success) {
                setavailable(true)
                console.log(available)
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
        }
    }

    const handleBooking = async () => {
        try {
            setavailable(true);
            if (!data && !timing) {
                return alert("Date & Time Required")
            }
            dispatch(showLoading())
            const res = await axios.post("http://localhost:5000/api/user/book-appointment",
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctors,
                    userInfo: user,
                    data: data,
                    timing: timing
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
        }
    }


    useEffect(() => {
        getUserdata()
    }, [])
    return (
        <Layout>
            <h3>Booking Page</h3>
            <div className='container  m-2'>
                {doctors && (
                    <div>
                        <h4>
                            Dr.{doctors.firstName} {doctors.lastName}
                        </h4>
                        <h4>Fees:{doctors.feesperCunsaltation}</h4>
                        <h4>Timings:{doctors.timings && doctors.timings[0]}-{doctors.timings && doctors.timings[1]}{" "}</h4>
                        <div className='d-flex flex-column w-50'  >
                            <DatePicker className='m-2'
                                aria-required={"trur"}
                                format='DD-MM-YYYY' onChange={(value) => {
                                    setavailable(false)
                                    setdata(moment(value).format('DD-MM-YYYY'))
                                }} />
                            <TimePicker
                                aria-required={"true"}
                                format="HH:mm"
                                className='m-2'
                                onChange={(values) => {
                                    settiming(moment(values).format('HH-mm'))
                                }} />
                            <button className='btn btn-primary mt-2' onClick={handleAvailability}>Chek Availability</button>

                            <button className='btn btn-dark mt-2' onClick={handleBooking} >Book Now</button>


                        </div>
                    </div>
                )}
            </div>

        </Layout>
    )
}

export default BookingPage
