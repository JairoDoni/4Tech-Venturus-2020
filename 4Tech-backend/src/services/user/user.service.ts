import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepositorie } from 'src/repositories/user-repositorie/user-repositorie';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { LoginViewModel } from 'src/domain/login.viewmodel';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepositorie) {

    }
    getUsers() {
        return this.userRepository.getUsers();
    }
  async  createNewUser(newUser: UserViewModel){
        // return this.userRepository.createUser(newUser)
      
        const userList = await this.userRepository.getUsers()
        const existingUser = userList.find(x => x.userName === newUser.userName)

        if (existingUser){
            throw new BadRequestException('This username already exists!')
        }
        return this.userRepository.createUser(newUser)
    }

 async attemptLogin(login: LoginViewModel){
        const userList = await this.userRepository.getUsers();
        const foundLogin = userList.find (x =>
            x.userLogin === login.userLogin &&
            x.userPassword === login.userPassword
            )
    return foundLogin
    }
}
