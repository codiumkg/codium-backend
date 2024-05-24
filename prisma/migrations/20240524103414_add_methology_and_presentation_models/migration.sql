-- CreateTable
CREATE TABLE "Methodology" (
    "id" SERIAL NOT NULL,
    "filePath" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "Methodology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presentation" (
    "id" SERIAL NOT NULL,
    "filePath" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Methodology" ADD CONSTRAINT "Methodology_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presentation" ADD CONSTRAINT "Presentation_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
