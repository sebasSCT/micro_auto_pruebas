const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
const decode = require('./../../decode');

const url_pm = process.env.PM_URL;
const url_auth = process.env.AUTH_URL;

let createRequest = {};
let createResponse = {};
let updateRequest = {};
let updateResponse = {};
let getRequest = {};
let getResponse = {};
let loginRequest = {};
let loginResponse = {};

// Scenario: Se quiere crear un perfil con el servicio de gestion de perfiles

Given('La id del usuario {string}, el nickmane o apodo {string}, la url personal {string}, la direccion {string}, su biografia {string}, la organizacion del usuario {string}, el pais del usuario {string}, links a las redes sociales {string} y la identificacion {string}', 
    function (user_id, nickname, personal_url, address, bio, organization, country, linkedin, identificacion) {

        createRequest = {
            user_id: user_id,
            nickname: nickname,
            personal_url: personal_url,
            contact_public: true,
            address: address,
            bio: bio,
            organization: organization,
            country: country,
            social_links: {
                linkedin: linkedin
            },
            identificacion: identificacion
        }


    });

    When('Uso la api del servicio de gestion de perfiles para crear un nuevo perfil de usuario', async function(){

        try {
            createResponse = (await axios.post(`${url_pm}/usuario`, createRequest)).data;
        } catch (error) {
            createResponse = error.response.data;
        }

    });

    Then ('El nuevo perfil de usuario es registrado correctamente en la base de datos del servicio gestion de clientes', function (){
        // console.log(createResponse);
        assert.notEqual(createResponse.id, null);
    });

// Scenario: Se quiere consultar todos los perfiles de usuarios creados en el servicio de gestion de perfiles

Given('Administrador con credenciales validas y con la consulta de pagina {string} y el numero de perfiles por pagina {string}', 
    function (page, perpage) {

        getRequest = {
            page: page,
            perpage: perpage
        }

    });

    When('Se utiliza el api del servicio para consultar todos los perfiles creados', async function(){

        try {
            getResponse = (await axios.get(`${url_pm}/usuario?page=${getRequest.page}&limit=${getRequest.perpage}`)).data;
        } catch (error) {
            createResponse = error.response.data;
        }

    });

    Then ('Se obtienen todos los perfiles de usuario creados y guardadados en la base de datos gestion de perfiles', function (){
        // console.log(getResponse);
        assert.notEqual(getResponse.profiles, null);
    });

// Scenario: Se quiere consultar el perfil de un usuario creado en el servicio de gestion de perfiles

Given('Usuario con credenciales validas y su codigo de usuario {string}', 
    function (user_id) {

        getRequest = {
            user_id: user_id
        }

    });

    When('Se utiliza el api del servicio para consultar el perfil del usuario dado su codigo', async function(){

        try {
            getResponse = (await axios.get(`${url_pm}/usuario/${getRequest.user_id}`)).data;
        } catch (error) {
            createResponse = error.response.data;
        }

    });

    Then ('Se obtienen el perfil del usuario creado y guardadado en la base de datos gestion de perfiles', function (){
        // console.log(getResponse);
        assert.strictEqual(getResponse.user_id, getRequest.user_id);
    });

// Scenario: Se quiere actualizar un perfil con el servicio de gestion de perfiles

Given('Usuario con credenciales validas, email {string}, contraseña {string}, y los datos a actualizar, id del usuario {string}, el nickmane o apodo {string}, la url personal {string}, la direccion {string}, su biografia {string}, la organizacion del usuario {string}, el pais del usuario {string}, links a las redes sociales {string} y la identificacion {string}', 
    function (email, pass, user_id, nickname, personal_url, address, bio, organization, country, linkedin, identificacion) {

        updateRequest = {
            user_id: user_id,
            nickname: nickname,
            personal_url: personal_url,
            contact_public: true,
            address: address,
            bio: bio,
            organization: organization,
            country: country,
            social_links: {
                linkedin: linkedin
            },
            identificacion: identificacion
        };

        loginRequest = {
            email: email,
            password: pass
        };

    });

    When('Se usa la api del servicio de gestion de perfiles para actualizar un perfil de usuario existente', async function(){

        try {
            loginResponse =(await axios.post(`${url_auth}/api/auth/usuarios/login`, loginRequest)).data;
            const headers = { headers: { Authorization: `Bearer ${loginResponse.respuesta.token}` } };
            updateResponse = (await axios.put(`${url_pm}/usuario/${updateRequest.user_id}`, updateRequest, headers));
        } catch (error) {
            updateResponse = error.response.data;
        }

    });

    Then ('El perfil de usuario es actualizado correctamente en la base de datos del servicio gestion de clientes', function (){
        // console.log(updateResponse);
        assert.strictEqual(updateResponse.status, 200);
    });