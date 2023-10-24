import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from "reactstrap";
import { NavLink as RRNavLink } from 'react-router-dom';

import Login from "./Login";
import { useAuthContext } from '../auth/AuthProvider'
import Register from "./Register";

const NavbarTerraria = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);
    const [modalRegister, setModalRegister] = useState(false);
    const Auth = useAuthContext()

    const toggle = () => setIsOpen(!isOpen);
    const toggleLogin = () => setModalLogin(!modalLogin);
    const toggleRegister = () => setModalRegister(!modalRegister);
    return (
        <div>
            <Navbar style={{ backgroundColor: "#604436" }} dark expand="md" fixed="top">
                <NavbarBrand href="/">
                    <img src="./terraria.png" alt="terraria logo" style={{ maxWidth: "200px" }}></img>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} className="ms-auto" />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        {!Auth.token ? <>
                            <NavItem>
                                <NavLink to="/" tag={RRNavLink}>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ cursor: "pointer" }} onClick={toggleLogin}>Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ cursor: "pointer" }} onClick={toggleRegister}>Register</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">
                                    GitHub
                                </NavLink>
                            </NavItem>
                        </> : <>
                                <NavbarText>Hi {Auth.user?.name}!</NavbarText>
                                <NavItem>
                                    <NavLink to="/" tag={RRNavLink}>Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/usernpcs" tag={RRNavLink}>Npcs created</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{ cursor: "pointer" }} onClick={Auth.logout}>Logout</NavLink>
                                </NavItem>
                        </>}
                        
                        
                    </Nav>
                </Collapse>
            </Navbar>
            <Login modalLogin={modalLogin} toggleLogin={toggleLogin} />
            <Register modalRegister={modalRegister} toggleRegister={toggleRegister} />
        </div>
    );
};

export default NavbarTerraria;