Feature: Funcionamiento del servicio api gateway

    # Precondiciones:
    # - El servicio "app-crud" debe estar disponible en el puerto "8084".
    # - El servicio "autenticacion" debe estar disponible en el puerto "8087".
    # - El servicio "app-perfil" debe estar disponible en el puerto "8079".
    # - El servicio "mongo-database" debe estar disponible en el puerto "27017".

    Scenario: Se desea crear un nuevo usuario mediante el uso del servicio de api gateway
        Given Usuario no registrado con sus datos, email "juan@example.com", contraseña "123", el nombre del usuario "juan", el apellido "example", el nickname o apodo "juanex", la url personal "https://juanex.com", la direccion "Calle Falsa 123", su biografia "Desarrollador de software", la organizacion del usuario "exampleCorp", el pais del usuario "EXAMPLE" y los links a las redes sociales "https://linkedin.com/in/juan_example"
        When Se usa la api del servicio de api gateway para registrar un usuario nuevo
        Then El servicio de api gateway registra correctamente el usuario nuevo

   Scenario: Se desea iniciar sesion mediante el uso del servicio de api gateway
        Given Usuario registrado con credenciales validas, email "usuario@example.com", contraseña "password123"
        When Se usa la api del servicio de api gateway para iniciar sesion con un usuario existente
        Then El servicio de api gateway permite iniciar sesion correctamente a el usuario existente
           