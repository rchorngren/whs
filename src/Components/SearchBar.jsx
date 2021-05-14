import React, { useEffect, useState } from 'react'


function SearchBar(props) {
    
    return (
        <>
        <input value={props.value} placeholder="Search..." style={{
            width: "120px", 
            height: "20px"
        }} onChange={(event) => props.SetSearchTerm(event.target.value)}/>
        </>
    )
}

export default SearchBar