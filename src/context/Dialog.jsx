import { createContext, useContext } from "react";

export const DialogContext= createContext({
    dialog: false,
    openDialog: () => {},
    closeDialog: () => {}
})

export const DialogContextProvider = DialogContext.Provider;

const useDialog=()=> useContext(DialogContext);

export default useDialog