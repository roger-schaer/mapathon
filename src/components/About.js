import React from "react";

/*
* About Page, used to display informations about us*/
export default class AboutPage extends React.Component{
    constructor(props){
        super(props);

    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render(){
        return(
            <div>
                <p>this is the about page</p>
                <p><b>Gimme some munchies</b></p>
            </div>
        );
    }
}