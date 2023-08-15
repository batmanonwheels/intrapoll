-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_addresseeId_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_requesterId_fkey";

-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "totalVotes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PollOption" ADD COLUMN     "votes" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_addresseeId_fkey" FOREIGN KEY ("addresseeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
