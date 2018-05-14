const Benchmark = require('benchmark');

const { createSelector } = require('../dist/index.js');
const BIG_MODEL = require('./just-big-object.js');

const SMALL_MODEL = { a: 1, b: '2', c: i => i };

const suite = new Benchmark.Suite;

suite

  // 1,224,430 ops/sec
  .add('createSelector#SMALL_MODEL', () => {
    createSelector('just-a-name')(SMALL_MODEL);
  })

  // 5,475 ops/sec
  .add('createSelector#BIG_MODEL', () => {
    createSelector('just-a-name')(BIG_MODEL);
  })

  .on('cycle', event => {
    console.log(String(event.target));
  })

  .run();
