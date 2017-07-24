// give many reducers, get one.
// reducers will be called in order they are given to mergeReducers

// mergeReducers : ...((state, action) -> state) -> (state, action) -> state
export default (...reducers) =>
  reducers.reduceRight((mergedReducers, reducer) =>
    (state, action) =>
      mergedReducers(reducer(state, action), action),
    i => i);
