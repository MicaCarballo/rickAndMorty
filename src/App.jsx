import { useEffect, useState } from 'react';
import './index.css';
import './App.css';
import getRandomNumber from './utils/getRandomNumber';
import axios from 'axios';
import LocationInfo from './components/LocationInfo';
import CardResident from './components/CardResident';
import FilterList from './components/FilterList';
import Error from './components/Error';
import Loading from './components/Loading';

function App() {

  const [location, setlocation] = useState()
  const [searchInput, setsearchInput] = useState()
  const [suggestedList, setsuggestedList] = useState()
  const [hasError, sethasError] = useState(false)
  const [isloading, setIsLoading] = useState(true)
  useEffect(() => {
    let randomId = getRandomNumber()
    if (searchInput) {
      randomId = searchInput
    }
    const URL = `https://rickandmortyapi.com/api/location/${randomId}`


    axios.get(URL)
      .then(res => {
        sethasError(false),
          setlocation(res.data)
      })
      .catch(error => sethasError(true))

  }, [searchInput])

  const handleSubmit = e => {
    e.preventDefault()
    setsearchInput(e.target.idLocation.value)
  }
  const handleChange = event => {
    if (event.target.value === ``) {
      return setsuggestedList()
    }

    const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`
    axios.get(URL)
      .then(res => setsuggestedList(res.data))
      .catch(err => console.log(err))

  }

  useEffect(() => {
    if (location) {
      setIsLoading(false)
    }

    if (!location) {
      setTimeout(() => {
        setIsLoading(true)
      }, 3000)
    }
  }, [location])
  return (
    <div className="App">
      { location ?
       <>
      <div className='banner'></div>
      <h1 className='main_title'>Rick & Morty</h1>
      <form onSubmit={handleSubmit}>
        <input id='idLocation'
          placeholder='Enter number from 1 to 126 or location name'
          type="text"
          onChange={handleChange}
        />
        <button className='search_button' >Search</button>
        
        <FilterList
          setsearchInput={setsearchInput}
          suggestedList={suggestedList}
        />
      </form>
      
      {
        hasError ?
          <Error />
          :
          <>
            <LocationInfo location={location} />
            <div className='card_container'>
              {
                location?.residents.map(url =>
                (
                  <CardResident
                    url={url}
                    key={url}
                  />
                )
                )
              }
            </div>
          </>
      }
      
      </>
      :
      <Loading />
       }
    </div>
  )
}

export default App
