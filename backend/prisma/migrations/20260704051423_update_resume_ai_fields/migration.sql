/*
  Warnings:

  - The `strengths` column on the `Resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `missingSkills` column on the `Resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `suggestions` column on the `Resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "strengths",
ADD COLUMN     "strengths" TEXT[],
DROP COLUMN "missingSkills",
ADD COLUMN     "missingSkills" TEXT[],
DROP COLUMN "suggestions",
ADD COLUMN     "suggestions" TEXT[];
