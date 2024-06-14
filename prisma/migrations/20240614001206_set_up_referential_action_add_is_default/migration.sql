-- DropForeignKey
ALTER TABLE "CategoriesOnFavorites" DROP CONSTRAINT "CategoriesOnFavorites_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnFavorites" DROP CONSTRAINT "CategoriesOnFavorites_favoriteId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "CategoriesOnFavorites" ADD CONSTRAINT "CategoriesOnFavorites_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnFavorites" ADD CONSTRAINT "CategoriesOnFavorites_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
