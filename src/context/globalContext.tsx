import React, {createContext, useState} from "react";

export const GlobalContext = createContext({
    userId: '', setUserId: (s: string) => {},
    displayName: '', setDisplayName: (s: string) => {}
})

export const GlobalContextProvider = (props: any) => {
    const [userId, setUserId] = useState('')
    const [displayName, setDisplayName] = useState('')
    return (
        <GlobalContext.Provider value={{
            userId,
            setUserId,
            displayName,
            setDisplayName
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
