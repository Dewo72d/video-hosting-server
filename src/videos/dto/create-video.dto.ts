import { IsString, IsNotEmpty, IsNumber } from "class-validator";


export class CreateVideoDto {
    @IsNotEmpty()
    @IsNumber()
    videoid: number;

    @IsNotEmpty()
    @IsNumber()
    userid:number;

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsNotEmpty()
    @IsNumber()
    time:number;
}

