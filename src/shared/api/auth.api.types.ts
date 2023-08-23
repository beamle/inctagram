export type LoginFormType = {
  email: string
  password: string
}

export type LoginResponseType = {
  accessToken: string
}
export type LogoutResponse = {
  statusCode: string
  messages: [
    {
      message: string
      field: string
    },
  ]
  error: string | null
}

export type SignUpType = {
  userName: string
  email: string
  password: string
  passwordConfirmation: string
  agreement: boolean
}

export type UserType = {
  id?: number
  userName: string
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  city?: string
  dateOfBirth?: Date
  aboutMe?: string
  avatars?: [
    {
      url?: string
      width: number
      height: number
      fileSize: number
    },
  ]
}
