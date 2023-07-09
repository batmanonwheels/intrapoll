/*
  Warnings:

  - Made the column `response` on table `Response` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "options" TEXT[],
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '24 hours',
ALTER COLUMN "expiresAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "response" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "longestStreak" INTEGER NOT NULL DEFAULT 0;
