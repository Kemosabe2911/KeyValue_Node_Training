import { IsNumber, IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    // @IsNumber()
    public name: string;
}