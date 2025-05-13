Feature: Validacion de Inicio de sesion

  Background:
    * url "https://api.demoblaze.com"
    * path "/login"

  Scenario: Validacion exitosa
    And request { "username": "hp2022", "password": "2022" }
    When method post
    Then status 200
    And match $ contains "Auth_token:"

  Scenario: Validacion Fallida
    And request { "username": "hp2022", "password": "xxxxx" }
    When method post
    Then status 200
    And match $ == {"errorMessage":"#string"}