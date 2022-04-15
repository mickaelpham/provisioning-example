-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('FREEMIUM', 'TEAM', 'BUSINESS', 'ENTERPRISE');

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "memberships" INTEGER,
ADD COLUMN     "plan" "SubscriptionPlan" NOT NULL DEFAULT E'FREEMIUM';
