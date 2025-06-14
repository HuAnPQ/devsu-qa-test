Feature: Validacion de Inicio de sesion

  Background:
    * url api.mainUrl
    * path "/login"

  Scenario: Validacion exitosa
    And request { "username": "#(user.name)", "password": "#(user.pass)" }
    When method post
    Then status 200
    And match $ contains "Auth_token:"

  Scenario: Validacion Fallida
    And request { "username": "hp2022", "password": "xxxxx" }
    When method post
    Then status 200
    And match $ == {"errorMessage":"#string"}