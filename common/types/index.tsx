export enum Sex {
    f = 'f',
    m = 'm',
    x = 'x',
}

export type ProfileDetails = {
    name: string;
    bio: string | null;
    height: number | null;
    age: number | null;
    sex: Sex | null;
    i_f: boolean;
    i_m: boolean;
    i_x: boolean;
    media: []
}

export type ProfileUpdate = {
    name: string;
    sex: Sex;
    bio: string | null;
    height: number | null;
    i_f: boolean;
    i_m: boolean;
    i_x: boolean;
}

export type MatchResponse = {
    match: boolean;
}

export type UserAuthentication = {
    token: string;
    expires_at: TDateISO;
    user: ProfileDetails;
    active: boolean;
}

export type ValidationError = {
    message: string,
    errors: any,
}

type TYear         = `${number}${number}${number}${number}`;
type TMonth        = `${number}${number}`;
type TDay          = `${number}${number}`;
type THours        = `${number}${number}`;
type TMinutes      = `${number}${number}`;
type TSeconds      = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;

type TDateISODate = `${TYear}-${TMonth}-${TDay}`;
type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;

export type TDateISO = `${TDateISODate}T${TDateISOTime}Z`;
