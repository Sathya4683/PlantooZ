-- CreateTable
CREATE TABLE "Items" (
    "item_id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("item_id")
);
