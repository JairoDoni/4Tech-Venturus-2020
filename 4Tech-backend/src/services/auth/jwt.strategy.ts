import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import {PassportStrategy } from "@nestjs/passport";

//NUNCA DEVE SER EXPOSTA PUBLICAMENTE:
//  a chave secreta só esta a mostra a fins de deixar claro o que
//  o codigo esta fazendo.Em em ambiente de podução, a chave
//  deve estar protegida por medidas apropriadas (como por exemplo 
//  secret vaults, variaveis de ambientes ou serviços de configuração)
export const  secretKey = 'wingardium leviosa'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secretKey
        })
    }
    async validate(payload: any){
        return {userLogin: payload.userLogin }
    }
}