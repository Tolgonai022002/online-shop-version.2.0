import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { DB_CONFIG } from './UTILS/db_config';
// import { BasketModule } from './basket/basket.module';
// import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProductsService } from './products/products.service';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { EmailModule } from './email/email.module';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  TypeOrmModule.forRoot(DB_CONFIG),
  ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
  ConfigModule.forRoot({
    isGlobal:true
  }),
  // MailerModule.forRoot({
  //   transport:{
  //     host:process.env.MAIL_HOST,
  //     auth:{
  //       user: process.env.MAIL_USER,
  //       pass: process.env.MAIL_PASS
  //     }
  //   }
  // }),
    AuthModule,
     UsersModule, ProductsModule, 
    // EmailModule, 
    // MailModule, 
    // BasketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
