-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userInput" VARCHAR(255) NOT NULL,
    "inputLang" VARCHAR(255) NOT NULL,
    "translation" VARCHAR(255) NOT NULL,
    "translationLang" VARCHAR(255) NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);
