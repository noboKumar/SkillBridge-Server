-- DropForeignKey
ALTER TABLE "tutorProfile" DROP CONSTRAINT "tutorProfile_categoryId_fkey";

-- AlterTable
ALTER TABLE "tutorProfile" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tutorProfile" ADD CONSTRAINT "tutorProfile_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
