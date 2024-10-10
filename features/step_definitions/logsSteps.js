const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
const { isAsyncFunction } = require('util/types');
require('dotenv').config();
const url = 'http://localhost:3100/loki/api/v1/query_range';

let params = {};
let logResponse = {};
let logs = null;

//Scenario: Yo quiero conocer todos los logs que se encuentran en el sistema

Given('Parametros validos para la consulta de logs', function () {
    params = {
        query: '{job="docker"}',
        start: 1727758800,
        end: 1730350800,
        limit: 100,
    };
    });

When('Invoco servicio para consultar los logs', async function (){
    try {
         logResponse = (await axios.get(url, {params})).data.data.result;

         logResponse.forEach((logStream) => {
            logStream.values.forEach((log) => {
                const timestamp = log[0];
                const message = log[1];
                logs += `Timestamp: ${timestamp}, Log: ${message}\n`;
            });
            });

    } catch (error) {
        logResponse = error.response.data;
    }

});

Then ('Obtengo todos los logs del sistema', function (){
    // console.log(logs);
    assert.notEqual(logs, null);
});