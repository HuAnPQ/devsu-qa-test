Feature: Validacion de Inicio de sesion

  Background:
    * url api.mainUrl
    * path "/login"

  Scenario: Login -Validacion exitosa
    And request { "username": "#(user.name)", "password": "#(user.pass)" }
    When method post
    Then status 200
    And match $ contains "Auth_token:"

  Scenario Outline: Login -Validacion Fallida -Wrong password.
    And request { "username": "#(username)", "password": "xxxxx" }
    When method post
    Then status 200
    And match $ == {"errorMessage":"Wrong password."}

    Examples:
      | username |
      | hp2022   |
      | hp2022_1 |
      | ddd      |
      | hp2022_1 |
      | 'OR 1=1' |
      | null     |
      | dddd     |
      | $%&#$#$% |
      | true     |

  Scenario: Login -Fatal error when use a null in username
    And request { username: null, password: "#(user.pass)" }
    When method post
    Then status 500

  Scenario: Login -User does not exist
    And request { username: '#(data_not_exist.user)', password: "#(user.pass)" }
    When method post
    Then status 200
    And match $ == data_not_exist.message

  Scenario: Login -Fatal error when use a wrong json request
    And request "{ 'username': 'null', password: '#(user.pass)' }"
    When method post
    Then status 500

  Scenario: Login -Bad parameter use a wrong json request
    And request { username: '#(user.name)', pass: '#(user.pass)' }
    When method post
    Then status 200
    And match response.errorMessage contains "Bad parameter"

  Scenario: Login -User exist use a json request with more parameters
    And request { username: '#(user.name)', password: '#(user.pass)', time: 30, is_success: true }
    When method post
    Then status 200
    And match $ contains "Auth_token:"

  Scenario: Login -User exist use a json request with headers
    And request { username: '#(user.name)', password: '#(user.pass)' }
    And headers header_login
    When method post
    Then status 200
    And match $ contains "Auth_token:"