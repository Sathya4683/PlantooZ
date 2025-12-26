/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_clerkId_key" ON "Users"("clerkId");
