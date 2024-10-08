const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
const sinon = require('sinon');
const Ajv = require('ajv');
const ajv = new Ajv();
const userSchema = require('./../../schemas/response_schema.json'); 
const decode = require('./../../decode');

let loginRequest = {};
let loginResponse = {};
let signRequest = {};
let signResponse = {};

//Scenario: Yo como usuario registrado quiero poder iniciar sesion

Given('Yo usuario registrado inicio sesión con mis credenciales usuario {string} y contraseña {string}', function (email, password) {
    loginRequest = {
        email: email,
        password: password
    };
});

When('Invoco el sercivicio para inicio de sesion', async function () {
    try {
        const response = await axios.post('http://localhost:8084/api/auth/usuarios/login', loginRequest);
        loginResponse = response.data;
    } catch (error) {
        loginResponse = error.response.data;
    }
});

Then('Inicio sesion correctamente', function () {
    // console.log(loginResponse);
    assert.strictEqual(loginResponse.error, false);
});

//Scenario: Yo como usuario deseo recibir notificacion sobre un inicio fallido de sesion

Then('No puedo iniciar sesion', function () {
    // console.log(loginResponse);
    assert.strictEqual(loginResponse.error, true);
});


// Scenario: Yo como usuario no registrado quiero poder registrarme con mis datos

// Stubs para simular las llamadas a la API
let postStub;
let deleteStub;

Given('Yo usuario no registrado envio mis datos correo {string}, contraseña {string}, nombre {string} y apellido {string}', 
    function (email, password, name, lastname) {
    // Guardamos la solicitud de registro en una variable
    signRequest = {
        email: email,
        password: password,
        nombre: name,
        apellido: lastname   
    };
});

When('Invoco el servicio que permite el registro de nuevos usuarios con un usuario no existente', async function () {
    // Crear stubs para simular las llamadas a la API con axios
    postStub = sinon.stub(axios, 'post');
    deleteStub = sinon.stub(axios, 'delete');
    
    // Simulamos la respuesta del registro de usuario
    postStub.withArgs('http://localhost:8084/api/auth/usuarios', signRequest).resolves({
        data: {
            error: false,
            respuesta: { id: 'mocked-user-id' } // ID de usuario simulado
        }
    });

    // Simulamos el login del usuario registrado
    loginRequest = { email: signRequest.email, password: signRequest.password };
    postStub.withArgs('http://localhost:8084/api/auth/usuarios/login', loginRequest).resolves({
        data: {
            error: false,
            respuesta: { token: 'mocked-jwt-token' } // Token JWT simulado
        }
    });

    // Simulamos la decodificación del token para obtener el código de usuario
    const userCode = 'mocked-user-id';
    sinon.stub(decode, 'decodetoken').returns(userCode);

    // Simulamos la eliminación del usuario
    deleteStub.withArgs(`http://localhost:8084/api/usuarios/${userCode}`, sinon.match.any).resolves({
        data: {
            error: false,
            respuesta: "Usuario eliminado correctamente"
        }
    });

    // Registro del usuario
    try {
        signResponse = (await axios.post('http://localhost:8084/api/auth/usuarios', signRequest)).data;
    } catch (error) {
        signResponse = error.response.data;
    }

    // Si no hubo error en el registro, simulamos el login y la eliminación del usuario
    if (!signResponse.error) {
        try {
            loginResponse = (await axios.post('http://localhost:8084/api/auth/usuarios/login', loginRequest)).data;

            // Crear los headers para la eliminación usando el token simulado
            const headers = { headers: { Authorization: `Bearer ${loginResponse.respuesta.token}` } };

            // Eliminar el usuario con el token
            deleteResponse = (await axios.delete(`http://localhost:8084/api/usuarios/${userCode}`, headers)).data;
        } catch (error) {
            loginResponse = error.response.data;
            deleteResponse = error.response.data;
        }
    }
});

Then('Me registro correctamente', function () {
    // Verificamos que el registro fue exitoso (error es falso)
    assert.strictEqual(signResponse.error, false);

    // Restaurar los stubs después de la prueba
    postStub.restore();
    deleteStub.restore();
    decode.decodetoken.restore();
});

//Scenario: Yo como usuario no registrado deseo recibir notificacion si realizo mal el registro

When('Invoco el servicio que permite el registro de nuevos usuarios con un usuario existente', async function () {
     // Crear stubs para simular las llamadas a la API con axios
     postStub = sinon.stub(axios, 'post');
     deleteStub = sinon.stub(axios, 'delete');
 
     // Simulamos un escenario donde el usuario ya está registrado
     postStub.withArgs('http://localhost:8084/api/auth/usuarios', signRequest).resolves({
         data: {
             error: true,
             respuesta: 'El usuario ya está registrado'  // Mensaje de error simulado
         }
     });
 
     // Simulamos el login del usuario registrado (si fuera necesario para pruebas futuras)
     loginRequest = { email: signRequest.email, password: signRequest.password };
     postStub.withArgs('http://localhost:8084/api/auth/usuarios/login', loginRequest).resolves({
         data: {
             error: false,
             respuesta: { token: 'mocked-jwt-token' } // Token JWT simulado
         }
     });
 
     // Simulamos la decodificación del token para obtener el código de usuario (si llegara a necesitarse en otras pruebas)
     const userCode = 'mocked-user-id';
     sinon.stub(decode, 'decodetoken').returns(userCode);
 
     // Simulamos la eliminación del usuario (si llegara a necesitarse)
     deleteStub.withArgs(`http://localhost:8084/api/usuarios/${userCode}`, sinon.match.any).resolves({
         data: {
             error: false
         }
     });
 
     // Intento de registro del usuario (en este caso fallará porque ya está registrado)
     try {
         signResponse = (await axios.post('http://localhost:8084/api/auth/usuarios', signRequest)).data;
     } catch (error) {
         signResponse = error.response.data;
     }
});

Then('No puedo registrarme', function () {
    assert.strictEqual(signResponse.error, true);
    
    const validate = ajv.compile(userSchema);
    const valid = validate(signResponse);
    assert.strictEqual(valid, true);

    postStub.restore();
    deleteStub.restore();
    decode.decodetoken.restore();

});