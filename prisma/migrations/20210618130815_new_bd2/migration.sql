/*
  Warnings:

  - Added the required column `is_verified` to the `event_makers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_verified` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event_makers" ADD COLUMN     "is_verified" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_verified" BOOLEAN NOT NULL;
