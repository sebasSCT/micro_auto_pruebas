const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
const url = process.env.NOTIFICATION_URL;

let notificationRequest = {};
let notificationResponse = {};

// Scenario: Quiero enviar una notificacion para el servicio de notificaciones

Given('El mensaje {string} para el usuario con el correo {string}', 
    function (message, email) {
    notificationRequest = {
        email: email,
        message: message
    };
});

When('Uso la api del servicio para enviar una notificacion a un usuario', async function(){
    try {
        notificationResponse = await axios.post(`${url}/send`, notificationRequest, {timeout:20000});
    } catch (error) {
        notificationResponse = error.response.data;
    };
});


Then ('Se confirma el envio de la notificacion a el usuario', function (){
    // console.log(notificationResponse);
    assert.equal(notificationResponse.status, 200);
});

// Quiero consultar todas la notificaciones enviadas y almacenadas en el servicio de notificaciones

Given('Parametros validos para la consulta a la api del servicio', 
    function () {} 
);

When('Uso la api del servicio para la consulta de todas las notifiaciones', async function(){
    try {
        notificationResponse = await axios.post(`${url}/notification`);
    } catch (error) {
        notificationResponse = error.response.data;
    };
});

Then ('Se recibe la lista con todas notificaciones guardadas por el servicio', function (){
    // console.log(notificationResponse);
    assert.notEqual(notificationResponse, null);
});