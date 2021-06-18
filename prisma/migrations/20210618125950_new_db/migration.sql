/*
  Warnings:

  - You are about to drop the column `descrition` on the `tickets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `event_makers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "descrition",
ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "event_makers.cnpj_unique" ON "event_makers"("cnpj");
