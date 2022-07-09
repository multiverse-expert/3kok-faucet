/*
  Warnings:

  - A unique constraint covering the columns `[wallet]` on the table `Faucet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Faucet" ALTER COLUMN "transaction_at" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Faucet_wallet_key" ON "Faucet"("wallet");
