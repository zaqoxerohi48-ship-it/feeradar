/*
  Warnings:

  - You are about to drop the column `createdAt` on the `email_verification_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `email_verification_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `tokenHash` on the `email_verification_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `usedAt` on the `email_verification_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `email_verification_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerifiedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token_hash]` on the table `email_verification_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires_at` to the `email_verification_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_hash` to the `email_verification_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `email_verification_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "email_verification_tokens" DROP CONSTRAINT "email_verification_tokens_userId_fkey";

-- DropIndex
DROP INDEX "email_verification_tokens_tokenHash_key";

-- DropIndex
DROP INDEX "email_verification_tokens_userId_idx";

-- AlterTable
ALTER TABLE "email_verification_tokens" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "tokenHash",
DROP COLUMN "usedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "token_hash" TEXT NOT NULL,
ADD COLUMN     "used_at" TIMESTAMP(3),
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "emailVerifiedAt",
DROP COLUMN "passwordHash",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email_verified_at" TIMESTAMP(3),
ADD COLUMN     "password_hash" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_tokens_token_hash_key" ON "email_verification_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "email_verification_tokens_user_id_idx" ON "email_verification_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
