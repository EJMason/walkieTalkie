const defaultProps = {
  roomname: '',
  messages: [],
};

export default function reducer(state = defaultProps, action) {
  switch (action.type) {
    case 'SET_ROOMNAME': {
      return { ...state,
        roomname: action.payload,
      };
    }
    default: {
      break;
    }
  }
  return state;
}
