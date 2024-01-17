import React, {useEffect} from "react";
import AuthContext from "./session.context";
import useApi from "../api";
import {useStorageState} from "../storage";
import {useRouter} from "expo-router";

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const {requestSignUp, requestSignIn, refreshSession} = useApi();
    const router = useRouter();

    const parseSession = () => {
        return session
            ? JSON.parse(session)
            : session;
    }

    useEffect(() => {
        if(session !== null)
        {
            refreshSession(session).then((credentials) => {
                setSession(JSON.stringify(credentials));
            });
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signIn: (email: string, password: string) => {
                    requestSignIn(email, password).then((credentials) => {
                        setSession(JSON.stringify(credentials));
                        router.push(
                            credentials.active
                                ? '/'
                                : '/setup-profile'
                        )
                    }).catch((error) => {
                        setSession(null);
                        throw error;
                    });
                },
                signUp: (username: string, password: string, email: string, birthday: Date) => {
                    requestSignUp(username, password, email, birthday).then((credentials) => {
                        setSession(JSON.stringify(credentials));
                        router.push('/setup-profile')
                    }).catch((error) => {
                        setSession(null);
                        throw error;
                    });
                },
                signOut: () => {
                    setSession(null);
                },
                session: parseSession(),
                isLoading
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
