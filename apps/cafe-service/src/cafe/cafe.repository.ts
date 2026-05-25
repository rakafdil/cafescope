import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ClaimStatus } from '@prisma/client';

@Injectable()
export class CafeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const cafes = await this.prisma.cafe.findMany({
      include: {
        facility: true,
        operationalHours: true,
        claims: true,
      },
    });

    if (cafes.length === 0) return [];

    const locations = await this.prisma.$queryRaw<
      { id: string; latitude: number | null; longitude: number | null }[]
    >`
      SELECT 
        id, 
        ST_Y(location::geometry) AS latitude, 
        ST_X(location::geometry) AS longitude
      FROM cafes
      WHERE id IN (${Prisma.join(cafes.map((c) => c.id))})
    `;

    return cafes.map((cafe) => {
      const loc = locations.find((l) => l.id === cafe.id);
      return {
        ...cafe,
        latitude: loc?.latitude ?? null,
        longitude: loc?.longitude ?? null,
      };
    });
  }

  async findOne(cafeId: string) {
    const cafe = await this.prisma.cafe.findUnique({
      where: { id: cafeId },
      include: {
        facility: true,
        operationalHours: true,
        claims: true,
      },
    });

    if (!cafe) return null;

    const [location] = await this.prisma.$queryRaw<
      { latitude: number | null; longitude: number | null }[]
    >`
      SELECT 
        ST_Y(location::geometry) AS latitude, 
        ST_X(location::geometry) AS longitude
      FROM cafes
      WHERE id = ${cafeId}
    `;

    return {
      ...cafe,
      latitude: location?.latitude ?? null,
      longitude: location?.longitude ?? null,
    };
  }

  async createCafe(data: Prisma.CafeCreateInput) {
    return this.prisma.cafe.create({
      data,
      include: {
        facility: true,
      },
    });
  }

  async updateCafeInfo(cafeId: string, data: Prisma.CafeUpdateInput) {
    return this.prisma.cafe.update({
      where: { id: cafeId },
      data,
    });
  }

  async removeCafe(cafeId: string) {
    return this.prisma.cafe.delete({
      where: { id: cafeId },
    });
  }

  async updateLocation(cafeId: string, latitude: number, longitude: number) {
    await this.prisma.$executeRaw`
      UPDATE "cafes"
      SET location = ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)
      WHERE id = ${cafeId}
    `;

    return {
      status: 'success',
      message: 'Titik koordinat berhasil disimpan ke dalam database spasial',
    };
  }

  async removeLocation(cafeId: string) {
    await this.prisma.$executeRaw`
      UPDATE "cafes"
      SET location = NULL
      WHERE id = ${cafeId}
    `;

    return {
      status: 'success',
      message: 'Lokasi spasial berhasil dihapus',
    };
  }

  async upsertFacility(
    cafeId: string,
    data: Prisma.FacilityUncheckedCreateInput,
  ) {
    const { cafeId: ignoredCafeId, ...updateData } = data;
    void ignoredCafeId;

    return this.prisma.facility.upsert({
      where: { cafeId },
      create: data,
      update: updateData,
    });
  }

  async upsertOperationalHours(
    cafeId: string,
    hours: Prisma.OperationalHoursUncheckedCreateInput[],
  ) {
    await this.prisma.$transaction(
      hours.map((hour) => {
        const { cafeId: ignoredCafeId, ...updateData } = hour;
        void ignoredCafeId;

        return this.prisma.operationalHours.upsert({
          where: {
            cafeId_dayOfWeek: {
              cafeId,
              dayOfWeek: hour.dayOfWeek,
            },
          },
          create: hour,
          update: updateData,
        });
      }),
    );

    return this.prisma.operationalHours.findMany({
      where: { cafeId },
      orderBy: { dayOfWeek: 'asc' },
    });
  }

  async createClaim(data: Prisma.ClaimCreateInput) {
    return this.prisma.claim.create({ data });
  }

  async removeFacilities(cafeId: string) {
    await this.prisma.facility.deleteMany({ where: { cafeId } });

    return {
      status: 'success',
      message: 'Fasilitas cafe berhasil dihapus',
    };
  }

  async removeOperationalHours(cafeId: string) {
    await this.prisma.operationalHours.deleteMany({ where: { cafeId } });

    return {
      status: 'success',
      message: 'Jam operasional berhasil dihapus',
    };
  }

  async updateClaimStatus(claimId: string, status: ClaimStatus) {
    return this.prisma.claim.update({
      where: { id: claimId },
      data: { status },
    });
  }
}
