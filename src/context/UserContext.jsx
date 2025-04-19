import { createContext, useContext } from "react";

export const UserContext= createContext({
    user: null,
    storeUser: () => {},
    deleteUser: () => {}
})

export const UserContextProvider = UserContext.Provider;

const useUser=()=> useContext(UserContext);

export default useUser