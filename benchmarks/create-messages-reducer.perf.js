const Benchmark = require('benchmark');

const { createMessagesReducer, createMessage } = require('../dist/index.js');

const STATE_NAME = 'test-state-name';
const MODEL = { a: 1, b: '2' };
const stateMessage = createMessage(STATE_NAME);
const message = state => Object.assign({}, state, { a: 2 });

const reducer = createMessagesReducer(STATE_NAME)(MODEL);

const suite = new Benchmark.Suite;

suite

  // 2,140,424 ops/sec
  .add('createMessagesReducer', () => {
    reducer(MODEL, stateMessage(message));
  })

  .on('cycle', event => {
    console.log(String(event.target));
  })

  .run();
