Feature: Funcionamiento de la integración de todos los servicios como un conjunto único.

    # Precondiciones:
    # - El servicio "app-crud" debe estar disponible en el puerto "8084".
    # - El servicio "loki" debe estar disponible en el puerto "3100".
    # - El servicio "rabbitmq" debe estar disponible en el puerto "15672".
    # - El servicio "mongo-database" debe estar disponible en el puerto "27017".

    Scenario: Se desea registrar un usuario y comprobar el funcionamiento de los servicios de bases de datos, logs y app-crud
    Given Usuario con sus datos, correo "usuariodeprueba@gmail.com", contraseña "123", nombre "usuario" y apellido "de prueba"
    When Uso la api del servicio de autenticacion para registrar un nuevo usuario
    Then El usuario es registrado correctamente en la base datos del servicio autenticacion
    And Se generar un log correspondiente al registro en el servicio de logs centralizados
    
    @final
    Scenario: Se quiere verificar el funcionamiento del sistema de monitoreo cuando un servicio es detenido
    Given El contenedor con el nombre "proyectofinal-app-crud-1" ejecutandose
    When Se invoca la función que permite detener la ejecución del contenedor
    Then El servicio de monitoreo retorna informacion sobre el contenedor
    And El servicio de monitoreo retorna el estado up del contenedor en 0