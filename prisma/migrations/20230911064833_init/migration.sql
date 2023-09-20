/*
  Warnings:

  - Made the column `professional_level` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "professional_level" SET NOT NULL;
