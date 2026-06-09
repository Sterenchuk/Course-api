import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto, UpdateLessonDto } from "./dto/lesson.dto";

@Controller()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post("courses/:courseId/lessons")
  create(
    @Param("courseId") courseId: string,
    @Body() createLessonDto: CreateLessonDto,
  ) {
    return this.lessonsService.create(courseId, createLessonDto);
  }

  @Get("courses/:courseId/lessons")
  findAllByCourse(@Param("courseId") courseId: string) {
    return this.lessonsService.findAllByCourse(courseId);
  }

  @Get("lessons/:id")
  findOne(@Param("id") id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch("lessons/:id")
  update(@Param("id") id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete("lessons/:id")
  remove(@Param("id") id: string) {
    return this.lessonsService.remove(id);
  }

  @Get("courses/:courseId/lessons/progress")
  getProgress(@Param("courseId") courseId: string) {
    return this.lessonsService.getProgress(courseId);
  }
}
