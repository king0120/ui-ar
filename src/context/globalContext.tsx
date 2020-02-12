import React, { createContext, useState } from "react";

interface IGlobalContext {
    userId: string;
    userType: string[];
    displayName: string;
    setUserId: (s: string) => void;
    setUserType: (s: any) => void;
    setDisplayName: (s: string) => void;
    theatreVerified: boolean;
    setTheatreVerified: (s: boolean) => void;
}

export const GlobalContext = createContext<IGlobalContext>({
    userId: '', setUserId: (_s) => { },
    userType: [], setUserType: (_s) => { },
    displayName: '', setDisplayName: (_s) => { },
    theatreVerified: false, setTheatreVerified: (_s) => { }
})

export const GlobalContextProvider = (props: any) => {
    const [userId, setUserId] = useState('')
    const [userType, setUserType] = useState([])
    const [displayName, setDisplayName] = useState('')
    const [theatreVerified, setTheatreVerified] = useState(false)
    return (
        <GlobalContext.Provider value={{
            userId,
            setUserId,
            userType,
            setUserType,
            displayName,
            setDisplayName,
            theatreVerified,
            setTheatreVerified
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
