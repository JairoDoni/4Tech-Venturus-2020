import { Controller, Get, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {

    }
    // protege tudo abaixo dessa linha
    @UseGuards(AuthGuard('jwt'))
    @Get() 
    retornarUsuarios(){
        return this.userService.getUsers()
    }

    @Post()
    criarUsuarios(@Body() newUser: UserViewModel){
        return this.userService.createNewUser(newUser)
    }

    // @Delete()
    // deletarUsuario(){
    //     return this.userService.deleteUser()
    // }

}
