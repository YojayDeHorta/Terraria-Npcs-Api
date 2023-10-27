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
import { FaHouseChimney } from 'react-icons/fa6';
import { BsFillFileEarmarkPersonFill } from 'react-icons/bs';
import { LuLogOut } from 'react-icons/lu';
import { LuLogIn } from 'react-icons/lu';
import { BsGithub } from 'react-icons/bs';
import { BsFillDoorOpenFill } from 'react-icons/bs';

import Login from "./Login";
import { useAuthContext } from '../auth/AuthProvider'
import Register from "./Register";
import { useUtilContext } from '../auth/UtilitiesProvider'

const NavbarTerraria = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);
    const [modalRegister, setModalRegister] = useState(false);
    const [Loading, setLoading] = useState(false);
    const util = useUtilContext()
    const Auth = useAuthContext()

    const toggle = () => setIsOpen(!isOpen);
    const toggleLogin = () => setModalLogin(!modalLogin);
    const toggleRegister = () => setModalRegister(!modalRegister);
    const loadingFake = () => {
        setLoading(true)
        setTimeout(() => {
            Auth.logout();
            setLoading(false);
            util.toggleToast("Advice", "session closed correctly!")

        }, 3000)
    };

    return (
        <div>
            <Navbar style={{ backgroundColor: "#604436" }} dark expand="md" fixed="top">
                <NavbarBrand reloadDocument to="/" tag={RRNavLink}>
                    <img src="./terraria.png" alt="terraria logo" style={{ maxWidth: "200px" }}></img>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} className="ms-auto" />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        {!Auth.token ? <>
                            <NavItem>
                                <NavLink to="/" tag={RRNavLink} >
                                    <FaHouseChimney /> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ cursor: "pointer" }} onClick={toggleLogin}> <LuLogIn/> Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ cursor: "pointer" }} onClick={toggleRegister}> <BsFillDoorOpenFill/> Register</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/YojayDeHorta/Terraria-Npcs-Api">
                                    <BsGithub /> GitHub
                                </NavLink>
                            </NavItem>
                        </> : <>
                                <NavbarText style={{ color:"rgb(183, 126, 27)"}} className="me-2">Hi {Auth.user?.name}! </NavbarText>
                                <NavItem>
                                    <NavLink to="/" tag={RRNavLink}> <FaHouseChimney/> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/usernpcs" tag={RRNavLink}> <BsFillFileEarmarkPersonFill/> Npcs created</NavLink>
                                </NavItem>
                                <NavItem>
                                   
                                    {
                                        Loading ?
                                         <div className="mt-2 ms-3 me-3">
                                            <div className="spinner-border spinner-border-sm text-light ms-1" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        :<NavLink style={{ cursor: "pointer" }} onClick={loadingFake}>
                                            Logout <LuLogOut/>
                                        </NavLink>
                                    }
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