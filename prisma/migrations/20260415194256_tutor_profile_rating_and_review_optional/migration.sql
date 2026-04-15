/*
  Warnings:

  - You are about to drop the column `reviewsId` on the `review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "review" DROP COLUMN "reviewsId";

-- AlterTable
ALTER TABLE "tutorProfile" ALTER COLUMN "ratingAverage" DROP NOT NULL,
ALTER COLUMN "totalReview" DROP NOT NULL;
