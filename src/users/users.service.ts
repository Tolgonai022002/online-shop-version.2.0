import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>){}

  async create(dto: CreateUserDto){
    const user = await this.userRepo.create(dto)
    // if(user) throw new BadRequestException('USER WITH SUCH INFO IS ALREADY EXCIST!')
    return await this.userRepo.save(user)
  }


  async getAllUsers(){
    return await this.userRepo.find()
  }

  async getUserByLogin(login: string){
    const user = await this.userRepo.findOne({where:{login}})
    // if(!user)throw new BadRequestException('USER WITH SUCH LOGIN NOT FOUND!')
    return user
  }

  async getuserById(id:number){
  const userById = await this.userRepo.findOne({where:{userId:id}})
  if(!userById)throw new BadRequestException('USER WITH SUCH ID NOT FOUND!')
  return userById
  }

  async updateUser(id: number, dto: UpdateUserDto){
    const updateUser = await this.userRepo.findOne({where:{userId:id}})
    // if(!updateUser)throw new BadRequestException('USER WITH SUCH ID NOT FOUND!')
    Object.assign(updateUser,dto)
    return await this.userRepo.save(updateUser)
  }

  async remove(id:number){
    const user_rm = await this.userRepo.findOne({where:{userId:id}})
    if(!user_rm)throw new BadRequestException('USER WITH SUCH ID NOT FOUND!')
    await this.userRepo.remove(user_rm)
    return `USER WITH ID ${user_rm} IS SUCCESSFULLY REMOVED!`
  }
}
