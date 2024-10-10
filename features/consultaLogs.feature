Feature: Consulta de logs centralizados

    Se consultan los logs que se encuentran en el servicio de logs centralizado

    Scenario: Yo quiero conocer todos los logs que se encuentran en el sistema
        Given Parametros validos para la consulta de logs
        When Invoco servicio para consultar los logs
        Then Obtengo todos los logs del sistema