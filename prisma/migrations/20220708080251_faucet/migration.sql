-- CreateTable
CREATE TABLE "Faucet" (
    "id" SERIAL NOT NULL,
    "wallet" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "transaction_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Faucet_pkey" PRIMARY KEY ("id")
);
