const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
require('dotenv').config();

const url = 'http://localhost:3100/loki/api/v1/query_range';
const urlCrud = process.env.BASE_URL;

let loginRequest = {};
let loginResponse = {};
let logEntries = [];

Given('existe un usuario con credenciales válidas con el nombre de usuario {string} y la contraseña {string}', async function (email, password) {
    loginRequest = {
        email: email,
        password: password
    };
});

// When: se invoca el servicio de inicio de sesion
When('se invoca el servicio de inicio de sesion', async function () {
    try {
        loginResponse = (await axios.post(`${urlCrud}/api/auth/usuarios/login`, loginRequest)).data;
    } catch (error) {
        loginResponse = error.response.data;
    }
});

// Then: Inicio de sesión correcto
Then('Inicio de sesion correcto', function () {
    assert.strictEqual(loginResponse.error, false);
});

// And: Se registra un log de inicio de sesión en el sistema de logs
Then('se registra un log de inicio de sesión en el sistema de logs', async function () {
    const logsParams = {
        query: '{job="docker"}',
        start: Math.floor(Date.now() / 1000) - 60,
        end: Math.floor(Date.now() / 1000),
        limit: 100,
    };

    try {
        const response = await axios.get(url, { params: logsParams });
        logEntries = response.data.data.result.map(stream => stream.values).flat();
    } catch (error) {
        throw new Error('Error consultando logs: ' + error.message);
    }

    const logMessage = `find using query: { "email" : "${loginResponse.data.user.email}"}`;
    const loginLog = logEntries.some(log => log[1].includes(logMessage));

    assert.ok(loginLog, 'No se registró un log de inicio de sesión para el usuario');
});
