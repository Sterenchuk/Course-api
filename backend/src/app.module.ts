import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { CoursesModule } from "./courses/courses.module";
import { LessonsModule } from "./lessons/lessons.module";

@Module({
  imports: [PrismaModule, CoursesModule, LessonsModule],
})
export class AppModule {}
