/*
  Warnings:

  - You are about to drop the column `transaction_hash` on the `Faucet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Faucet" DROP COLUMN "transaction_hash",
ADD COLUMN     "nft_transaction_hash" TEXT,
ADD COLUMN     "token_transaction_hash" TEXT;
