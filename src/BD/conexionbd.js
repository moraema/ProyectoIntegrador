const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors')
const port = 8080; // Elige el puerto que desees para tu API



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});




app.use(cors());
// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'bdintegrador.ctafc3zavajx.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'manuel262004uni',
    database: 'BdIntegrador'
});


// Conexión a la base de datos
db.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});



app.use(express.json()); // Middleware para procesar JSON en las solicitudes

app.on('error', (err) => {
    console.error('Ocurrió un error en el servidor:', err);
});



// Ruta para validar el inicio de sesión
app.post('/login', (req, res) => {
    const { Nombre_usuario, Contraseña } = req.body;

    const query = `SELECT ID_Cuentas FROM Cuentas WHERE Nombre_usuario = ? AND Contraseña = ?`;
    const values = [Nombre_usuario, Contraseña];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        } else {
            console.log('Resultados de la consulta:', results);
            if (results.length > 0) {
                const accountId = results[0].ID_Cuentas;
                res.status(200).json({ message: 'Inicio de sesión exitoso', accountId });
            } else {
                res.status(401).json({ message: 'Usuario y/o contraseña incorrecto' });
            }
        }
    });
});

app.get('/account/:accountId', (req, res) => {
    const accountId = req.params.accountId;

    const query = `SELECT * FROM Clientes 
                   JOIN Contacto ON Clientes.Contacto_ID_Contacto = Contacto.ID_Contacto 
                   JOIN Paquete ON Clientes.Paquete_ID_Paquetes = Paquete.ID_Paquetes 
                   JOIN Fecha ON Clientes.Fecha_ID_Fecha = Fecha.ID_Fecha 
                   WHERE Clientes.Cuentas_ID_Cuentas = ?`;
    const values = [accountId];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        } else {
            console.log('Resultados de la consulta:', results);
            if (results.length > 0) {
                const accountData = results[0];
                res.status(200).json({ message: 'Datos de la cuenta obtenidos', accountData });
            } else {
                res.status(404).json({ message: 'Cuenta no encontrada' });
            }
        }
    });
});




// Iniciar el servidor
const server = app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

// Manejo de errores no capturados en las promesas
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Aquí puedes agregar código adicional para manejar el error de manera adecuada
});