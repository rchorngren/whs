import React from 'react'
import './SearchBar.css'


function SearchBar(props) {
    
    return (
        <>
        <input value={props.value} placeholder="Search..." className="bar" onChange={(event) => props.SetSearchTerm(event.target.value)}/>
        </>
    )
}

export default SearchBar