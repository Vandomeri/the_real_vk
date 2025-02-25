-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "users_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateOfBirth" DATETIME NOT NULL,
    "sex" TEXT NOT NULL,
    "aboutMe" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "usersId" INTEGER NOT NULL,
    CONSTRAINT "users_profile_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "friends" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "users_profileId" INTEGER,
    "friend_id" INTEGER NOT NULL,
    CONSTRAINT "friends_users_profileId_fkey" FOREIGN KEY ("users_profileId") REFERENCES "users_profile" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "messages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "chatsId" INTEGER,
    "senderId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    CONSTRAINT "messages_chatsId_fkey" FOREIGN KEY ("chatsId") REFERENCES "chats" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_chatsTousers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_chatsTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "chats" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_chatsTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_profile_usersId_key" ON "users_profile"("usersId");

-- CreateIndex
CREATE UNIQUE INDEX "_chatsTousers_AB_unique" ON "_chatsTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_chatsTousers_B_index" ON "_chatsTousers"("B");
