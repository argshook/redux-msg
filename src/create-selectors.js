// createSelectors : (NAME, INITIAL_STATE) => ({ INITIAL_STATE.key: (state -> value) })
export default name => initialState =>
  Object
    .keys(initialState)
    .reduce((selectors, key) => {
      selectors[key] = state => state[name][key];
      return selectors;
    }, {});
