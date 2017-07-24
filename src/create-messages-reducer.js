import MESSAGE_TYPE from './message-type';

// createMessagesReducer : STATE_NAME -> INITIAL_STATE -> (state, action) -> state
export default stateName => initialState => (state = initialState, action) =>
  action.type === MESSAGE_TYPE && action.stateName === stateName ?
    action.message(state) :
    state;
