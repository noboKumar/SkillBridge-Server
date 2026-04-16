/*
  Warnings:

  - You are about to drop the `booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tutorProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AvailabilitySlots" DROP CONSTRAINT "AvailabilitySlots_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_slotId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_studentId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_studentId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "tutorProfile" DROP CONSTRAINT "tutorProfile_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "tutorProfile" DROP CONSTRAINT "tutorProfile_userId_fkey";

-- DropTable
DROP TABLE "booking";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "review";

-- DropTable
DROP TABLE "tutorProfile";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "profilePhoto" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorProfiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT,
    "bio" TEXT NOT NULL,
    "hourlyRate" INTEGER NOT NULL DEFAULT 0,
    "experienceYears" INTEGER NOT NULL,
    "ratingAverage" DOUBLE PRECISION,
    "totalReview" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'CONFIRMED',
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Users_role_idx" ON "Users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "TutorProfiles_userId_key" ON "TutorProfiles"("userId");

-- CreateIndex
CREATE INDEX "TutorProfiles_userId_idx" ON "TutorProfiles"("userId");

-- CreateIndex
CREATE INDEX "TutorProfiles_categoryId_idx" ON "TutorProfiles"("categoryId");

-- CreateIndex
CREATE INDEX "Bookings_studentId_idx" ON "Bookings"("studentId");

-- CreateIndex
CREATE INDEX "Bookings_tutorId_idx" ON "Bookings"("tutorId");

-- CreateIndex
CREATE INDEX "Bookings_slotId_idx" ON "Bookings"("slotId");

-- CreateIndex
CREATE INDEX "Bookings_status_idx" ON "Bookings"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_bookingId_key" ON "Reviews"("bookingId");

-- CreateIndex
CREATE INDEX "Reviews_studentId_idx" ON "Reviews"("studentId");

-- CreateIndex
CREATE INDEX "Reviews_tutorId_idx" ON "Reviews"("tutorId");

-- AddForeignKey
ALTER TABLE "TutorProfiles" ADD CONSTRAINT "TutorProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorProfiles" ADD CONSTRAINT "TutorProfiles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailabilitySlots" ADD CONSTRAINT "AvailabilitySlots_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "AvailabilitySlots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
