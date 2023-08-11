/*
  Warnings:

  - Made the column `image` on table `PollOption` required. This step will fail if there are existing NULL values in that column.
  - Made the column `response` on table `Response` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PollOption" DROP CONSTRAINT "PollOption_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_pollId_fkey";

-- AlterTable
ALTER TABLE "PollOption" ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "response" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PollOption" ADD CONSTRAINT "PollOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;
