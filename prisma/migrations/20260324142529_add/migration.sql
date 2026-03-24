/*
  Warnings:

  - A unique constraint covering the columns `[tutorId]` on the table `AvailabilitySlots` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AvailabilitySlots_tutorId_key" ON "AvailabilitySlots"("tutorId");
