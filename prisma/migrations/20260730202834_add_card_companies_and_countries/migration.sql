-- CreateEnum
CREATE TYPE "KycRequirement" AS ENUM ('REQUIRED', 'NOT_REQUIRED', 'UNKNOWN');

-- CreateTable
CREATE TABLE "countries" (
    "code" CHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "card_companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "website_url" TEXT NOT NULL,
    "referral_url" TEXT,
    "logo_url" TEXT NOT NULL,
    "kyc_requirement" "KycRequirement" NOT NULL DEFAULT 'UNKNOWN',
    "virtual_card" BOOLEAN NOT NULL DEFAULT true,
    "physical_card" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "card_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardCompanyToCountry" (
    "A" TEXT NOT NULL,
    "B" CHAR(2) NOT NULL,

    CONSTRAINT "_CardCompanyToCountry_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "card_companies_name_key" ON "card_companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "card_companies_slug_key" ON "card_companies"("slug");

-- CreateIndex
CREATE INDEX "_CardCompanyToCountry_B_index" ON "_CardCompanyToCountry"("B");

-- AddForeignKey
ALTER TABLE "_CardCompanyToCountry" ADD CONSTRAINT "_CardCompanyToCountry_A_fkey" FOREIGN KEY ("A") REFERENCES "card_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardCompanyToCountry" ADD CONSTRAINT "_CardCompanyToCountry_B_fkey" FOREIGN KEY ("B") REFERENCES "countries"("code") ON DELETE CASCADE ON UPDATE CASCADE;
