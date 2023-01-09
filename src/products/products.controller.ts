import { Controller,UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuards } from 'src/auth/guards/jwt-guards';

@ApiTags('product-controller')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuards)
  @ApiOperation({summary: 'Create new product'})
  @Post('post')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuards)
  @ApiOperation({summary: 'Get all created products'})
  @Get()
  findAll() {
    return this.productsService.getAll();
  }

  @UseGuards(JwtAuthGuards)
  @ApiOperation({summary: 'Get one product by ID'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.getOne(+id);
  }

  @UseGuards(JwtAuthGuards)
  @ApiOperation({summary:'Update one product'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuards)
  @ApiOperation({summary: 'Remove product by ID'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
