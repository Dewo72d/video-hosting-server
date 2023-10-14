import { IsString, IsNotEmpty, IsNumber } from "class-validator";


export class CreateVideoDto {
    @IsNotEmpty()
    @IsNumber()
    video: string;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    time: number;
}

