Feature: Edit habit
    Background:
	# Remove help section
		Given I press "next"
		Given I press "next"
		Given I press "done"

	Scenario Outline: AS an user I WANT to edit the habit information
		Given I press "actionAdd"
		#Enter habit name
		When  I enter text <HabitName> into field with id "tvName"
		#Enter question name
		And I enter text "Is my habit 1 done?" into field with id "tvDescription"
		And I press "buttonSave"
		#And I touch the "Habit 1" text
    Then I long press <HabitName>
    Given I press "actionAdd"
  	When  I enter text " updated" into field with id "tvName"
    And I press "spinner"
    And I touch the "Every week" text
    And I press "tvReminderTime"
    And I press "done_button"
    Then I see the text <NewHabitName>
    And I touch the <NewHabitName> text
		Then I should see "8:00 AM"

    Examples:
    | HabitName | QuestionHabit         | NewHabitName      |
    | "Habit 1" | "Is my habit 1 done?" | "Habit 1 updated" |
    | "¿¡''" | "???/&/567?" | "¿¡'' updated" |

    Scenario Outline: AS an user I WANT to edit the habit color
  		Given I press "actionAdd"
  		#Enter habit name
  		When  I enter text <Name> into field with id "tvName"
  		#Enter question name
  		And I enter text <Question> into field with id "tvDescription"
  		And I press "buttonSave"
  		#And I touch the "Habit 1" text
      Then I long press <Name>
      Given I press "action_filter"
  		And I press view with id "color_picker_swatch"
      Then I see the text <Name>

      Examples:
      | Name | Question         |
      | "Habit 1" | "Is my habit 1 done?" |
      | "!#$%&/()?//-{[Á+ü]}" | "question special characters %&#!()[{ ¡¿-}] ?" |
