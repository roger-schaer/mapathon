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
        <div id={"divCb"} id={props.id+"div"}>
            <label htmlFor={props.id} id={"label"}>
                {props.nameElement}<input type="checkbox" id={props.id} name={props.nameElement} onChange={manageChange} checked={isChecked}/>
            </label>
            <hr color="black"/>
        </div>
    )
}