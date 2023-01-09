import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { DB_CONFIG } from './UTILS/db_config';
// import { BasketModule } from './basket/basket.module';

@Module({
  imports: [
  TypeOrmModule.forRoot(DB_CONFIG),
    AuthModule, UsersModule, ProductsModule, 
    // BasketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
