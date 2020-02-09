import { Controller, UseGuards, UseInterceptors, Post, UploadedFile, Body, Get,Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { diskStorage} from 'multer'
import { FileInterceptor} from '@nestjs/platform-express'
import { UserActivityService } from 'src/services/user-activity/user-activity.service';
import { LikeOrDislikeViewModel } from 'src/domain/schema/like-or-dislike.viewmodel';

//com essa linha abaixo, todas as rotas vão exigir authentificação de segurança
@UseGuards(AuthGuard('jwt'))
@Controller('user-activity')
export class UserActivityController {
    constructor (private readonly UserActivityService: UserActivityService){

    }

    @Get(':index')
    getRecentImages(
        @Param('index') index: string
        ){
            return this.UserActivityService.getRecentUploads(index)
        }
    
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
                storage: diskStorage({
                    destination: '../images/',
                    filename: (req, file, callback) => { callback(null, file.originalname);},
            }),
          }),
    )
    postImage(
        @UploadedFile()file,
        @Body('userId') userId: string,
        @Body('description') description: string,
        
    ){
        return this.UserActivityService.uploadImage(userId, file.originalname, description)
    }
    @Put('like-or-dislike')
    likeOrDislikeUserActivity(@Body() LikeOrDislikeViewModel: LikeOrDislikeViewModel){
        return this.UserActivityService.likeOrDislikeUserActivity(LikeOrDislikeViewModel)
    }
}
