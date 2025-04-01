import { useEffect, useState } from "react"

export const UserIpAdd = () => {

  const [ipAddress, setIPAddress] = useState('')
  const [country, setCountry] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    fetch('https://geolocation-db.com/json/')
      .then(response => response.json())
      .then(data => {
        setIPAddress(data.IPv4)
        setCountry(data.country_name)
        setLatitude(data.latitude)
        setLongitude(data.longitude)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <p>Your IP Address is: {ipAddress}</p>
      <p>Your country is: {country}</p>
      <p>Your latitude is: {latitude}</p>
      <p>Your longitude is: {longitude}</p>
    </div>
  )
}