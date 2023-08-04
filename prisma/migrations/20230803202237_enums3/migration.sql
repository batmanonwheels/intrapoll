/*
  Warnings:

  - The values [Requested,Accepted,Declined,Blocked] on the enum `FriendStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [ONE,TWO,THREE,FOUR,FIVE,SIX] on the enum `PollOption` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FriendStatus_new" AS ENUM ('requested', 'accepted', 'declined', 'blocked');
ALTER TABLE "Friend" ALTER COLUMN "status" TYPE "FriendStatus_new" USING ("status"::text::"FriendStatus_new");
ALTER TYPE "FriendStatus" RENAME TO "FriendStatus_old";
ALTER TYPE "FriendStatus_new" RENAME TO "FriendStatus";
DROP TYPE "FriendStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PollOption_new" AS ENUM ('one', 'two', 'three', 'four');
ALTER TABLE "Response" ALTER COLUMN "option" TYPE "PollOption_new" USING ("option"::text::"PollOption_new");
ALTER TYPE "PollOption" RENAME TO "PollOption_old";
ALTER TYPE "PollOption_new" RENAME TO "PollOption";
DROP TYPE "PollOption_old";
COMMIT;
