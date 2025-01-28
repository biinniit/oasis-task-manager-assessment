export interface UserDetails {
  givenName: string
  middleName?: string
  familyName: string
  email: string
}

export interface User extends UserDetails {
  id: number
}

export interface RegisterPayload extends UserDetails {
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface Token {
  accessToken: string
}
