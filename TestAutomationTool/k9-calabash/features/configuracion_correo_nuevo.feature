Feature: Configurar cuenta de correo

  Scenario: Como usuario nuevo puedo configurar mi cuenta de correo de forma automatica.
            Esto queire decir no debo ingresar los datos del servidor de correo y demás
            opciones.
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
  
  Scenario: Como usuario nuevo puedo configurar mi cuenta de correo de forma manual.
            Es decir se debe ingresar los datos del servidor de correo.
            Las opciones de cuenta se dejaran con los valores por defecto.
    When I press "next"
    And I enter text "fabricas201717473@gmail.com" into field with id "account_email"
    And I enter text "xiptcfujuygimocs" into field with id "account_password"
    And I press "manual_setup"
    And I press "IMAP"
    And I clear "account_server"
    And I enter text "imap.gmail.com" into field with id "account_server"
    And I press "account_security_type"
    And I touch the "SSL/TLS" text
    And I clear "account_port"
    And I enter text "993" into field with id "account_port"
    And I press "next"
    And I wait to see "Correo saliente"
    And I clear "account_server"
    And I enter text "smtp.gmail.com" into field with id "account_server"
    And I press "account_security_type"
    And I touch the "SSL/TLS" text
    And I clear "account_port"
    And I enter text "465" into field with id "account_port"
    And I press "next"
    And I wait to see "Opciones de cuenta"
    And I press "next"
    And I wait to see "¡Terminado!"
    And I enter text "Correo de pruebas" into field with id "account_description"
    And I enter text "Alfonso Ardila" into field with id "account_name"
    And I press "done"
    And I wait to see "Registro de cambios"
    And I press "Aceptar"
    Then I see "Correo de pruebas"
