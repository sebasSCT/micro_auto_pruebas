Feature: Funcionamiento del microservicio de notificaciones

    # Precondiciones:
    # - El servicio "notificaciones" debe estar disponible en el puerto "8080".

    Scenario: Quiero enviar una notificacion para el servicio de notificaciones
    Given El mensaje "notificacion de prueba" para el usuario con el correo "sebastian.carmonat@uqvirtual.edu.co"
    When Uso la api del servicio para enviar una notificacion a un usuario
    Then Se confirma el envio de la notificacion a el usuario
    
    Scenario: Quiero consultar todas la notificaciones enviadas y almacenadas en el servicio de notificaciones
    Given Parametros validos para la consulta a la api del servicio
    When Uso la api del servicio para la consulta de todas las notifiaciones
    Then Se recibe la lista con todas notificaciones guardadas por el servicio    