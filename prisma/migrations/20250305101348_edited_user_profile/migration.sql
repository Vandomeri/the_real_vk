-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "avatar" TEXT DEFAULT 'defaultAvatar.png',
    "dateOfBirth" DATETIME,
    "sex" TEXT NOT NULL,
    "aboutMe" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" TEXT DEFAULT '',
    "usersId" INTEGER NOT NULL,
    CONSTRAINT "users_profile_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users_profile" ("aboutMe", "avatar", "city", "country", "dateOfBirth", "id", "sex", "status", "usersId") SELECT "aboutMe", "avatar", "city", "country", "dateOfBirth", "id", "sex", "status", "usersId" FROM "users_profile";
DROP TABLE "users_profile";
ALTER TABLE "new_users_profile" RENAME TO "users_profile";
CREATE UNIQUE INDEX "users_profile_usersId_key" ON "users_profile"("usersId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
