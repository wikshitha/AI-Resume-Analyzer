-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "jobDescription" TEXT,
ADD COLUMN     "jobMatchScore" INTEGER,
ADD COLUMN     "keywordCoverage" INTEGER,
ADD COLUMN     "matchedSkills" TEXT[],
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "weaknesses" TEXT[];
