-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "correctAnswerExplanation" TEXT;

-- AlterTable
ALTER TABLE "TaskUserAnswer" ADD COLUMN     "answerId" INTEGER;

-- AddForeignKey
ALTER TABLE "TaskUserAnswer" ADD CONSTRAINT "TaskUserAnswer_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
