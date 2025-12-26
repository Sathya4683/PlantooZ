-- CreateTable
CREATE TABLE "PlantCoordinates" (
    "plant_id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlantCoordinates_pkey" PRIMARY KEY ("plant_id")
);

-- CreateIndex
CREATE INDEX "PlantCoordinates_userId_idx" ON "PlantCoordinates"("userId");

-- AddForeignKey
ALTER TABLE "PlantCoordinates" ADD CONSTRAINT "PlantCoordinates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
