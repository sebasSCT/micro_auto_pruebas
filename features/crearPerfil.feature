Feature: Funcionamiento de la funcion crear perfil del servicio de gestion de perfiles

# Precondiciones:
    # - El servicio "app-perfil" debe estar disponible en el puerto "8079".

Scenario: Se quiere crear un perfil con el servicio de gestion de perfiles
    Given La id del usuario "123", el nickmane o apodo "user_nick", la url personal "https://user.com", la direccion "calle 0 avenida 0", su biografia "user biography", la organizacion del usuario "exampleCorp", el pais del usuario "EXAMPLE", links a las redes sociales "https://linkedin.com/in/user" y la identificacion "ID123"
    When Uso la api del servicio de gestion de perfiles para crear un nuevo perfil de usuario
    Then El nuevo perfil de usuario es registrado correctamente en la base de datos del servicio gestion de clientes 