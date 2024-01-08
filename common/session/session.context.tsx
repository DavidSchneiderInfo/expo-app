import React from "react";
import {AuthContextType} from "./session.types";

const AuthContext = React.createContext<AuthContextType>({
    signIn: async () => {},
    signUp: async () => {},
    signOut: () => {},
    session: null,
    isLoading: true,
    user: null,
});

export default AuthContext;
