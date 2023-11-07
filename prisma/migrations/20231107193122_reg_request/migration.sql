-- CreateTable
CREATE TABLE "RegRequest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "RegRequest_pkey" PRIMARY KEY ("id")
);
