/*
  Warnings:

  - Made the column `topicId` on table `Quiz` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "topicId" SET NOT NULL;
