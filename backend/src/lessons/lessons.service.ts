import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLessonDto, UpdateLessonDto } from "./dto/lesson.dto";

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async create(courseId: string, data: CreateLessonDto) {
    return this.prisma.lesson.create({ data: { ...data, courseId } });
  }

  async findAllByCourse(courseId: string) {
    return this.prisma.lesson.findMany({ where: { courseId } });
  }

  async findOne(id: string) {
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateLessonDto) {
    return this.prisma.lesson.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.lesson.delete({ where: { id } });
  }

  async getProgress(courseId: string) {
    const lessons = await this.prisma.lesson.findMany({ where: { courseId } });
    const total = lessons.length;
    if (total === 0) return { progress: 0 };
    const completed = lessons.filter(l => l.isCompleted).length;
    return { progress: (completed / total) * 100 };
  }
}
