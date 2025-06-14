Feature: Validacion de Registro de usuario

  Background:
    * url "https://api.demoblaze.com"
    * path "/signup"

  Scenario Outline: Sign up using a dynamic table from a csv file
    * def getRandomNumber = function(max) { return Math.floor(Math.random() * max) }
    * def random_id = getRandomNumber(5000) + '_'
    And request { username: '#(random_id + username)', password: '#(password)' }
    When method post
    Then status 200
    And match response.length == 3

    Examples:
      | read('username.csv') |

  Scenario Outline: Fail sign up using a dynamic table
    And request { "username": '#(username)', "password": '#(password)' }
    When method post
    Then status 200
    And match $ == { "errorMessage": "This user already exist." }

    Examples:
      | username | password |
      | hp2022   | 2022     |
      | hp2022_1 | 0022     |
      | ddd      | 2022     |
      | hp2022_1 |          |
      | 'OR 1=1' | 2022     |
      | null     | 2022     |
      | dddd     | null     |
      | $%&#$#$% | 2022     |
      | true     | true     |

  Scenario: Fatal error when use a null in username
    And request { username: null, password: '2022' }
    When method post
    Then status 500

  Scenario: Fatal error when use a wrong json request
    And request "{ 'username': 'null', password: '2022' }"
    When method post
    Then status 500

  Scenario: Bad parameter use a wrong json request
    And request { usename: 'hp2022', password: '2022' }
    When method post
    Then status 200
    And match response.errorMessage == "Bad parameter, missing username or password"

  Scenario: User exist use a json request with more parameters
    And request { username: 'hp2022', password: '2022', time: 30, is_success: true }
    When method post
    Then status 200