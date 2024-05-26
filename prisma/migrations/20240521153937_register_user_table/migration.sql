/*
  Warnings:

  - Added the required column `isDonor` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isDonor" BOOLEAN NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
