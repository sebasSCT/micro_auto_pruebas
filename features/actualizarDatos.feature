Feature: Actualizar datos

    Un usuario registrado y con sesion activa desea actualizar los datos guardados en su registro

     Scenario: Yo como usuario deseo actualizar mis datos
        Given Soy usuario con las credenciales, correo "hola@gmail" y contraseña "123", deseo poder cambiar los datos, codigo "66e2fe7d5af119389819fd6d", correo "hola@gmail", nombre "hola" y apellido "quetaro"
        When Invoco el servicio de actualizar perfil de usuario
        Then Los datos del perfil se actualizan correctamente