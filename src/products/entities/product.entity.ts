import { ApiProperty } from "@nestjs/swagger";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, ColumnTypeUndefinedError, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class Product {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    productId: number

    // @ApiProperty()
    // @Column()
    // userId: number

    @ApiProperty()
    @Column()
    name: string

    @ApiProperty()
    @Column()
    firm: string

    @ApiProperty()
    @Column()
    price: number

    // @ApiProperty()
    // @Column()
    // img: string

    @ManyToOne(()=>UserEntity,(users)=>users.userId)
    @JoinColumn({name: 'userID'})
    users: UserEntity[]
}
