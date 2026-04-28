-- CreateEnum
CREATE TYPE "PublicationType" AS ENUM ('ARTICLE', 'NEWSLETTER', 'OFFICIAL_LETTER', 'PODCAST');

-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "category" "PublicationType" NOT NULL,
    "imageUrl" TEXT,
    "images" TEXT[],
    "fileUrl" TEXT,
    "audioUrl" TEXT,
    "tags" TEXT[],
    "author" TEXT,
    "duration" INTEGER,
    "fileSize" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Publication_createdById_idx" ON "Publication"("createdById");

-- CreateIndex
CREATE INDEX "Publication_createdAt_idx" ON "Publication"("createdAt");

-- CreateIndex
CREATE INDEX "Publication_category_idx" ON "Publication"("category");

-- CreateIndex
CREATE INDEX "Publication_published_category_idx" ON "Publication"("published", "category");

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
