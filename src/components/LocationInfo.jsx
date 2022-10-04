import React from 'react'

const LocationInfo = ({location}) => {
  
    return (
    <article>
        <h2 className='location-name'> {location?.name}</h2>
        <ul>
            <li className='location-item'> <span>Type:</span> {location?.type}</li>
            <li className='location-item'> <span>Dimention:</span> {location?.dimension}</li>
            <li className='location-item'> <span>Population:</span> {location?.residents.length} </li>
        </ul>
    </article>

  )
}

export default LocationInfo