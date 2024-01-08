export type SignUpDetails = {
    name: string;
    email: string;
    password: string;
    birthday: string;
}

export type UserDetails = {
    name: string;
    email: string;
    birthday: string;
    bio: string | null;
}

export type ProfileDetails = {
    id: number;
    name: string;
    bio: string;
    age: number;
}

export type MatchResponse = {
    match: boolean;
}

export type Reducer<S, A> = (prevState: S, action: A) => S;

export enum PhotoSource {
    camera = 'camera',
    library = 'library',
}

export type UserAuthentication = {
    token: string;
    user: UserDetails;
}

export type ValidationError = {
    message: string,
    errors: any,
}
