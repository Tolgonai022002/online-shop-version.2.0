import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Basket } from './entities/basket.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsController } from 'src/products/products.controller';
import { count } from 'console';

@Injectable()
export class BasketService {
  constructor(
  @InjectRepository(Basket)
  @InjectRepository(Product)
  private readonly basketRepo: Repository<Basket>,
  private readonly productRepo: Repository<Product>
  ){}

  async findAll(userId:number){
    const user = await this.basketRepo.find({relations:['user'],where:{user:{userId}}})
    for (let i = 0; i<user.length; i++){
      delete user[i].user.password
    }
    return user
  }


  async removeOne(id:number){
    const removeFromBasket = await this.basketRepo.findOne({where:{productId:id}})
    if(!removeFromBasket){
      throw new BadRequestException('NO ORDER!')
    }
    await this.basketRepo.remove(removeFromBasket)
    return 'PRODUCT WAS SUCCESSFULLY REMOVED!'
  }

  async addToBasket(
    // dto: CreateBasketDto
    userID:number,productId:number, count: number
    ){

      
      
    const productToTheBasket = await this.productRepo.findOne({where:{}})
    if(!productToTheBasket){
      throw new BadRequestException('PRODUCT WITH SUCH ID IS NOT EXCIST!')
    }
    const obj = {user:{},productId:0,productName: '',count}
    obj.productId = productId
    obj.productName = productToTheBasket.name
    obj.count = count
    obj.user = {userID:userID}
    return await this.basketRepo.save(obj)
  }


}
