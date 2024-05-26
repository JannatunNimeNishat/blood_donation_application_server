/*
  Warnings:

  - You are about to drop the column `isDonor` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "isDonor",
ADD COLUMN     "isDonar" BOOLEAN NOT NULL DEFAULT false;
