/*
  Warnings:

  - You are about to drop the column `requestedFriendId` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Friend` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requesterId,addresseeId]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addresseeId` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterId` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_requestedFriendId_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_userId_fkey";

-- DropIndex
DROP INDEX "Friend_userId_requestedFriendId_key";

-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "requestedFriendId",
DROP COLUMN "userId",
ADD COLUMN     "addresseeId" INTEGER NOT NULL,
ADD COLUMN     "requesterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Poll" ALTER COLUMN "createdAt" SET DEFAULT NOW(),
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '24 hours';

-- CreateIndex
CREATE UNIQUE INDEX "Friend_requesterId_addresseeId_key" ON "Friend"("requesterId", "addresseeId");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_addresseeId_fkey" FOREIGN KEY ("addresseeId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
