# Gilded Rose

This is the Gilded Rose kata in JavaScript with Jest. Source Repo [here](https://github.com/emilybache/GildedRose-Refactoring-Kata). 
The program uses `jest` for its TDD approach.

## Getting started

Install dependencies

```sh
npm install
```

## Running tests

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```
## Specification
### Acceptance criteria
- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- “Aged Brie” actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
- “Backstage passes”, like aged brie, increases in Quality as it’s SellIn value approaches; Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert
- “Conjured” items degrade in Quality twice as fast as normal items

## Interaction
1. Clone this Repo
2. Inspect the tests (94.11% coverage, all 17 tests passing)
3. Open Node REPL
4. Instatiate the Shop class and go to town! 

## My Approach 
### General Code Structure & how the app works
Having no jest tests present, I took the liberty to first write all the tests with legacy code still in, in order to maintain the code's logic and structure, in conjunction with ensuring the behaviour is not changed as I set out to refactor it. 

Please note, the Item class in my tests is stubbed, which promotes one of the key ideas behind TDD, which is testing everything in isolation!

My unit tests covere all aspects of the acceptance criteria, so essentially I wrote unit tests to reflect the logic in the updateQuality() method (sort of the reverse of TDD, because the main logic was already given).

As soon as tests were written, I then approached the main logic in updateQuality() method of the Shop class. It was a gradual process of refactoring, and every single step is documented in my git commits. 

Main takeaways from refactoring the updateQuality method:
1. Changed the name to update()
2. Used modern ES6 forEach loop
3. Removed unnecessary deep nesting of if/else statements
4. introduced 'else if' statement, to promote a clear control flow
5. Introduced loads of private helper methods that are easy to read, follow the DRY principle and is more maintainable. 
6. Added the addItem method to push items into the Shop's items array