import React from "react";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/Button";

const MyNavbar = () => {

    const firebase = useFirebase();

    return (
        <Navbar>
            <Container>
                {firebase.isLoggedIn ? (
                    <Nav className="justify-content-end">
                        <Row>
                            <Col className="xs-auto">
                                <Button onClick={firebase.logout}>Logout</Button>
                            </Col>
                        </Row>
                    </Nav>
                ) : null}
            </Container>
        </Navbar>
    )
}

export default MyNavbar;