import { prisma } from "../database.js";

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
        },
      },
    },
  });
}

export default {
  getTestsByDiscipline,
  getTestsByFilteredDiscipline,
  getTestsByTeachers,
  getTestsByFilteredTeachers,
};
