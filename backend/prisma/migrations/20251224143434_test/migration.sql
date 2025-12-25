-- CreateTable
CREATE TABLE "Test" (
    "item_id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("item_id")
);
