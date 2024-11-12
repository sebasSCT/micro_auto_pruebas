const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
const url = process.env.PROMETHEUS_URL;

let monitoreoRequest = {};
let monitoreoResponse = {};

// Scenario: Quiero consultar los servicios registrados en el servicio de monitoreo con el estado activo "up"

Given('El estado esperado de los servicios registrados {string} en {string}', 
    function (estado, boolean) {
    monitoreoRequest = `${estado}==${boolean}`;
});

When('Uso la api del servicio para consultar el estado de los servicios registrados', async function(){
    try {
        monitoreoResponse = (await axios.post(`${url}/api/v1/query?query=${monitoreoRequest}`)).data;
    } catch (error) {
        monitoreoResponse = error.response.data;
    };
});

Then ('Obtengo una lista con los servicios en el estado esperado', function (){
    // console.log(monitoreoResponse);
    assert.equal(monitoreoResponse.status, 'success');
});

// Scenario: Scenario: Quiero consultar el estado de un servicio especifico registrado en el servicio de monitoreo

Given('Servicio con el nombre {string} y su instancia activa en el puerto {string}', 
    function (servicio, instancia) {
    monitoreoRequest = `up{instance="${servicio}:${instancia}", job="${servicio}"}`;
});

Then ('Obtengo informacion sobre el servicio esperado', function (){
    // console.log(monitoreoResponse);
    assert.equal(monitoreoResponse.status, 'success');
});