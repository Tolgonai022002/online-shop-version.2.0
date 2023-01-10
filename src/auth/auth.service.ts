// import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
// import { BadRequestException } from '@nestjs/common/exceptions';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { UserEntity } from 'src/users/entities/user.entity';
// import { UsersService } from 'src/users/users.service';
// // import {EmailService} from '../email/email.service'
// import { MailerService } from '@nestjs-modules/mailer';


// @Injectable()
// export class AuthService {
//     constructor(private userService: UsersService,
//                 private jwtService: JwtService,
//                 private mailService: MailerService){}

//     async login(userDto: CreateUserDto){
//         const user = await this.validateUser(userDto)
//         return user
//     }

//     // async registration(userDto: CreateUserDto){
//     //     const oneUsr = await this.userService.getUserByLogin(userDto.login)
//     //     if(oneUsr){
//     //         throw new HttpException('USER WITH SUCH LOGIN IS ALREADY EXIST!',HttpStatus.BAD_REQUEST)
//     //     }
//     //     const hashPass = await bcrypt.hash(userDto.password,5)
//     //         const user = await this.userService.create({...userDto,password:hashPass})
//     //         return this.generateToken(user)
//     // }

//     async generateToken(user: UserEntity){
//         const payload = {login: user.login,
//                         id: user.userId}
//         return {token: this.jwtService.sign(payload)}
//     }

//     private async validateUser(userDto: CreateUserDto){
//         const user = await this.userService.getUserByLogin(userDto.login)
//         const passEq = await bcrypt.compare(userDto.password,user.password)
//         if(user && passEq){
//             return this.generateToken(user)
//         }
//         throw new UnauthorizedException('PASSWORD OR LOGIN IS INCORRECT!')
//     }

//     async registrationEmail(userDto: CreateUserDto){
//         const user2 = await this.userService.getUserByLogin(userDto.login)
//         if(user2) throw new BadRequestException('USER WITH SUCH LOGIN IS ALREADY EXCIST!')
//         await this.mailService.sendMail({
//             to: userDto.email,
//             from: process.env.MAIL_ACCOUNT,
//             subject:'Greeting new created user!',
//             text:`${userDto.login}welcome`
//         })
//         const hashPass = await bcrypt.hash(userDto.password,10)
//         const user = await this.userService.create({...userDto,password:hashPass})
//         return await this.generateToken(user)
//     }
// }

import { Injectable } from '@nestjs/common';
import { MailService } from '../email/email.service';
import {UserEntity} from '../users/entities/user.entity'


@Injectable()
export class AuthService {

    constructor(private mailService: MailService) {}

    async signUp(user: UserEntity) {
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        // create user in db
        // ...
        // send confirmation mail
        await this.mailService.sendUserConfirmation(user, token);
    }
    
}
