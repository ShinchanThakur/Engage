/*
    HOOK RULES

1. Always write it inside the component or function
2. Component name must be PascalCase (first letter should be uppercase)
3. If you dont want to import a hook then you can directly write it as React.hookName
4. Don't call Hooks inside loops, conditions, or nested functions
*/

import React, {useState} from 'react'

const LearnUseState = () => {
    
    var val = "Initial Value"
    const changeValueWithoutUseState = () => {      //The value is being changed, but the component is not being re-rendered
        val = "Changed Value"                       //Therefore we see the old value on the screen
        alert(val)
    }

    const [value, setVal] = useState("Initial Value")
    /*
        1. useState is a special function that returns an array of size 2.
            First element is the value
            Second element is the function to change that value
        2. Therefore we use array restructuring to get the two elements
        3. We can also get these elements like this:
            var fruitStateVariable = useState('banana');
            var fruit = fruitStateVariable[0];
            var setFruit = fruitStateVariable[1];
    */
   
    const changeValueWithUseState = () => {         //The component is re-rendered after changing value
        setVal("Changed Value")                     //Therefore we are able to see the new value on the screen
    }

    return (
        <>
            <div>
                <h1>{ val }</h1>
                <button className="btn" onClick={changeValueWithoutUseState}>Change Value Without useState</button>
                <br/><br/>
                <h1>{ value }</h1>
                <button className="btn" onClick={changeValueWithUseState}>Change Value with useState </button>
            </div>
        </>
    )
}

export default LearnUseState
