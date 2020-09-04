# Tic Tac Toe Game

## Stack:
- HTML
- CSS
- JS

## MVP

- [x] Set up basic files with HTML/JS/CSS, for this I'll be using ES6 modules to structure the JS files
- [x] Architecture: modules or factories, our first variables are gameBoard and displayController, using factories for multiple players
- Build logic that checks when the game is over
- Consider option of having players compete against the computer
- Explore possibility of creating an hard-to-beat/unbeatable AI (minimax algorithm)

### HTML

The mark up for this page will pretty much remain static throughout this project aside from event listeners being added with JS and the game board nodes on the DOM being generated by the gameBoard module. 


### CSS

I chose to go with SASS for this project for organizing any styling I'll write for this project in a modular way. I really like SASS overall since it gives me a way of knowing where all my styles are contained and what kind of styles they are as opposed to one big CSS file.

### JS

Using an ES6 import/export feature of JS to write all the code for this project in order to make reasoning about where certain behavior is coming from with respect to what happens on the page easier. Considered using Webpack for this project but decided that would be a bit overkill for something of this size..