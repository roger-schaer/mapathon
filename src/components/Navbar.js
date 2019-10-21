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

    render() {

        return (
            <div >
                <Navbar color="light" light expand="md" style={{maxHeight: '7vh', minHeight: '35pt', paddingTop: '1px'}}>
                    <NavbarBrand href="/">Mapathon</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/manage">Manage Categories/Tags</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/help">Help</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/about">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://www.hevs.ch/en/" target="_blank">HES-SO Valais//Wallis</NavLink>
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