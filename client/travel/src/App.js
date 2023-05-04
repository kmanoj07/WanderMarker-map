import './App.css';
import * as React from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {format} from 'timeago.js'


import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'

import axios from 'axios'

import { useState, useEffect } from 'react'
import Register from './components/Register/Register'
import Login from './components/Login/Login'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const pinAddSuccess = () => {
  toast.success("Added Pin!")

}

const userNotLoggedIn = () => {
  toast.warning("Login to account to set pin!")

}

const userLoggedOut = (userS) => {
  toast.warning("Logout from " + userS)

}

const pinAddFailure = () => {
  toast.error("Could'nt not add Pin, Please fill all details !")

}


function App() {

  // initial pins - empty
  const [pins, setPins] = useState([])
  // set viewports for locationOn Icon
  const [viewPort, setViewPort] = useState({
    longitude : 12.4,
    latitude : 37.8,
    zoom: 14
  })
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const [rating, setRating] = useState(1)

  const handleAaddClicked = (e) => {
    console.log(e);
    let lat = e.lngLat.lat
    let lon = e.lngLat.lng
    setNewPlace({
      lat: lat,
      lng : lon
    })
  }

  const handlePinSubmit = async (e)=> {
    e.preventDefault()

    const newPin =  {
      userName : currentUser,
      title: title,
      rating : rating,
      description : description,
      lat: newPlace.lat,
      lon: newPlace.lng
    }

    console.log(newPin)

    try {

      if(!currentUser) {
        // Produce error
        userNotLoggedIn()
         
      } else {
        const response = await axios.post("/pins", newPin)
        console.log(response)
        setPins([...pins, response.data])
        setNewPlace(null)
        // Notify for success
        pinAddSuccess()
        
        setRating(1)
        setDescription(null)
        setTitle(null)
      }
    
    } catch(err) {
      console.log(err)
      pinAddFailure()
  }
}

const handleLogout = () => {
  userLoggedOut(currentUser)
  setCurrentUser(null)
  console.log(currentUser)
}

  const handlMarkerClicked = (id, lat, lon) => {
    // console.log(lat)
    // console.log(lon)
    setCurrentPlaceId(id)
  }

  useEffect(()=> {
    const getPins = async ()=> {
      try {
        const responsePins = await axios.get("/pins")
        // console.log(responsePins)
        setPins(responsePins.data)
      }catch (err) {
        console.log(err)
      }
    }

    getPins()
  }, []) // not making call every time in a loop
  
  return (
    <div>
      <Map
      container = {'map'}
      projection={'globe'}
      initialViewState={{setViewPort}}
      mapboxAccessToken= {process.env.REACT_APP_TOKEN}
      style={{width:"100vw", height:"100vh"}}
      mapStyle="mapbox://styles/paswanmanoj/clh8gd5ku00x201qyf9yr2pp0"
      onDblClick={handleAaddClicked}
      >

        <ToastContainer
          position='top-left'
          theme='dark'
        />

        <NavigationControl />
          {
            pins.map(pin => (              
              <>
                <Marker
                  longitude={pin.lon}
                  latitude={pin.lat}
                  anchor='center' 
                >
                  <LocationOnIcon 
                    className='icon'
                    onClick = {() => handlMarkerClicked(pin._id, pin.lat, pin.lon)}
                    // Style => if we have a current user make it different color
                    style={{fontSize: viewPort.zoom * 2, color: pin.userName === currentUser ? "tomato" : "slateblue"}}
                  />

                </Marker>
                {
                  pin._id === currentPlaceId && (
                      <Popup
                        longitude={pin.lon}
                        latitude={pin.lat}
                        closeOnClick={false}
                        closeOnMove={false}
                        anchor='left'
                      >
                        <div className='card'>
                          <label>Place</label>
                            <h4 className='place'>{pin.title}</h4>
                            <label>Review</label>
                            <p className='description'>{pin.description}</p>
                            <div className='stars'>
                              {Array(pin.rating).fill(<StarIcon className='star'/>)}
                            </div>

                            <label>Information</label>
                            <div className='info'>
                                <span className='userName'>Created By <strong>{pin.userName}</strong></span>
                                <span className='date'>Created At <strong>{format(pin.createdAt)}</strong></span>
                            </div>
                        </div>

                      </Popup>
                    )
                }

              </>
            ))
          }

          {
            newPlace && (
                <Popup
                  longitude={newPlace.lng}
                  latitude={newPlace.lat}
                  closeOnClick={false}
                  closeOnMove={false}
                  onClose={() => setNewPlace(null)}
                  anchor='left'
                >
                  <div className='card'>
                    <form onSubmit={handlePinSubmit}>
                      <label>Title</label>
                      <input placeholder='Enter a title...'
                        onChange={(e)=> setTitle(e.target.value)}
                      />

                      <label>Review</label>
                      <textarea placeholder='Say someting about this place...'
                        onChange={(e) => setDescription(e.target.value)}
                      />

                      <label>Rating</label>
                      <select onChange={(e) => setRating(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                      </select>

                      <button className='submitButton' type="submit">Add pin!</button>

                    </form>
                  </div>

                </Popup>
              )
          }
      </Map>

      <div className='footer'>
          <div className='footer_down'>
            {
              currentUser ? (<button className='button logout' onClick={handleLogout}>Log out</button>)
               : (
                <div>
                  
                  <button className='button login'
                    onClick={()=>{setShowLogin(true)}}
                  >
                    Login
                  </button>

                  <button className='button register'
                    onClick={()=> {setShowRegister(true)}}
                  >
                    Register
                  </button>
                </div>
              )
            }
          </div>

      </div>
      
      {showRegister && <Register setShowRegister = {setShowRegister} />}
      
      {showLogin && <Login setShowLogin = {setShowLogin} setCurrentUser = {setCurrentUser} /> }
    </div>
  );
}

export default App;
