import React, { useState } from 'react';
import { Navbar, Offcanvas, Nav, NavDropdown, Container } from 'react-bootstrap';


const Header = ( ) => {

  return (
    <>
        <header>
            {[false].map((expand) => (
                <Navbar key={expand} bg={"light"} expand={expand}>
                    <Container fluid>
                        <Navbar.Brand href={"#"}>
                            Minha Empresa
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement={"end"}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menus
                                </Offcanvas.Title>
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                <Nav className={"justify-content-end flex-grow-1 pe-3"}>
                                    <Nav.Link href={"#action1"}>
                                        Início
                                    </Nav.Link>

                                    <Nav.Link href={"#action2"}>
                                        Funcionários
                                    </Nav.Link>

                                    <NavDropdown
                                        title={"Perfil"}
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href={"#action3"}>
                                            Ponto
                                        </NavDropdown.Item>

                                        <NavDropdown.Item href={"#action4"}>
                                            Gestão
                                        </NavDropdown.Item>

                                        <NavDropdown.Divider/>

                                        <NavDropdown.Item href={"#action5"}>
                                            Sair
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}

            <Nav fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="../screens/PointRecord">
                        Resgistrar ponto
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="link-1">
                        Funcionários
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="link-2">
                        Histórico de pontos
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </header>
    </>
  );
}

export default Header;