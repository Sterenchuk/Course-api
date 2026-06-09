# Implementation Plan: Prisma Setup and Layered CRUD

## Objective
Install Prisma v6.9.0, configure it for the project, define the data schema (User, Course, Lesson), and implement a layered CRUD architecture (Controllers, Services/Repositories, DTOs, Types) in the NestJS backend.

## Scope & Impact
- Installation of `@prisma/client` and `prisma` CLI.
- Database schema modeling within the `backend/` directory.
- Integration of Prisma Service within the NestJS `backend/` module.
- Implementation of modular CRUD structure for Users, Courses, and Lessons within the `backend/src/` directory.

## Implementation Steps

### Phase 1: Installation & Prisma Init
1. Set context to `/home/sanses/Public/Course-api/backend/`.
2. Install `prisma` (dev) and `@prisma/client`.
3. Run `npx prisma init`.
4. Configure `schema.prisma` with User, Course, and Lesson models.
5. Add environment variables to `backend/.env`.

### Phase 2: Prisma Service Integration
1. Create `backend/src/prisma/prisma.service.ts`.
2. Register `PrismaService` in `backend/src/app.module.ts`.

### Phase 3: Modular CRUD Implementation
1. For each module (Users, Courses, Lessons):
   - Generate NestJS resource modules inside `backend/src/`.
   - Organize files according to the requested structure:
     ```
     backend/src/module/
       - types/
       - dto/
       - module.ts
       - controller.ts
       - service.ts
     ```
   - Implement CRUD operations in `service.ts` (acting as repository).
   - Define `dto` and `types`.

## Verification & Testing
- Verify database migration completes successfully from `backend/`.
- Test CRUD endpoints (Create, Read, Update, Delete) via API calls.
- Verify progress calculation logic in Lessons/Course service.
