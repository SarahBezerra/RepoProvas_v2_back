/*
  Warnings:

  - You are about to drop the column `UserId` on the `TestViews` table. All the data in the column will be lost.
  - Added the required column `userId` to the `TestViews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TestViews" DROP CONSTRAINT "TestViews_UserId_fkey";

-- AlterTable
ALTER TABLE "TestViews" DROP COLUMN "UserId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TestViews" ADD CONSTRAINT "TestViews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
