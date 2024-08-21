import { StringLiteralLike } from "typescript"

export interface IUser {
    _id: string
    email: string
    password: string
    firstName: string
    lastName: string
  }
  
  export interface IRegisterData extends Omit<IUser, '_id'> {
    confirmPassword: StringLiteralLike
  }
  export interface ILoginData extends Omit<IUser, '_id' | 'firstName' | 'lastName'> {}
  
  export interface AuthenticatedRequest extends Request {
    user?: IUser
  }
  
  export interface IDecodedToken {
    id: string
  }