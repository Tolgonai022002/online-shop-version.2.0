import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ReturningStatementNotSupportedError } from 'typeorm/error';



@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>){}

  async create(dto: CreateProductDto){
    const product = await this.productRepo.save({...dto})
    // if(product)return 'PRODUCT IS ALREADY EXCIST!'
    return product
  }

  async getOne(id: number){
    const oneP = await this.productRepo.findOne({where:{productId:id}})
    if(!oneP) throw new BadRequestException('PRODUCT WITH SUCH ID NOT FOUND!')
    return oneP
  }

  async getAll(){
    return await this.productRepo.find()
  }

  async update (id: number, dto: UpdateProductDto){
    const update = await this.productRepo.findOne({where:{productId:id}})
    if(!update) throw new BadRequestException('PRODUCT WITH SUCH ID NOT FOUND!')
    const update2 = Object.assign(update,dto)
    await this.productRepo.save(update2)
    return update2
  }


  async remove(id:number){
    const remove_product = await this.productRepo.findOne({where:{productId:id}})
    if(!remove_product)throw new BadRequestException('PRODUCT WITH SUCH ID NOT FOUND!')
    await this.productRepo.remove(remove_product)
    return `PRODUCT WITH ID ${id} IS SUCCESSFULLY REMOVED`
  }
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  // findAll() {
  //   return `This action returns all products`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
