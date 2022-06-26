import React, { useEffect } from 'react';
import { Navbar, Offcanvas, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import utils from '../utils';

const Header = ({user}) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (utils.isEmptyOrNullOrUndefined(localStorage.getItem("user")))
            navigate("/")
    }, [])

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
                                    <Link to="/worktime" className={'menu-option'}>Pontos</Link>
                                    <hr />
                                    <Link to="/department" className={'menu-option'}>Departamentos</Link>
                                    <Link to="/employee" className={'menu-option'}>Funcionários</Link>
                                    <Link to="/role" className={'menu-option'}>Cargos</Link>
                                    <br />
                                    <Link
                                        to="/"
                                        className={'menu-option button'}
                                        style={{
                                            marginLeft: '36px',
                                            width: '110px',
                                            alignItems: 'center',
                                            alignSelf: 'flex-start',
                                        }}
                                    >
                                        Sair
                                    </Link>
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