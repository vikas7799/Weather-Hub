import React, { useEffect, useState } from 'react'
import "./Home.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const [data, setdata] = useState({
        celcius: 10,
        name: "London",
        humidity: 10,
        speed: 2,
        urlimg: "10d"

    });



    const [name, setname] = useState('')

    const handleclick = () => {
        if (name !== "") {
            const url = `https://${import.meta.env.VITE_REACT_APP_API_URL}/weather?q=${name}&units=metric&APPID=${import.meta.env.VITE_REACT_APP_API_KEY}`

            axios.get(url)
                .then(res => {
                    console.log(res.data)
                    setdata({
                        ...data,
                        celcius: res.data.main.temp,
                        name: res.data.name,
                        humidity: res.data.main.humidity,
                        speed: res.data.wind.speed,
                        urlimg: res.data.weather[0].icon
                    })
                })
                .catch(err => toast.error("No data found",{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                }))
                

        }

        else{
            toast.error("Enter a Data")
        }

    }

    return (
        <div className='container'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                />
                


            <div className='weather'>
                <div className='search'>
                    <input type='text' placeholder='Enter City Name' onChange={e => setname(e.target.value)
                    } />
                    <button onClick={handleclick}>Search</button>
                </div>
                <div className='winfo'>
                    <img src={`https://openweathermap.org/img/wn/${data.urlimg}@2x.png`} />
                    <h1>{Math.round(data.celcius)}°C</h1>
                    <h2>{data.name}</h2>
                    <div className='details'>
                        <div className='col'>
                            <p>{Math.round(data.humidity)}</p>
                            <p>Humdity</p>
                        </div>
                        <div className='col'>
                            <p>{Math.round(data.speed)}</p>
                            <p>Humdity</p>

                        </div>
                    </div>
                </div>

                {/* <button onClick={notify}>Notify!</button> */}


            </div>

        </div>
    )
}

export default Home
