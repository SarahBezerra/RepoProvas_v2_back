import { prisma } from "../database.js";

async function findMany(disciplineId: number) {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
    }, where: {
      disciplineId,
    }
  });
}

async function findTeacherByName(teacherName: string) {
  return prisma.teacher.findUnique({
    where: {
      name: teacherName,
    }
  });
}

async function findTeacherDiscipline(teacherId: number, disciplineId: number) {
  return prisma.teacherDiscipline.findFirst({
    where: {
      teacherId,
      disciplineId,
    }
  });
}

export default {
  findMany,
  findTeacherByName,
  findTeacherDiscipline,
};
