Feature: Funcionamiento del servicio de monitoreo

    Scenario: Yo quiero consultar el estado de los servicios
    Given Estado "up"
    When Invoco el servicio para consultar
    Then Obtengo los servicios en el estado esperado

    