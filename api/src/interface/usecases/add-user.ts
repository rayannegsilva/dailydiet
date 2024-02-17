import { UserModel } from "interface/mode/user-model"

export interface AddUserModel {
  email: string
  password: string
  createdAt: Date
}

export interface AddUser {
  add (user: AddUserModel): Promise<UserModel>
}
