Feature: Funcionamiento de la funcion de actualizar perfil del servicio de gestion de perfiles

# Precondiciones:
    # - El servicio "app-perfil" debe estar disponible en el puerto "8079".

Scenario: Se quiere actualizar un perfil con el servicio de gestion de perfiles
    Given Usuario con credenciales validas, email "usuario@example.com", contraseña "password123", y los datos a actualizar, id del usuario "67359e045bf77830d0195050", el nickmane o apodo "user_example", la url personal "https://user.com", la direccion "calle 0 avenida 0", su biografia "user biography", la organizacion del usuario "exampleCorp", el pais del usuario "EXAMPLE", links a las redes sociales "https://linkedin.com/in/user_example" y la identificacion "67359e045bf77830d0195050"
    When Se usa la api del servicio de gestion de perfiles para actualizar un perfil de usuario existente
    Then El perfil de usuario es actualizado correctamente en la base de datos del servicio gestion de clientes