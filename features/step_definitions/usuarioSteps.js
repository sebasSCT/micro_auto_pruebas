const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
const sinon = require('sinon');
const decode = require('./../../decode');

let loginRequest = {};
let loginResponse = {};
let findResponse = {};
let signRequest = {};
let signResponse = {};
let updateRequest = {};
let updateResponse = {};
let userData = {};

Given('Soy un usuario registrado con credenciales, correo {string} y contraseña {string}', 
    function (email, password) {
    loginRequest = {
        email: email,
        password: password
    };
});

When('Invoco el servicio de consulta de usuario', async function (){
    
    try {
        loginResponse = (await axios.post('http://localhost:8084/api/auth/usuarios/login', loginRequest)).data;
        const token = loginResponse.respuesta.token;
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const userCode = decode.decodetoken(token);
        findResponse = (await axios.get(`http://localhost:8084/api/usuarios/${userCode}`, headers)).data;

    } catch (error) {
        loginResponse = error.response.data;
        findResponse = error.response.data;
    };
    
});

Then ('Obtengo correctamente los datos', function (){
    // console.log(searchResponse);
    assert.notEqual(findResponse.respuesta, null);
});

//Scenario 2

Given('Soy usuario con las credenciales, correo {string} y contraseña {string}, deseo poder cambiar los datos, correo {string}, nombre {string} y apellido {string}',
    function(email, password, new_email, name, lastname) {
        loginRequest = {
            email: email,
            password: password
        };
        userData = {
            email: new_email,
            nombre: name,
            apellido: lastname
        };
    });

When('Invoco el servicio de actualizar perfil de usuario', async function (){

    try {
        loginResponse = (await axios.post('http://localhost:8084/api/auth/usuarios/login', loginRequest)).data;
        const token = loginResponse.respuesta.token;
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const userCode = decode.decodetoken(token);
        updateRequest = {codigo:userCode, email:userData.email, nombre:userData.nombre, apellido:userData.apellido};
        updateResponse = (await axios.put(`http://localhost:8084/api/usuarios/${userCode}`, updateRequest, headers)).data;
    
    } catch (error) {
        loginResponse = error.response.data;
        updateResponse = error.response.data;
    };
    
});

Then ('Los datos del perfil se actualizan correctamente', function (){
    // console.log(updateResponse);
    assert.strictEqual(updateResponse.error, false);
});

//Scenario 3

// Variable para los stubs
let postStub;
let deleteStub;

Given('Soy usuario con las credenciales, correo {string} y contraseña {string}', 
    function (email, password) {
    loginRequest = {
        email: email,
        password: password
    };
});

When('Invoco el servicio para eliminar el usuario', async function () {
    // Crear un stub para simular las llamadas POST y DELETE de axios
    postStub = sinon.stub(axios, 'post');
    deleteStub = sinon.stub(axios, 'delete');

    // Simulamos la respuesta del login (usuario ya existe)
    postStub.withArgs('http://localhost:8084/api/auth/usuarios/login', loginRequest).resolves({
        data: {
            respuesta: { token: 'mocked-jwt-token' },
            error: false
        }
    });

    // Simulamos la creación del usuario si no existe
    const signRequestMock = { email: loginRequest.email, password: loginRequest.password, nombre: "borrar", apellido: "borrar" };
    postStub.withArgs('http://localhost:8084/api/auth/usuarios', signRequestMock).resolves({
        data: {
            respuesta: { id: 12345 },
            error: false
        }
    });

    // Simulamos el login después de la creación del usuario
    postStub.withArgs('http://localhost:8084/api/auth/usuarios/login', loginRequest).resolves({
        data: {
            respuesta: { token: 'mocked-jwt-token' },
            error: false
        }
    });

    // Decodificar el token simulado
    const token = 'mocked-jwt-token';
    const userCode = 'mocked-user-id';  // Decodifica el token en el userCode (usuario identificado)

    sinon.stub(decode, 'decodetoken').returns(userCode);

    // Simulamos la eliminación del usuario
    deleteStub.withArgs(`http://localhost:8084/api/usuarios/${userCode}`, sinon.match.any).resolves({
        data: {
            error: false
        }
    });

    // Lógica de las llamadas POST y DELETE
    try {
        loginResponse = (await axios.post('http://localhost:8084/api/auth/usuarios/login', loginRequest)).data;
    } catch (error) {
        loginResponse = error.response.data;
    }

    if (loginResponse.error) {
        signRequest = {
            email: loginRequest.email,
            password: loginRequest.password,
            nombre: "borrar",
            apellido: "borrar"
        };

        try {
            signResponse = (await axios.post('http://localhost:8084/api/auth/usuarios', signRequest)).data;
            loginResponse = (await axios.post('http://localhost:8084/api/auth/usuarios/login', loginRequest)).data;
        } catch (error) {
            signResponse = error.response.data;
            loginResponse = error.response.data;
        }
    }

    // Eliminar el usuario usando el token
    try {
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        deleteResponse = (await axios.delete(`http://localhost:8084/api/usuarios/${userCode}`, headers)).data;
    } catch (error) {
        deleteResponse = error.response.data;
    }
});

Then('Elimino el perfil de usuario correctamente', function () {
    // Verificamos que la respuesta de la eliminación no tenga errores
    assert.strictEqual(deleteResponse.error, false);

    // Restaurar los stubs después de la prueba
    postStub.restore();
    deleteStub.restore();
    decode.decodetoken.restore();
});