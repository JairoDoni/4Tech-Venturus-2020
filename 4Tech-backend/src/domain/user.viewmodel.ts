import { IsNotEmpty, Length } from 'class-validator'

export class UserViewModel{
    constructor( userLogin: string, userName: string, userPassword: string ){
        this.userLogin = userLogin
        this.userName = userName
        this.userPassword = userPassword
    }

    @IsNotEmpty()
    @Length(3, 10)
    readonly userLogin: string
    @IsNotEmpty()
    @Length(3, 10)
    readonly userName: string 
    @IsNotEmpty()
    @Length(3,10)
    readonly userPassword: string
}