/*
  Warnings:

  - You are about to drop the column `isDonar` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "isDonar",
ADD COLUMN     "isDonor" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "availability" SET DEFAULT true;
