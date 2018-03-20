Feature: Buscar un correo
  Background: Crear cuenta de correo.
    When I press "next"
    And I enter text "fabricas201717473@gmail.com" into field with id "account_email"
    And I enter text "xiptcfujuygimocs" into field with id "account_password"
    And I press "next"
    And I wait to see "¡Terminado!"
    And I enter text "Correo de pruebas" into field with id "account_description"
    And I enter text "Alfonso Ardila" into field with id "account_name"
    And I press "done"
    And I wait to see "Registro de cambios"
    And I press "Aceptar"
    Then I see "Correo de pruebas"
    # Correo 1
    Given I see the text "Entrada"
    When I press "compose"
    And I see "Redactar"
    And I enter text "alfyes@gmail.com" into field with id "to"
    And I enter text "Correo de calabash" into field with id "subject"
    And I enter text "Este correo es enviado  por pruebas con calabash" into field with id "message_content"
    And I press "send"
    Then I see the text "Entrada"
    # Correo 2
    Given I see the text "Entrada"
    When I press "compose"
    And I see "Redactar"
    And I enter text "alfyes@gmail.com" into field with id "to"
    And I enter text "Correo Automatizado" into field with id "subject"
    And I enter text "Este correo es enviado  por pruebas con calabash" into field with id "message_content"
    And I press "send"
    Then I see the text "Entrada"

  Scenario Outline: Como usuario puedo redactar un correo desde la bandeja de entrada
            Ya se ha configurado una cuneta de correo
    Given I see the text "Entrada"
    When I press "search"
    And I enter text <Asunto> into field with id "search_src_text"
    And I press the enter button
    Then I see the text "Resultados búsqueda"
    And I should see <Asunto>

    Examples:
    | Asunto |
    | "Correo de calabash" |
    | "Correo Automatizado"|
  
  

