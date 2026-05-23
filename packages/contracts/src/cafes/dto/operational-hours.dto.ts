import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class OperationalHoursDto {
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek!: number;

  @IsString()
  @IsOptional()
  openTime?: string | null;

  @IsString()
  @IsOptional()
  closeTime?: string | null;

  @IsBoolean()
  @IsOptional()
  isClosed?: boolean;
}

export class UpdateOperationalHoursDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OperationalHoursDto)
  hours!: OperationalHoursDto[];
}
