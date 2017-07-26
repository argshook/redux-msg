import MESSAGE_TYPE from './message-type';

export default stateName => (message, messageName) =>
  ({
    type: messageName ?
      `${MESSAGE_TYPE}/${stateName}/${messageName}` :
      `${MESSAGE_TYPE}/${stateName}`,
    stateName,
    message
  });
