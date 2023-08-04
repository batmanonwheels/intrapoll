/*
  Warnings:

  - The values [LIGHT,DARK,SYSTEM] on the enum `Theme` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Theme_new" AS ENUM ('light', 'dark', 'system');
ALTER TABLE "UserSettings" ALTER COLUMN "theme" DROP DEFAULT;
ALTER TABLE "UserSettings" ALTER COLUMN "theme" TYPE "Theme_new" USING ("theme"::text::"Theme_new");
ALTER TYPE "Theme" RENAME TO "Theme_old";
ALTER TYPE "Theme_new" RENAME TO "Theme";
DROP TYPE "Theme_old";
ALTER TABLE "UserSettings" ALTER COLUMN "theme" SET DEFAULT 'system';
COMMIT;

-- AlterTable
ALTER TABLE "UserSettings" ALTER COLUMN "theme" SET DEFAULT 'system';
