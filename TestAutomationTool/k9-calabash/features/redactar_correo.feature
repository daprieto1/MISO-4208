Feature: Redactar un correo
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

  Scenario: Como usuario puedo redactar un correo desde la bandeja de entrada
            Ya se ha configurado una cuneta de correo
    Given I see the text "Entrada"
    When I press "compose"
    And I see "Redactar"
    And I enter text "alfyes@gmail.com" into field with id "to"
    And I enter text "Correo de calabash" into field with id "subject"
    And I enter text "Este correo es enviado  por pruebas con calabash" into field with id "message_content"
    And I press "send"
    Then I see the text "Entrada"
  
  Scenario: Como usuario puedo no puedo redactar un correo sin destinatario.
            Al redactar un correo sin destinatario, no deberia poderlo enviar.
    Given I see the text "Entrada"
    When I press "compose"
    And I see "Redactar"
    And I enter text "Correo de calabash." into field with id "subject"
    And I enter text "Este correo es enviado  por pruebas con calabash" into field with id "message_content"
    And I press "send"
    Then I should not see "Entrada"
  

  Scenario: Como usuario puedo Redactar correo y validar que se haya enviado.
            Deberia poder ver el correo en la carpeta de enviados.
    Given I see the text "Entrada"
    When I press "compose"
    And I see "Redactar"
    And I enter text "alfyes@gmail.com" into field with id "to"
    And I enter text "Correo de calabash" into field with id "subject"
    And I enter text "Este correo es enviado  por pruebas con calabash" into field with id "message_content"
    And I press "send"
    Then I see the text "Entrada"
    And I press image button number 1
    And I touch the "Carpetas" text
    And I touch the "[Gmail]/Enviados (Enviados)" text
    And I should see "Correo de calabash"

