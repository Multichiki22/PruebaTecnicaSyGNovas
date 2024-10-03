export type UserToken = {
   id: number,
   userName: string,
   iat: number,
   exp: number
}
export type UserRefreshToken = {
    id: number,
    userName: string,
    iat: number,
    exp: number,
    refreshToken: string
 }