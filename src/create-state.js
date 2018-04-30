// createState : NAME -> defaultModel -> model -> model
export default (name = '') =>
  (defaultModel = {}) =>
    (model = {}) =>
      ({
        [name]: Object.assign({}, defaultModel, model)
      });
