-- CreateTable
CREATE TABLE "TestViews" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "TestViews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestViews" ADD CONSTRAINT "TestViews_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestViews" ADD CONSTRAINT "TestViews_testId_fkey" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
