import React, { createContext, useState } from "react";

interface IGlobalContext {
    userId: string;
    userType: string[];
    displayName: string;
    setUserId: (s: string) => void;
    setUserType: (s: any) => void;
    setDisplayName: (s: string) => void;
}

export const GlobalContext = createContext<IGlobalContext>({
    userId: '', setUserId: (_s) => { },
    userType: [], setUserType: (_s) => { },
    displayName: '', setDisplayName: (_s) => { }
})

export const GlobalContextProvider = (props: any) => {
    const [userId, setUserId] = useState('')
    const [userType, setUserType] = useState([])
    const [displayName, setDisplayName] = useState('')
    return (
        <GlobalContext.Provider value={{
            userId,
            setUserId,
            userType,
            setUserType,
            displayName,
            setDisplayName
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
