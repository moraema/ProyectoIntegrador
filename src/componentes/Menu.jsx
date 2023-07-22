import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../Imagenes/logo_1.png';
import tecnologia from "../Imagenes/whatsapp_image_2023_07_08_at_1_27_1.png";
import teclado from '../Imagenes/teclado_1.png';
import usuario from "../Imagenes/icono cliente.png";
import Perfil from "../Imagenes/perfil_1.png";
import CerrarSesion from "../Imagenes/cerrarsesion.png";
import Cuenta from "../Imagenes/cliente2.png";
import '../estilos/menuestilos.css';

const Menu = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState(null);
  const { accountId } = useParams();

  useEffect(() => {
    // Llamada a la API para obtener los datos de la cuenta
    const fetchAccountData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/account/${accountId}`);
        const data = await response.json();
        if (response.ok) {
          setAccountData(data.accountData);
        } else {
          console.error('Error al obtener los datos de la cuenta:', data.message);
        }
      } catch (error) {
        console.error('Error al realizar la llamada a la API:', error);
      }
    };

    if (accountId) {
      fetchAccountData();
    }
  }, [accountId]);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };
 
  const handleLogout = () => {
    navigate('/');
  };

  const handleGeneratePayment = (paquete) => {
    let paymentLink;
    // Agrega lógica para determinar el enlace según el paquete seleccionado
    switch (paquete) {
      case '3 megas':
        paymentLink = 'https://buy.stripe.com/test_6oE8yO45w89s5EIbIN';
        break;
      case '5 megas':
        paymentLink = 'https://buy.stripe.com/test_7sI3eueKablEaZ24gm';
        break;
      case '10 megas':
        paymentLink = 'https://buy.stripe.com/test_dR69CS31sahA4AE4gn';
        break;
      case '20 megas':
        paymentLink = 'https://buy.stripe.com/test_dR63eugSiexQd7a4go';
        break;
      default:
        alert("selecione un paquete")
        break;
    }

    // Abrir enlace en una nueva pestaña
    window.open(paymentLink, '_blank');
  };

  return (
              <div>
                <div className="sidebar-container">
      <div className="centered-images-container">
        <img src={tecnologia} alt="Imagen tecnologia" className="tecnologia-image" />
      </div>
      <div className="profile-container">
        <div className="profile-links">
          <img src={usuario} alt="Logo de usuario" className="user-logo" />
          <div className="link-container">
            <img src={Perfil} alt="Icono Mi perfil" className="icon-image" />
            <button className="btn btn-link" onClick={toggleProfile}>
              Mi perfil
            </button>
          </div>
          <div className="link-container" style={{ marginBottom: '8px' }}>
            <img src={CerrarSesion} alt="Icono Cerrar sesión" className="icon-image" />
            <a href="#" onClick={handleLogout}>
              Cerrar sesión
            </a>
          </div>
        </div>
      </div>
    </div>
      <div className="body-container">
    
          <div className="account-container">
            <img src={Cuenta} alt="Mi cuenta" className="account-image" />
            <p className="account-text">Mi cuenta</p>
          </div>
  
      </div>
      <div className="footer-container">
        <button className="btn btn-link" onClick={toggleContactModal} style={{ color: 'white' }}>
          Contáctanos
        </button>

        <div className="footer-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="icon" />
          </a>
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Número de paquete</th>
              <th>Precio</th>
              <th>Velocidad</th>
              <th>Status</th>
              <th>Pago</th>
            </tr>
          </thead>
          <tbody>
            {accountData ? (
              <tr className="table-row">
                <td>{accountData?.ID_Paquetes}</td>
                <td>$ {accountData?.Precio}</td>
                <td>{accountData?.Velocidad}</td>
                <td>{accountData?.Status}</td>
                <td>
                  <button
                    onClick={() => handleGeneratePayment(accountData?.Velocidad)}
                    style={{ backgroundColor: '#4287f5', color: 'white', padding: '4px 8px', borderRadius: '10px' }}
                  >
                    Generar Pagos
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="4">Cargando datos...</td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="thank-you-text">¡Gracias por creer en nuestra empresa! Contigo llegamos más lejos.</p>
      </div>
      <Modal show={isProfileOpen} onHide={toggleProfile}>
        <Modal.Header closeButton>
          <Modal.Title>Información de perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={logo} alt="Cliente Icono" className="img-fluid profile-image" />
          </div>
          <p>IP: {accountId}</p>
          <p>Nombre: {accountData?.Nombre}</p>
          <p>Apellido Paterno: {accountData?.Apellido_Paterno}</p>
          <p>Apellido Materno: {accountData?.Apellido_Materno}</p>
          <p>Teléfono: {accountData?.Telefono}</p>
          <p>Fecha de contrato: {accountData?.Dia}-{accountData?.Mes}-{accountData?.Año}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={toggleProfile}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
       
      <Modal show={isContactModalOpen} onHide={toggleContactModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información de la empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>Contacto</h4>
            <p>
              Somos una empresa dedicada a brindar servicios de Internet de alta velocidad a nuestros clientes. Nuestro objetivo es proporcionar conexiones rápidas y confiables para mantenerlos conectados con el mundo.
            </p>
            <p>
              Contamos con un equipo de profesionales altamente capacitados y tecnología de vanguardia para garantizar una experiencia en línea excepcional.
            </p>
            <p>
              Si tienes alguna pregunta o inquietud, no dudes en contactarnos a través de nuestros números de contacto proporcionados.
            </p>

            <h4>Información de contacto:</h4>
            <p>Gmail: clientemanagerchtecnologia@gmail.com</p>
            <p>Teléfono: 961 189 22 15</p>
            <p>Dirección: 4ta Sur Poniente, Colonia Terán</p>

            <h4>Paquetes de nuestro servicio</h4>
            <p>3 megas -------- Precio: $200</p>
            <p>5 megas -------- Precio: $300</p>
            <p>10 megas -------- Precio: $500</p>
            <p>20 megas -------- Precio: $1000</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={toggleContactModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <style>
        {`

            .centered-images-container {
             display: flex;
             justify-content: center;
             align-items: center;
             width: 100%;
            }

          .tecnologia-image {
           width: 70%; 
           height: auto;
           left: 8%;
           top: 1%;
           border-radius: 20px; 
          }
          
          
          .sidebar-container {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 16%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 2;
            padding-top: 70px;
          }
          
          .profile-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: relative; /* Cambia esto a relative para poder ajustar la posición del logo de usuario */
            top: -90px; /* Ajusta el valor según tu preferencia para mover la imagen de usuario hacia arriba */
            left: 10px;
            width: 100%;
          }

      
        .account-container {
          position: absolute;
          top: 70px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
       
        }

        .account-image {
          width: 100px;
          height: auto;
          margin-right: 8px;
          
        }

        .account-text {
          font-size: 40px;
          font-weight: bold;
          color: #fff;
        }

        .thank-you-text {
          text-align: center;
          margin-top: 70px;
          font-size: 30px;
          font-weight: bold;
        }

        .modal-content {
          border: 2px solid blue;
        }

        .footer-container {
          background-color: #003366;
          padding: 16px 0;
          text-align: center;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
        }

       

        .footer-icons {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .footer-icons .icon {
          font-size: 24px;
          margin: 0 10px;
          color: #fff;
        }

        .left-image-container {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          padding: 0 10px;
        }

        .left-image {
          height: 120px;
        }

        .body-container {
          background-image: url(${teclado});
          background-size: cover;
          background-position: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 25vh;
          filter: blur(0.7px); 
        }

       
        .user-logo {
          width: 180px;
          height: auto;
          border-radius: 20px; 
          margin-top: 5px; 
        }

        .profile-links {
          margin-top: 16px;
        }

        .link-container {
          display: flex;
          align-items: center;
        }

        .icon-image {
          width: 30px;
          height: auto;
          margin-right: 12px;
        }

        .profile-links button {
          margin-right: 8px;
        }

        .profile-links a {
          display: block;
          color: #000;
          margin-top: 8px;
        }

        .table-container {
          margin-top: 300px;
          margin-left: 300px;
        }

        .table {
          width: 80%;
        }
        `}
      </style>
    </div>
  );
};

export default Menu;