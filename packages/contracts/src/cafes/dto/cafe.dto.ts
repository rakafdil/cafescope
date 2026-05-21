import {
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  Min,
  IsIn,
} from "class-validator";
import { Type } from "class-transformer";

export class FacilityDto {
  @IsNumber()
  @Min(0, { message: "Kapasitas colokan tidak boleh minus" })
  electricPortCapacity!: number;

  @IsNumber()
  @Min(0, { message: "Bandwidth WiFi tidak boleh minus" })
  wifiBandwidth!: number;

  @IsNumber()
  @Min(0, { message: "Total kursi tidak boleh minus" })
  seatTotal!: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(["Tenang", "Sedang", "Bising"], {
    message: "Tingkat kebisingan harus antara Tenang, Sedang, atau Bising",
  })
  noiseLevel!: string;
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

  // Koordinat spasial untuk database PostGIS
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsString()
  @IsNotEmpty({ message: "Alamat lengkap wajib diisi" })
  addressText!: string;

  // Validasi nested object untuk fasilitas
  @ValidateNested()
  @Type(() => FacilityDto)
  facility!: FacilityDto;
}
