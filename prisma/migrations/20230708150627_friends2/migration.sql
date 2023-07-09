/*
  Warnings:

  - You are about to drop the column `friendId` on the `Friend` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requestingFriendId,requestedFriendId]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requestedFriendId` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestingFriendId` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friendId_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_userId_fkey";

-- DropIndex
DROP INDEX "Friend_userId_key";

-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "friendId",
ADD COLUMN     "requestedFriendId" INTEGER NOT NULL,
ADD COLUMN     "requestingFriendId" INTEGER NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Poll" ALTER COLUMN "createdAt" SET DEFAULT NOW(),
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '24 hours';

-- CreateIndex
CREATE UNIQUE INDEX "Friend_requestingFriendId_requestedFriendId_key" ON "Friend"("requestingFriendId", "requestedFriendId");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_requestingFriendId_fkey" FOREIGN KEY ("requestingFriendId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_requestedFriendId_fkey" FOREIGN KEY ("requestedFriendId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
