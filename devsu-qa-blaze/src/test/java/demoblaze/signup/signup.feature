Feature: Validacion de Registro de usuario

  Background:
    * url "https://api.demoblaze.com"
    * path "/signup"

  Scenario: Ingreso exitoso
    And request { "username": "hp2022_1", "password": "2022" }
    When method post
    Then status 200

  Scenario: Ingreso Fallido
    And request { "username": "hp2022", "password": "xxxxx" }
    When method post
    Then status 200
    And match $ == {"errorMessage":"#string"}