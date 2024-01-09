import React, {useEffect, useState} from "react";
import AuthContext from "./session.context";
import {UserDetails} from "../types";
import useApi from "../api";
import {useStorageState} from "../storage";

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [user, setUser] = useState<null | UserDetails>(null);
    const {requestSignUp, requestSignIn, getUserData} = useApi();

    const checkUserIn = async (token: string) => {
        const userData = await getUserData(token);
        setSession(token);
        setUser(userData);
        return userData;
    };

    useEffect(() => {
        if(session !== null)
        {
            getUserData(session).then((userDetails) => {
                setUser(userDetails);
            });
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signIn: async (email: string, password: string) => {
                    try {
                        const credentials = await requestSignIn(email, password);
                        return checkUserIn(credentials.token);
                    }
                    catch(error)
                    {
                        setSession(null);
                        throw error;
                    }
                },
                signUp: async (username: string, password: string, email: string, birthday: Date) => {
                    try {
                        const credentials = await requestSignUp(username, password, email, birthday);
                        return checkUserIn(credentials.token);
                    }
                    catch(error)
                    {
                        setSession(null);
                        throw error;
                    }
                },
                signOut: () => {
                    setSession(null);
                    setUser(null);
                },
                session,
                user,
                isLoading,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
