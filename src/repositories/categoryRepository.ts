import { prisma } from "../database.js";

async function findMany() {
  return prisma.category.findMany();
}

async function findByName(name: string) {
  return prisma.category.findUnique({
    where: {
      name,
    }
  });
}

export default {
  findMany,
  findByName,
};
