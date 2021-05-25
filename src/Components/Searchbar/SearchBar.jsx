import React from 'react'
import './SearchBar.css'


function SearchBar(props) {
    
    return (
        <div>
            <input value={props.value} placeholder="Search..." className="bar" onChange={(event) => props.SetSearchTerm(event.target.value)}/>
        </div>
    )
}

export default SearchBar