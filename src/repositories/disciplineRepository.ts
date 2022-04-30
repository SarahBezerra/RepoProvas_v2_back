import { prisma } from "../database.js";

async function findMany() {
  return prisma.discipline.findMany({
    select:{
      id: true, 
      name: true,
    }
  });
}

async function findDisciplineByName(disciplineName: string) {
  return prisma.discipline.findUnique({
    where: {
      name: disciplineName,
    }
  });
}

export default {
  findMany,
  findDisciplineByName,
};
