import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService){}

    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto)
        return user
    }

    async registration(userDto: CreateUserDto){
        const oneUsr = await this.userService.getUserByLogin(userDto.login)
        if(oneUsr){
            throw new HttpException('USER WITH SUCH LOGIN IS ALREADY EXIST!',HttpStatus.BAD_REQUEST)
        }
        const hashPass = await bcrypt.hash(userDto.password,5)
            const user = await this.userService.create({...userDto,password:hashPass})
            return this.generateToken(user)
    }

    async generateToken(user: UserEntity){
        const payload = {login: user.login,
                        id: user.userId}
        return {token: this.jwtService.sign(payload)}
    }

    private async validateUser(userDto: CreateUserDto){
        const user = await this.userService.getUserByLogin(userDto.login)
        const passEq = await bcrypt.compare(userDto.password,user.password)
        if(user && passEq){
            return this.generateToken(user)
        }
        throw new UnauthorizedException('PASSWORD OR LOGIN IS INCORRECT!')
    }
}

