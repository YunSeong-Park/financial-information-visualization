import { prismaClient } from "./sql-service.const";

const deleteAll = async () => {
  await prismaClient.account.deleteMany();
  await prismaClient.report.deleteMany();
  await prismaClient.company.deleteMany();
};

export default deleteAll;
