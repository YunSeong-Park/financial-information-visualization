-- CreateTable
CREATE TABLE "Company" (
    "corp_code" TEXT NOT NULL,
    "corp_name" TEXT NOT NULL,
    "stock_code" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("corp_code")
);

-- CreateTable
CREATE TABLE "Report" (
    "rcept_no" TEXT NOT NULL,
    "corp_code" TEXT NOT NULL,
    "qrt" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("rcept_no")
);

-- CreateTable
CREATE TABLE "Account" (
    "report_rept_no" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "account_value" BIGINT NOT NULL,
    "sj_name" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("report_rept_no","account_name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_corp_name_key" ON "Company"("corp_name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_stock_code_key" ON "Company"("stock_code");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_corp_code_fkey" FOREIGN KEY ("corp_code") REFERENCES "Company"("corp_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_report_rept_no_fkey" FOREIGN KEY ("report_rept_no") REFERENCES "Report"("rcept_no") ON DELETE RESTRICT ON UPDATE CASCADE;
