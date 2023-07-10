/*
  Warnings:

  - You are about to drop the column `requestingFriendId` on the `Friend` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,requestedFriendId]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_requestingFriendId_fkey";

-- DropIndex
DROP INDEX "Friend_requestingFriendId_requestedFriendId_key";

-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "requestingFriendId";

-- AlterTable
ALTER TABLE "Poll" ALTER COLUMN "createdAt" SET DEFAULT NOW(),
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '24 hours';

-- CreateIndex
CREATE UNIQUE INDEX "Friend_userId_requestedFriendId_key" ON "Friend"("userId", "requestedFriendId");
