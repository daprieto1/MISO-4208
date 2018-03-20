Feature: Create new habit
    Background:
	# Remove help section
		Given I press "next"
		Given I press "next"
		Given I press "done"

	Scenario: AS an user I WANT to create a new habit FOR track my progress in different activities.
		Given I press "actionAdd"
		#Enter habit name
		When  I enter text "Habit 1" into field with id "tvName"
		#Enter question name
		And I enter text "Is my habit 1 done?" into field with id "tvDescription"
		And I press "buttonSave"
		Then I should see "Habit 1"

	Scenario: AS an user I WANT to create a new habit FOR track my progress in different activities and allow the application to remember me to do my new habit
		Given I press "actionAdd"
		#Enter habit name
		When  I enter text "Habit 2 with remember settings" into field with id "tvName"
		#Enter question name
		And I enter text "Is my habit 2 done?" into field with id "tvDescription"
		And I press "buttonPickColor"
		And I press view with id "color_picker_swatch"
		And I press "spinner"
		And I touch the "Every week" text
		And I press "tvReminderTime"
		And I press "done_button"
		And I press "buttonSave"
		And I touch the "Habit 2 with remember settings" text
		Then I should see "8:00 AM"
