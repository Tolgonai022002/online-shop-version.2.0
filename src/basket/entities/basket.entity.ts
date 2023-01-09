import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('basket')
export class Basket {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    basketID: number

    @ApiProperty()                           // тут вроде должно быть ID продукта , но еще посмотрим
    @Column()
    productId:number 
    
    @ApiProperty()
    @Column()
    count: number

    @ApiProperty()
    @ManyToOne(()=>UserEntity,(user)=>user.basket)
    user: UserEntity

    @ApiProperty()
    @Column()
    productCount: number
}
