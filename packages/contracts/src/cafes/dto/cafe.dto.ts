import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class FacilityDto {
  @IsBoolean()
  @IsOptional()
  hasWifi?: boolean;

  @IsBoolean()
  @IsOptional()
  hasPlugs?: boolean;

  @IsNumber()
  @Min(0, { message: "Kapasitas tempat duduk tidak boleh minus" })
  @IsOptional()
  seatingCapacity?: number | null;

  @IsString()
  @IsOptional()
  noiseLevel?: string | null;
}

export class CreateCafeDto {
  @IsString()
  @IsOptional()
  ownerId?: string | null;

  @IsString()
  @IsNotEmpty({ message: "Nama cafe tidak boleh kosong" })
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: "Alamat lengkap wajib diisi" })
  address!: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  @IsOptional()
  longitude?: number;

  @ValidateNested()
  @Type(() => FacilityDto)
  @IsOptional()
  facility?: FacilityDto;
}

export class UpdateCafeDto {
  @IsString()
  @IsOptional()
  ownerId?: string | null;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsString()
  @IsOptional()
  address?: string;
}
