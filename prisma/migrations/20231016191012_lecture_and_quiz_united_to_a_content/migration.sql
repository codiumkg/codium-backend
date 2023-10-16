/*
  Warnings:

  - You are about to drop the column `contentTypeId` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the `ContentType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[quizId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lectureId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lectureId` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizId` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_contentTypeId_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "contentTypeId",
ADD COLUMN     "lectureId" INTEGER NOT NULL,
ADD COLUMN     "quizId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "QuizResult" ADD COLUMN     "teacherMark" TEXT;

-- DropTable
DROP TABLE "ContentType";

-- CreateIndex
CREATE UNIQUE INDEX "Content_quizId_key" ON "Content"("quizId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_lectureId_key" ON "Content"("lectureId");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
