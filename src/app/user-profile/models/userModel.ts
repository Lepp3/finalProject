export interface SignedUser{
    kind: string,
    localId: string,
    email: string,
    displayName?: string,
    idToken: string,
    registered?: boolean,
    refreshToken: string,
    expiresIn: string
}


export interface UserInfo{
    _id:string,
    bio:string,
    profileImgSrc:string,
    username:string,
    email:string
}