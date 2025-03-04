-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_friends" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "friend_id" INTEGER NOT NULL,
    "usersId" INTEGER,
    "isAproved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "friends_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_friends" ("friend_id", "id", "usersId") SELECT "friend_id", "id", "usersId" FROM "friends";
DROP TABLE "friends";
ALTER TABLE "new_friends" RENAME TO "friends";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
