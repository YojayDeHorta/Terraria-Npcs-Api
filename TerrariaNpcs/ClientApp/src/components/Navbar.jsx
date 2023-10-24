import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";

const NavbarTerraria = props => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar style={{ backgroundColor: "#604436" }} dark expand="md" fixed="top">
                <NavbarBrand href="/">
                    <img src="./terraria.png" alt="terraria logo" style={{ maxWidth: "200px" }}></img>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} className="ms-auto" />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/">Register</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                GitHub
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavbarTerraria;