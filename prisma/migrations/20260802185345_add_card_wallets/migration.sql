-- AlterTable
ALTER TABLE "card_companies" ADD COLUMN     "apple_pay" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "google_pay" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "master_card" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visa_card" BOOLEAN NOT NULL DEFAULT false;
