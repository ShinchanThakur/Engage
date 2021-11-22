import React from 'react'

const ArrayUseState = () => {

    const infoArray = [
        { id: 0, name: "shinchan", age: "5"},
        { id: 1, name: "himawari", age: "1"}
    ]

    const [myArray, setMyArray] = React.useState(infoArray)     //Showing the use of hooks without importing it
    const clearArray = () => {
        setMyArray([])
    }

    return (
        <>
            {
                myArray.map((currentElement) =>     
                    <h1 key={currentElement.id}>Name: {currentElement.name} & Age: {currentElement.age}</h1>    //Each child in a list should have a unique "key" prop.
                                                                                                                //This error shows up if we don't provide a unique key here
                )
            }
        </>
    )
}

export default ArrayUseState
