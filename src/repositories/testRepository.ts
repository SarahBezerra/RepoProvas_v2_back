import { prisma } from "../database.js";
import { Test, TestViews} from "@prisma/client";

export type CreateTest = Omit<Test, "id">;
export type createViewTest = Omit<TestViews, "id">;

async function findTestById(testId: number) {
  return prisma.test.findMany({
    where: {
      id: testId
    }
  });
}

async function getTestsByDiscipline() {
  return prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                  testView: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByFilteredDiscipline(filterDiscipline: string) {
  return prisma.term.findMany({
    include: {
      disciplines: {
        where: { 
          name: { 
            contains: filterDiscipline,
            mode: "insensitive"
          } 
        },
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                  testView: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
          testView: true,
        },
      },
    },
  });
}

async function getTestsByFilteredTeachers(filterTeacher: string) {
  return prisma.teacherDiscipline.findMany({
    where: {
      teacher: {
        name: { 
          contains: filterTeacher,
          mode: "insensitive"
        } 
      }
    },
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
          testView: true,
        },
      },
    },
  });
}


async function findTestView({ userId, testId }: createViewTest) {
  return prisma.testViews.findFirst({
    where: {
      testId,
      userId
    }
  });
}

async function insertTestView({ userId, testId }: createViewTest) {
  return prisma.testViews.create({
    data: {
      userId,
      testId
    }
  });
}

async function createTest({ name, pdfUrl, categoryId, teacherDisciplineId }: CreateTest) {
  return prisma.test.create({
    data: {
      name,
      pdfUrl,
      categoryId,
      teacherDisciplineId,
    }
  });
}

export default {
  findTestById,
  getTestsByDiscipline,
  getTestsByFilteredDiscipline,
  getTestsByTeachers,
  getTestsByFilteredTeachers,
  findTestView,
  insertTestView,
  createTest,
};
