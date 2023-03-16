const initialState = {
    city: ''
  };
  
  function cityReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_CITY':
        return {
          ...state,
          city: action.payload
        };
      default:
        return state;
    }
  }
  
  export { cityReducer };
  
  export function setCity(city) {
    return {
      type: 'SET_CITY',
      payload: city
    };
  }
  