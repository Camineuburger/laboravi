import React from 'react';
import { Navbar, Offcanvas, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";


const Header = ( ) => {

  return (
    <>
        <header>
            {[false].map((expand) => (
                <Navbar key={expand} bg={"dark"} expand={expand} className={'navbar-dark'}>
                    <Container fluid>
                        <Navbar.Brand href={"#"}>
                            Minha Empresa
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement={"end"}
                            style={{width: '30%'}}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>

                            <Offcanvas.Body
                                style={{
                                    padding: 0,
                                }}
                            >
                                <Nav className={"justify-content-end flex-grow-1"}>
                                    <Link to="/department" className={'menu-option'}>Departamentos</Link>
                                    <Link to="/employee" className={'menu-option'}>Funcionários</Link>
                                    <Link to="/worktime" className={'menu-option'}>Pontos</Link>
                                    <Link to="/role" className={'menu-option'}>Cargos</Link>
                                    <Link to="" className={'menu-option'}>Sair</Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </header>
    </>
  );
}

export default Header;