# (Color) Lines

This is a Javascript implementation of [Color Lines](https://en.wikipedia.org/wiki/Color_Lines) game
based on the code from [http://webhackers.ru/lines/](http://webhackers.ru/lines/).
This version is adaptive to smaller screens and can be used on mobile devices.

## Rules

The player can move one ball per turn, and the player may only move a ball to a particular place if there is a path
(linked set of vertical and horizontal empty cells) between the current position of the ball and the desired destination.
The goal is to remove balls by forming lines (horizontal, vertical or diagonal) of at least five balls or crosses (could be diagonal as well) of the same colour.
If the player does form such figures of at least five balls of the same colour, the balls in them disappear,
and he/she gains one turn, i.e. he/she can move another ball.
If not, three new balls are added, and the game continues until the board is full.

## Installation

You can install your own copy of this game with following commands:

```
$ npm install
$ bower install
$ gulp
```

## ToDo

- Change cookies to local storage (for mobile app functionality)
- Improve README
- Add interface translations
- Incapsulate JS code modules
- Improve images + Add images for color-blind people (with numbers on the balls)
