import React from 'react'

const FilterList = ({suggestedList, setsearchInput}) => {
   
  const handleClick = id =>{
    setsearchInput(id)
  }
  return (
  <ul>
    
      {suggestedList?.results.map(location=>(
        <li onClick={() =>handleClick(location.id)} key={location.id} className="suggestions_list" >{location.name}</li>
      ))}
    </ul>
  )
}

export default FilterList