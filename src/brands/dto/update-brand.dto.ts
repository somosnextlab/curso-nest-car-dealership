/* import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { UpdateCarDto } from '../../cars/dto/update-car.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {} */

import { IsString, MinLength } from "class-validator";

export class UpdateBrandDto {
    @IsString()
    @MinLength(1)
    name: string;
}
