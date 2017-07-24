import MESSAGE_TYPE from './message-type';

export default stateName => message =>
  ({ type: MESSAGE_TYPE, stateName, message });
