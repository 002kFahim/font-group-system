import { useContext, createContext } from "react";

export const FontContext = createContext();
export const useFontContext = () => useContext(FontContext);
