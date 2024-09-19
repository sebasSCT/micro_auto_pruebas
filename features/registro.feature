Feature: Registro

  Un usuario no registrado desea hacer un registro con sus datos

  Scenario: Yo como usuario no registrado quiero poder registrarme con mis datos
    Given Yo usuario no registrado envio mis datos correo "hola2@gmail", contraseña "1234", nombre "hola" y apellido "perez"
    When Invoco el servicio que permite el registro de nuevos usuarios
    Then Me registro correctamente

  Scenario: Yo como usuario no registrado deseo recibir notificacion si realizo mal el registro
    Given Yo usuario no registrado envio mis datos correo "hola2@gmail", contraseña "1234", nombre "hola" y apellido "perez"
    When Invoco el servicio que permite el registro de nuevos usuarios
    Then No puedo registrarme
