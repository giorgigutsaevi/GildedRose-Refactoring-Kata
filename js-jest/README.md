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
2. Inspect the tests (94.11% coverage, all 20 tests passing)
3. Open Node REPL
4. Set up the account and use all the methods on its interface

## My Approach 
### General Code Structure & how it works