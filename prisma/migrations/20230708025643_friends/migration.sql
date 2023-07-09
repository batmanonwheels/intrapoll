/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Made the column `bio` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('Requested', 'Accepted', 'Declined', 'Blocked');

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_userId_fkey";

-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "status" "FriendStatus",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Poll" ALTER COLUMN "createdAt" SET DEFAULT NOW(),
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '24 hours';

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "response" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "bio" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Friend_userId_key" ON "Friend"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
