/*
  Warnings:

  - You are about to drop the column `friend_id` on the `friends` table. All the data in the column will be lost.
  - Added the required column `friendId` to the `friends` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_friends" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "friendId" INTEGER NOT NULL,
    "usersId" INTEGER,
    "isAproved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "friends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "friends_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_friends" ("id", "isAproved", "usersId") SELECT "id", "isAproved", "usersId" FROM "friends";
DROP TABLE "friends";
ALTER TABLE "new_friends" RENAME TO "friends";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
