-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "opening_hours" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "sector_uuid" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sector_description_key" ON "Sector"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_sector_uuid_fkey" FOREIGN KEY ("sector_uuid") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
