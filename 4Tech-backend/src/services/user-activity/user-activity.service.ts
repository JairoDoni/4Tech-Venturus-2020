import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepositorie } from 'src/repositories/user-repositorie/user-repositorie';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comment.dto';
import { UserActivityRepository } from 'src/repositories/user-repositorie/user-activity-repository/user-activity.repository';
import { read, readFileSync } from 'fs';
import { UserActivity } from 'src/domain/schema/user-activity.schema';
import { LikeOrDislikeViewModel } from 'src/domain/schema/like-or-dislike.viewmodel';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';


@Injectable()
export class UserActivityService {
        constructor(private readonly userRepository: UserRepositorie,
                    private readonly userActivityRepository: UserActivityRepository,
                    private readonly websocketGateway: WebsocketGateway){
        }

     async getRecentUploads(index: string){
            const indexAsNumber = parseInt(index, 10)
            if(isNaN(indexAsNumber)){
                throw new BadRequestException('Invalid Index')
            }
            const recentUploads = await this.userActivityRepository.getPaged(indexAsNumber)
            return this.converterImagesToBase64(recentUploads);
        }
        async likeOrDislikeUserActivity(likeOrDislikeViewModel: LikeOrDislikeViewModel){
            const userActivity = await this.userActivityRepository.getById(likeOrDislikeViewModel.userActivityId)
            if (!userActivity){
                throw new BadRequestException('An user Activity with the given id does not exist')
            }
            const user = await this.userRepository.getById(likeOrDislikeViewModel.userId)
            if(!user){
                throw new BadRequestException('An User with the given id does not exist.')
            }

            if(userActivity.likes.includes(user._id.toString())){
                userActivity.likes = userActivity.likes.filter(x => x !== user._id.toString())
            }else{
                userActivity.likes.push(user._id.toString())
            }
            // return await this.userActivityRepository.update(userActivity)
            const updatedUserActivity = await this.userActivityRepository.update(userActivity)
            this.websocketGateway.notifyOneLike(userActivity._id, userActivity.userId)
            
            return updatedUserActivity
        }

        async uploadImage(userId: string, filename: string, description: string){
            const user =await this.userRepository.getById(userId)
            if (!user){
                throw new BadRequestException('This user does not exist.')
            }
            const uploadImageObj = new UserActivityDto(userId, filename, user.userName)
            if(description){
                uploadImageObj.comments.push(new UserActivityCommentDto(
                    userId,
                    user.userName,
                    description,
            ))
            }
            const createdUserActivity = await this.userActivityRepository.create(uploadImageObj)
            return this.convertImageToBase64ForOneFile(createdUserActivity)
        }
        converterImagesToBase64(userActivities: UserActivity[] ){
            return Promise.all(
                userActivities.map(userActivity =>{
                    return{
                        ...userActivity,
                        imgEncoded: readFileSync('../images/' + userActivity.fileName, 'base64'),
                    };
                }),
            );
        }
        convertImageToBase64ForOneFile(userActivity: UserActivity){
            return { 
                ...userActivity,
                imgEncoded: readFileSync('../images/' + userActivity.fileName, 'base64'),
            }
        }
}
