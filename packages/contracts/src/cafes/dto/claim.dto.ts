import { IsIn, IsOptional, IsString } from "class-validator";

export type ClaimStatus = "PENDING" | "APPROVED" | "REJECTED";

export class CreateClaimDto {
  @IsString()
  cafeId!: string;

  @IsString()
  userId!: string;

  @IsString()
  @IsOptional()
  proofUrl?: string | null;

  @IsIn(["PENDING", "APPROVED", "REJECTED"])
  @IsOptional()
  status?: ClaimStatus;
}

export class UpdateClaimStatusDto {
  @IsIn(["PENDING", "APPROVED", "REJECTED"])
  status!: ClaimStatus;
}
