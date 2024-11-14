Feature: Funcionamiento del servicio de monitoreo

    # Precondiciones:
    # - Los servicios deben estar registrados previamente en el sistema de monitoreo.
    # - El servicio "app-crud" debe estar disponible en el puerto "8084".

    Scenario: Quiero consultar los servicios registrados en el servicio de monitoreo con el estado activo "up"
    Given El estado esperado de los servicios registrados "up" en "1"
    When Uso la api del servicio para consultar el estado de los servicios registrados
    Then Obtengo una lista con los servicios en el estado esperado

    Scenario: Quiero consultar los servicios registrados en el servicio de monitoreo con el estado inactivo
    Given El estado esperado de los servicios registrados "up" en "0"
    When Uso la api del servicio para consultar el estado de los servicios registrados
    Then Obtengo una lista con los servicios en el estado esperado

    #Scenario: Quiero consultar el estado de un servicio especifico registrado en el servicio de monitoreo
    #Given Servicio con el nombre "app-crud" y su instancia activa en el puerto "8084"
    #When Uso la api del servicio para consultar el estado de los servicios registrados
    #Then Obtengo informacion sobre el servicio esperado

    

    