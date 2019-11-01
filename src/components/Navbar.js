/*
* This code has been retrieved on oct. 5 2019
* on Reactstrap.github.io
* */
import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import request from "../utils/request";
import endpoints from "../endpoints";
import { useAuth0 } from "../react-auth0-spa";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";
import {Link} from "react-router-dom";

//retrieved from Reactstrap webside
export default class CustomNavbar extends React.Component{

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false

        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    //Design the Navbar
    render() {

        //returns the navbar of the application
        return (
            <div >
                <Navbar className="navbar" color="dark" dark expand="md">
                    <Link className='navbar-brand' to="/">Mapathon</Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link className='navbar-nav' className='nav-link' to="/manage">Manage Categories/Tags </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='navbar-nav' className='nav-link' to="/help" activeClassName="active">Help </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='navbar-nav' className='nav-link' to="/about">About </Link>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://www.hevs.ch/en/" target="_blank">HES-SO Valais//Wallis </NavLink>
                            </NavItem>
                            <NavItem>
                                <b><LoginButton/></b>
                            </NavItem>
                            <NavItem>
                                <LogoutButton/>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}