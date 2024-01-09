import {UserDetails} from "../types";

export type AuthContextType = {
    signIn: (email: string, password: string) => Promise<UserDetails>;
    signUp: (username: string, password: string, email: string, birthday: Date) => Promise<UserDetails>;
    signOut: () => void;
    session?: string | null,
    isLoading: boolean
    user: null | UserDetails
};
