import * as mongoose from 'mongoose'
import  { Document } from 'mongoose'

//'interface' manipula os atributos("qual atributo vai pegar e qual vai colocar")
export interface User extends Document {
    readonly _id: mongoose.Schema.Types.ObjectId
    readonly userLogin: string,
    readonly userName: string,
    readonly userPassword: string,
}

//OBS: o mongoose tem uma sintaxe propria 
export const UserSchema = new mongoose.Schema({
        userLogin: String,
        userName: String,
        userPassword: String,
});