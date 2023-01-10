// import { Module , forwardRef} from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { UsersModule } from 'src/users/users.module';


// @Module({
//   imports: [forwardRef(()=>UsersModule),
//     JwtModule.register({
//       secret:process.env.JWT_SECRET || 'secret',
//       signOptions:{
//         expiresIn:'1h'
//       }
//     })
//   ] ,
//   exports:[AuthService,JwtModule],
//   controllers:[AuthController],
//   providers:[AuthService]
// })
// export class AuthModule {}
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailModule} from 'src/email/email.module'

@Module({
    imports: [MailModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
