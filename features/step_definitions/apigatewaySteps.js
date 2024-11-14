const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
const decode = require('./../../decode');
require('dotenv').config();

const url_auth = process.env.AUTH_URL;
const url_crud = process.env.BASE_URL;
const url_pm = process.env.PM_URL;
const url_ag = process.env.AG_URL;

let signRequest = {};
let signResponse = {};
let updateRequest = {};
let updateResponse = {};
let getRequest = {};
let getResponse = {};
let loginRequest = {};
let loginResponse = {};
let deleteRequest = {};
let deleteResponse = {};

// Scenario: Se desea crear un nuevo usuario mediante el uso del servicio de api gateway

Given('Usuario no registrado con sus datos, email {string}, contraseña {string}, el nombre del usuario {string}, el apellido {string}, el nickname o apodo {string}, la url personal {string}, la direccion {string}, su biografia {string}, la organizacion del usuario {string}, el pais del usuario {string} y los links a las redes sociales {string}', 
    function (email, pass, name, lastname, nickname, personal_url, address, bio, organization, country, linkedin) {
        let numeroAleatorio = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;
        email = numeroAleatorio + email;
        signRequest = {
            email: email,
            password: pass,
            nombre: name,
            apellido: lastname,
            nickname: nickname,
            personal_url: personal_url,
            contact_public: true,
            address: address,
            bio: bio,
            organization: organization,
            country: country,
            social_links: [
                linkedin
            ]
        };

        loginRequest ={
            email: email,
            password: pass
        }

    });

    When('Se usa la api del servicio de api gateway para registrar un usuario nuevo', async function(){
        
        try {
            signResponse = (await axios.post(`${url_ag}/api/gateway/usuario`, signRequest));

            // loginResponse = (await axios.post(`${url_ag}/api/gateway/usuario/login`, loginRequest)).data;
            // const headers = { headers: { Authorization: `Bearer ${loginResponse.respuesta.token}` } };
            // deleteResponse = (await axios.post(`${url_ag}/api/gateway/usuario/${loginResponse.respuesta.token}`, headers)).data;
            
        } catch (error) {
            signResponse = error.response.data;
        }

    });

    Then ('El servicio de api gateway registra correctamente el usuario nuevo', function (){
        // console.log(signResponse);
        assert.strictEqual(signResponse.status, 200);
    });

// Scenario: Se desea eliminar un usuario existente mediante el uso del servicio de api gateway

    Given('Usuario registrado en el sistema con credenciales validas, su correo {string} y constraseña {string}', 
    function (email, pass) {
        
        loginRequest ={
            email: email,
            password: pass
        }

    });

    When('Se usa la api del servicio de api gateway para eliminar un usuario existente', async function(){
        
        try {
            loginResponse = (await axios.post(`${url_ag}/api/gateway/usuario/login`, loginRequest)).data;
            const headers = { headers: { Authorization: `Bearer ${loginResponse.respuesta.token}` } };
            deleteResponse = (await axios.delete(`${url_ag}/api/gateway/usuario/${decode.decodetoken(loginResponse.respuesta.token)}`, headers)).data;
            
        } catch (error) {
            deleteResponse = error.response.data;
        }

    });

    Then ('El servicio de api gateway elmina correctamente el usuario existente', function (){
        // console.log(deleteResponse);
        assert.strictEqual(deleteResponse.status, 200);
    });

    // Scenario: Se desea iniciar sesion mediante el uso del servicio de api gateway

    Given('Usuario registrado con credenciales validas, email {string}, contraseña {string}', 
        function (email, pass) {
            
            loginRequest ={
                email: email,
                password: pass
            }
    
        });
    
        When('Se usa la api del servicio de api gateway para iniciar sesion con un usuario existente', async function(){
            
            try {
                loginResponse = (await axios.post(`${url_ag}/api/gateway/usuario/login`, loginRequest)).data;
            } catch (error) {
                loginResponse = error.response.data;
            }
    
        });
    
        Then ('El servicio de api gateway permite iniciar sesion correctamente a el usuario existente', function (){
            // console.log(loginResponse);
            assert.strictEqual(loginResponse.error, false);
        });