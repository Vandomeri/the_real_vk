/*
  Warnings:

  - You are about to drop the column `usersId` on the `friends` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_friends" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "friendId" INTEGER NOT NULL,
    "userId" INTEGER,
    "isAproved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "friends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "friends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_friends" ("friendId", "id", "isAproved") SELECT "friendId", "id", "isAproved" FROM "friends";
DROP TABLE "friends";
ALTER TABLE "new_friends" RENAME TO "friends";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
