/*
  Warnings:

  - The primary key for the `_CardCompanyToCountry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `card_companies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `card_companies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `A` on the `_CardCompanyToCountry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_CardCompanyToCountry" DROP CONSTRAINT "_CardCompanyToCountry_A_fkey";

-- AlterTable
ALTER TABLE "_CardCompanyToCountry" DROP CONSTRAINT "_CardCompanyToCountry_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
ADD CONSTRAINT "_CardCompanyToCountry_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "card_companies" DROP CONSTRAINT "card_companies_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "card_companies_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "_CardCompanyToCountry" ADD CONSTRAINT "_CardCompanyToCountry_A_fkey" FOREIGN KEY ("A") REFERENCES "card_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
