import testRepository from "../repositories/testRepository.js";
import userRepository from '../repositories/userRepository.js';
import { ViewTest } from '../repositories/testRepository.js';
import { notFoundError, conflictError } from '../utils/errorUtils.js';

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

async function addView({ userId, testId }: ViewTest) {
  const user = await userRepository.findById(userId);
  if (!user) throw notFoundError("User not found");

  const test = await testRepository.findTestById(testId);
  if (!test) throw notFoundError("Test not found");

  const testAlreadyViewed = await testRepository.findTestView({userId, testId});
  if (testAlreadyViewed) throw conflictError("Test alreday viewed");
  
  await testRepository.insertTestView({userId, testId});
}

export default {
  find,
  addView,
};
