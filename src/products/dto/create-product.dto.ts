import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    firm: string

    // @ApiProperty()
    // img: string

    @ApiProperty()
    price: number

}
