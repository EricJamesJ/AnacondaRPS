# Rps

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



Thought Process:
Simple web application that allows the user to play Rock Paper Scissors wither against another player or against the computer.
You begin by either choosing "New Game" or by Uploading a save file of a previous game in the form of a json file.
The json file contains info about the two players:
name, amount of wins, player type and the players last attack.

If the player chooses "New Game", they are given the option of playing against another person or against the PC.
Names are inputed for the players. If the user chooses to play against the computer, they cannot change the opponents name.

Player1 gets the opportunity to choose their attack and if they are playing against someone else, that individual will be given the chance to choose their attack.
If the other player is the Computer, the screen automatically goes to the end page allowing the user to view the results of the round as well as how many rounds have been won.
This page also allows the user to download a JSON copy of their results to be used next time they want to play. 