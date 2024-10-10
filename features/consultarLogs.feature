Feature: Consulta de logs centralizados

    Se consultan los logs que se encuentran en el servicio de logs centralizado

    Scenario: Yo quiero consultar todos los logs que se encuentran en el sistema
        Given Parametros validos para la consulta de logs
        When Invoco el servicio para consultar los logs
        Then Obtengo todos los logs del sistema

    Scenario: Yo quiero consultar los logs relacionados con el contenedor de loki
        Given Parametros validos con el id del contenedor "efbf5e1668065b9c7c7deaa1f5730698cf82cc7fa51d5b0fed83c2fc00937b5c"
        When Invoco el servicio para consultar los logs
        Then Obtengo todos los logs del sistema

    Scenario: Yo quiero consultar los logs relacionados con el contenedor de app-crud
        Given Parametros validos con el id del contenedor "23e7ee209db37763a1e7b650d1f4ebb41d35c29607eac90c6fa7cf3336666999"
        When Invoco el servicio para consultar los logs
        Then Obtengo todos los logs del sistema
        And Obtengo los logs relacionados con el contenedor app-crud

    Scenario: Yo quiero consultar los logs de un dia especifico
        Given Parametros validos con la fecha del día "2024-10-09"
        When Invoco el servicio para consultar los logs
        Then Obtengo todos los logs del sistema
        And Obtengo los logs en el rango esperado
        