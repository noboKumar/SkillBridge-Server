/*
  Warnings:

  - Changed the type of `daysOfWeek` on the `AvailabilitySlots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- AlterTable
ALTER TABLE "AvailabilitySlots" DROP COLUMN "daysOfWeek",
ADD COLUMN     "daysOfWeek" "DayOfWeek" NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "reviewsId" TEXT;
