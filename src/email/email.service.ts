// import { MailerService } from '@nestjs-modules/mailer';
// import { Injectable } from '@nestjs/common';
// import { template } from 'handlebars';


// @Injectable()
// export class EmailService {
//   constructor(private readonly mailerService: MailerService){}

//   async send(
//     to: string[],
//     subject:string,
//     temaplateName: string,
//     context: any={},
//     ): Promise<any>{
//       await this.mailerService.sendMail({
//         to: to.join(', '),
//         subject,
//         template: `src/email/templates/${temaplateName}`,
//         context
//       })
//       return true
//     }
//   async signIn(to: string){
//     await this.send([to],'Login attempt', 'signin.ejs', {email:to,datetime: new Date()})
//   }

//   async signup(to :string){
//     await this.send([to],'Completion of membership', 'signup.ejs', {email:to})
//   }
// }
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(user: UserEntity, token: string) {
        
        const url = `example.com/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: "test@gmail.com",
            subject: 'Welcome to Nice App! Confirm your Email',
            template: '/confirmation', 
            context: { 
                name: user.username,
                url,
            },
        });
    }
}