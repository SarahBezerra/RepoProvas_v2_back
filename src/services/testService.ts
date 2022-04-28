import testRepository from "../repositories/testRepository.js";

interface Filter {
  groupBy: "disciplines" | "teachers",
  filterDiscipline: string,
  filterTeacher: string,
}

async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    if(filter.filterDiscipline){
      return testRepository.getTestsByFilteredDiscipline(filter.filterDiscipline);
    } else {
      return testRepository.getTestsByDiscipline();
    }
  } else if (filter.groupBy === "teachers") {
    if(filter.filterTeacher){
      return testRepository.getTestsByFilteredTeachers(filter.filterTeacher);
    } else {
      return testRepository.getTestsByTeachers();
    }
  }
}

export default {
  find,
};
