-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "userId" INTEGER,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_posts" ("created", "id", "image", "text", "userId") SELECT "created", "id", "image", "text", "userId" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
