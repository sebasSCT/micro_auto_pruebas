const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
require('dotenv').config();
const url = 'http://localhost:3100/loki/api/v1/query_range';

let params = {};
let logResponse = {};
let logs = null;

//Scenario: Yo quiero consultar todos los logs que se encuentran en el sistema

Given('Parametros validos para la consulta de logs', function () {
    params = {
        query: '{job="docker"}',
        start: 1727758800,
        end: 1730350800,
        limit: 100,
    };
    });

When('Invoco el servicio para consultar los logs', async function (){
    logs = "";
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

//Scenario: Yo quiero consultar los logs relacionados con el contenedor de loki

Given ('Parametros validos con el id del contenedor {string}', function (container_id){
    params = {
        query: `{job="docker", filename="/var/lib/docker/containers/${container_id}/${container_id}-json.log"}`,
        start: 1727758800,
        end: 1730350800,
        limit: 100,
    };
});

// Scenario: Yo quiero consultar los logs relacionados con el contenedor de app-crud

Then('Obtengo los logs relacionados con el contenedor app-crud', function (){
    // console.log(logs)
    assert.equal(logs.includes("CRUD"), true);
});

// Scenario: Yo quiero consultar los logs de un dia especifico

let unixTimestamp;
let unixTimestamp_end;

Given ('Parametros validos con la fecha del día {string}', function (fecha_){

    const fecha = `${fecha_} 00:00:00`;
    const fecha_end = `${fecha_} 23:59:59`;
    const date = new Date(fecha);
    const date_end = new Date(fecha_end);
    unixTimestamp = Math.floor(date.getTime() / 1000);
    unixTimestamp_end = Math.floor(date_end.getTime() / 1000);

    params = {
        query: `{job="docker"}`,
        start: unixTimestamp,
        end: unixTimestamp_end,
        limit: 1,
    };
});

Then('Obtengo los logs en el rango esperado', function (){

    const logJsonString = logs.substring(logs.indexOf('Log: ') + 5).trim();

    // Convertir el string JSON en un objeto
    const logObject = JSON.parse(logJsonString);

    // Extraer la parte anidada dentro de la clave "log"
    const nestedLog = JSON.parse(logObject.log);

    // Acceder al timestamp
    const timestamp = nestedLog.attr.message.ts_sec;

    const inicioRango = unixTimestamp;
    const finRango = unixTimestamp_end;

    assert.equal((timestamp >= inicioRango && timestamp <= finRango), true)

});
