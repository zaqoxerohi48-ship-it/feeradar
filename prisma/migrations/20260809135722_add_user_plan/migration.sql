/*
  Warnings:

  - You are about to drop the column `plan` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "plan",
ADD COLUMN     "plan_id" INTEGER;

-- CreateTable
CREATE TABLE "plans" (
    "id" SERIAL NOT NULL,
    "code" "UserPlan" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price_cents" INTEGER NOT NULL,
    "features" TEXT[],
    "most_popular" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plans_code_key" ON "plans"("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
