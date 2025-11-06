/*
  Warnings:

  - A unique constraint covering the columns `[userId,date,subject]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attendance_userId_date_subject_key" ON "public"."Attendance"("userId", "date", "subject");
