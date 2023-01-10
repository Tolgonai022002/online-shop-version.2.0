import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserEntity } from './entities/user.entity';
// import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
  // forwardRef(()=>AuthModule),
  // ConfigModule.forRoot(), EmailModule
],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService, TypeOrmModule]
})
export class UsersModule {}
