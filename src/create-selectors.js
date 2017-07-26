// createSelectors : NAME => MODEL => ({ MODEL.key: (state -> value) })
export default name => model =>
  Object
    .keys(model)
    .reduce((selectors, key) => {
      selectors[key] = state => state[name][key];
      return selectors;
    }, {});
