import MESSAGE_TYPE from './message-type';

const handleMessage = (state, message) =>
  typeof message === 'function'
    ? message(state)
    : { ...state, ...message };

// createMessagesReducer : STATE_NAME -> INITIAL_STATE -> (state, action) -> state
export default stateName => initialState => (state = initialState, action) =>
  action.type.indexOf(MESSAGE_TYPE) === 0 && action.stateName === stateName
    ? handleMessage(state, action.message)
    : state;
