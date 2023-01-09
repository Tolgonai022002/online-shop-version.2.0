import { ApiProperty } from "@nestjs/swagger";

export class CreateBasketDto {
    @ApiProperty()
    productId:number

    @ApiProperty()
    productCount:number

    @ApiProperty()
    userId:number
}
