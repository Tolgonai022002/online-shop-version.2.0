import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';

@ApiTags('basket-controller')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}


  @Post()
  async create(@Body() dto: CreateBasketDto){
    return await this.basketService.addToBasket(dto.userId,dto.productId,dto.productCount)

    // return await this.basketService.addToBasket(dto)
  }

  @Get('get all products in basket')
  async findAll(@Req() req) {
    return this.basketService.findAll(req.user.userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.basketService(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
  //   return this.basketService.update(+id, updateBasketDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketService.removeOne(+id);
  }
}
