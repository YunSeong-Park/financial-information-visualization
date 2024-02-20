/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("report_rept_no", "account_name", "sj_name");
