import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateLessonDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
