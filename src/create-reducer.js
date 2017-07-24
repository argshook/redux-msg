/**
  * type Derivations = {
  *   ...([ACTION_TYPE]: (state, action) -> state)
  * }
  */

// createReducer : INITIAL_STATE -> Derivations -> (state, action) -> state
export default initialState => (derivations = {}) =>
  (state = initialState, action) =>
    (derivations[action.type] || (() => state))(state, action);
