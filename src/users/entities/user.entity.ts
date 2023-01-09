import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Product } from "src/products/entities/product.entity";
import { Basket } from "src/basket/entities/basket.entity";


@Entity('user')
export class UserEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    userId: number

    @ApiProperty()
    username: string

    @ApiProperty()
    @OneToMany(()=>Product,(products)=>products.users)
    usersProduct: Product[]

    @ApiProperty()
    @Column()
    login: string

    @ApiProperty()
    @OneToMany(()=>Basket,(basket)=>basket.user)
    basket: Basket

    @ApiProperty()
    @Column()
    password: string

    @ApiProperty()
    @Column()
    email: string

    // @ApiProperty()
    // @Column()
    // phoneNumber: string

}
