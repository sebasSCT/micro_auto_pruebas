Feature: Eliminar usuario

    Un usuario registrado y con sesion activa desea eliminar su usuario

    Scenario: Yo como usuario deseo poder eliminar mi cuenta
        Given Soy usuario con las credenciales, correo "borrar@gmail" y contraseña "123", deseo eliminar el perfil con codigo "66e75f80b907801447542494"
        When Invoco el serivicio para eliminar el usuario
        Then Elimino el perfil de usuario correctamente