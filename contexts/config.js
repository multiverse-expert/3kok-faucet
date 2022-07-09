import axios from "axios";
import {
  createContext,
  useEffect,
  useContext,
  useCallback,
  useReducer,
} from "react";
import { getInitConfig } from "../utils/contracts/init";

const Context = createContext();

const initialState = {
  config: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONFIG":
      return {
        ...state,
        config: action.config,
      };
    default:
      throw new Error();
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { config } = state;
  const fetchConfig = useCallback(async () => {
    const config = await getInitConfig();

    dispatch({
      type: "SET_CONFIG",
      config: config,
    });
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const exposed = {
    config,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useConfig = () => useContext(Context);
export default Provider;
