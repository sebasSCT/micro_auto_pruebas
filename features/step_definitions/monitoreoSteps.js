const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
const url = process.env.PROMETHEUS_URL;

let monitoreoRequest = {};
let monitoreoResponse = {};

// Scenario: Yo quiero consultar el estado de los servicios

Given('Estado {string}', 
    function (estado) {
    monitoreoRequest = estado;
});

When('Invoco el servicio para consultar', async function(){
    try {
        monitoreoResponse = (await axios.post(`${url}/api/v1/query?query=${monitoreoRequest}`)).data;
    } catch (error) {
        monitoreoResponse = error.response.data;
    };
});

Then ('Obtengo los servicios en el estado esperado', function (){
    // console.log(monitoreoResponse);
    assert.equal(monitoreoResponse.status, 'success');
});