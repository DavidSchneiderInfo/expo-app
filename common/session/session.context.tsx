import React from "react";
import {AuthContextType} from "./session.types";

const AuthContext = React.createContext<AuthContextType>({
    session: null,
    isLoading: true,
    signIn: () => {},
    signUp: () => {},
    signOut: () => {},
    refresh: () => {},
});

export default AuthContext;
