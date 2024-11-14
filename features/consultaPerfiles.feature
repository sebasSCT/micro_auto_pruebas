Feature: Funcionamiento de las funciones de consulta de perfiles del servicio de gestion de perfiles

    # Precondiciones:
    # - El servicio "app-perfil" debe estar disponible en el puerto "8079".

    Scenario: Se quiere consultar todos los perfiles de usuarios creados en el servicio de gestion de perfiles
        Given Administrador con credenciales validas y con la consulta de pagina "1" y el numero de perfiles por pagina "10"
        When Se utiliza el api del servicio para consultar todos los perfiles creados
        Then Se obtienen todos los perfiles de usuario creados y guardadados en la base de datos gestion de perfiles

    Scenario: Se quiere consultar el perfil de un usuario creado en el servicio de gestion de perfiles
        Given Usuario con credenciales validas y su codigo de usuario "6735fff9cf62612bf7145044"
        When Se utiliza el api del servicio para consultar el perfil del usuario dado su codigo
        Then Se obtienen el perfil del usuario creado y guardadado en la base de datos gestion de perfiles