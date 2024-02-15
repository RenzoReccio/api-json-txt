import { ApiProperty } from "@nestjs/swagger"

export class GetUserDto{
    @ApiProperty()
    page: number
    
    @ApiProperty()
    size: number
}