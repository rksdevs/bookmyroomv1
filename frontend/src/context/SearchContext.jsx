import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: JSON.parse(localStorage.getItem("dates")) || [],
  roomOptions: JSON.parse(localStorage.getItem("roomOptions")) || {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("dates", JSON.stringify(state.dates));
    localStorage.setItem("roomOptions", JSON.stringify(state.roomOptions));
  }, [state.dates, state.roomOptions]);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        roomOptions: state.roomOptions,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
