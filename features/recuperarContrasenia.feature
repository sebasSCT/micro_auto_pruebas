Feature: Recuperar la contraseña de un usuario

Scenario: Quiero recuperar mi cuenta pero no recuerdo la contraseña
    Given Email valido de usuario registrado en el sistema, "sebastian.carmonat@uqvirtual.edu.co"
    When Uso la api del servicio de autenticacion para enviar un email de recuperacion
    Then El token de acceso es enviado correctamente al email dado