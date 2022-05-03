import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";

export async function createPreDefinedDataFactory() {
  
  await prisma.$executeRaw`
    TRUNCATE TABLE 
      tests, 
      teachers, 
      terms, 
      disciplines, 
      categories, 
      "TeacherDiscipline", 
      "TestViews";
  `;

  const teacher = await prisma.teacher.create({
    data: {
      name: faker.name.firstName()
    }
  });

  await prisma.term.create({
    data: {
      number: 1
    }
  });

  const term = await prisma.term.findUnique({
    where: {
      number: 1
    }
  });

  const discipline = await prisma.discipline.create({
    data: {
      name: faker.random.words(1),
      termId: term.id
    }
  });
  
  const category = await prisma.category.create({
    data: {
      name: "P1"
    }
  });
  
  await prisma.teacherDiscipline.create({
    data: {
      teacherId: teacher.id,
      disciplineId: discipline.id
    }
  });

  return { teacher, category, discipline };
}