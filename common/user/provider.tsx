import React from "react";
import {UserContext} from "./context";
import {useStorageState} from "../storage";
import LoadingScreen from "../../components/LoadingScreen";
import {Text} from "react-native";
import {UserDetails} from "../types";

export default function UserProvider(props: React.PropsWithChildren) {
    const [[isLoading, user], setUser] = useStorageState('user');

    if (isLoading) {
        return <LoadingScreen>
            <Text>Restoring your profile ...</Text>
        </LoadingScreen>;
    }
    const parse = () => {
        return user?JSON.parse(user):null;
    }

    const stringify = (user: UserDetails | null) => {
        setUser(user?JSON.stringify(user):null);
    }

    return (
        <UserContext.Provider value={{
            user: parse(),
            setUser: stringify,
            isLoading: isLoading
        }}>
            {props.children}
        </UserContext.Provider>
    );
}
