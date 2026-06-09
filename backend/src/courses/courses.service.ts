import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCourseDto, UpdateCourseDto } from "./dto/course.dto";

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCourseDto) {
    return this.prisma.course.create({ data });
  }

  async findAll() {
    return this.prisma.course.findMany({ include: { lessons: true } });
  }

  async findOne(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: { lessons: true },
    });
  }

  async update(id: string, data: UpdateCourseDto) {
    return this.prisma.course.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.course.delete({ where: { id } });
  }
}
