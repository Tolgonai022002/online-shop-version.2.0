import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Basket,Product,UserEntity])],
  controllers: [BasketController],
  providers: [BasketService,ProductsService],
  // exports:[BasketService,BasketModule,TypeOrmModule]
})
export class BasketModule {}
