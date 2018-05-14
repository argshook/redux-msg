// createState : NAME -> defaultModel -> model -> model
export default (name = '') =>
  (defaultModel = {}) =>
    (model = {}) =>
      ({
        [name]: { ...defaultModel, ...model }
      });
