import React, {useState, useEffect} from 'react';


export function CheckBoxElement(props) {

    let resultCheck = props.isChecked;
    let [isChecked, setIsChecked] = useState(resultCheck);

    let manageChange = () => {
        if(isChecked){
            setIsChecked(false);
        }else{
            setIsChecked(true);
        }
    }

    return(
        <div style={{display:"block"}}>
            <input type="checkbox" id={props.id} name={props.nameElement} onChange={manageChange} checked={isChecked}/>
            <label htmlFor={props.nameCategorie}>{props.nameElement}</label>
            <hr color="black"/>
        </div>
    )
}