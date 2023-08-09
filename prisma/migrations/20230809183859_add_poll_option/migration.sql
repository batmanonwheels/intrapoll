/*
  Warnings:

  - You are about to drop the column `options` on the `Poll` table. All the data in the column will be lost.
  - Changed the type of `option` on the `Response` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PollOptionNumber" AS ENUM ('one', 'two', 'three', 'four', 'five', 'six');

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "options";

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "option",
ADD COLUMN     "option" "PollOptionNumber" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "PollOption";

-- CreateTable
CREATE TABLE "PollOption" (
    "id" SERIAL NOT NULL,
    "choice" TEXT NOT NULL,
    "image" TEXT,
    "pollId" INTEGER NOT NULL,

    CONSTRAINT "PollOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PollOption" ADD CONSTRAINT "PollOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
