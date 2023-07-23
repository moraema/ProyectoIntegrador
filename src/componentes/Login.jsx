import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../estilos/styles.css";
import internet from "../Imagenes/whatsapp_image_2023_07_08_at_1_27_1.png"

const LoginForm = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [accountId, setAccountId] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username.length === 0 || password.length === 0) {
      setModalMessage('Por favor, completa todos los campos correctamente.');
      setShowModal(true);
    } else if (username.length !== 8 || password.length !== 8) {
      setModalMessage('Verifica tu usuario o contraseña.');
      setShowModal(true);
    } else {
      try { 
        const response = await fetch('http://3.85.150.8/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Nombre_usuario:username , Contraseña:password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Set the accountId state
          const accountId = data.accountId;
          setAccountId(accountId);
      
          // Navigate to the Menu page with the accountId parameter
          navigate(`/Menu/${accountId}`);
        } else {
          // Si la respuesta tiene un error, muestra el mensaje de error en el modal
          setModalMessage(data.message);
          setShowModal(true);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setModalMessage('Error en el servidor');
        setShowModal(true);
      }
    }
  };

  return (
    <Container fluid className="login-container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row>
        <Col md={7} className="bg-dark text-white">
          <div className="p-5">
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formUsername">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu usuario" className="mb-3" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingresa tu contraseña" className="mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4">Iniciar sesión</Button>
            </Form>
          </div>
        </Col>
        <Col md={4} className="text-center d-flex align-items-center justify-content-center">
          <div className="p-5 bg-white" style={{ height: '100%', borderRadius: 0 }}>
            <h1 className="mb-4" style={{ fontSize: '2.2rem' }}>BIENVENIDO</h1>
            <img src={internet} alt="Imagen de bienvenida" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '20px' }} />
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LoginForm;
