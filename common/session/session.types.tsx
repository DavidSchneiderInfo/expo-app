import {UserDetails} from "../types";

export type AuthContextType = {
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (username: string, password: string, email: string, birthday: Date) => Promise<void>;
    signOut: () => void;
    session?: string | null,
    isLoading: boolean
    user: null | UserDetails
};
