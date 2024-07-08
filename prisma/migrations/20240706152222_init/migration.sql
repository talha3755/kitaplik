BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Profile] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [fullName] NVARCHAR(1000) NOT NULL,
    [bio] NVARCHAR(1000),
    CONSTRAINT [Profile_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Profile_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Book] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [author] NVARCHAR(1000) NOT NULL,
    [isbn] NVARCHAR(1000) NOT NULL,
    [shelfInfo] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Book_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Book_isbn_key] UNIQUE NONCLUSTERED ([isbn])
);

-- CreateTable
CREATE TABLE [dbo].[Note] (
    [id] INT NOT NULL IDENTITY(1,1),
    [content] NVARCHAR(1000) NOT NULL,
    [isPublic] BIT NOT NULL CONSTRAINT [Note_isPublic_df] DEFAULT 0,
    [userId] INT NOT NULL,
    [bookId] INT NOT NULL,
    CONSTRAINT [Note_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Share] (
    [id] INT NOT NULL IDENTITY(1,1),
    [noteId] INT NOT NULL,
    [userId] INT NOT NULL,
    [visibility] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Share_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Profile] ADD CONSTRAINT [Profile_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Note] ADD CONSTRAINT [Note_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Note] ADD CONSTRAINT [Note_bookId_fkey] FOREIGN KEY ([bookId]) REFERENCES [dbo].[Book]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Share] ADD CONSTRAINT [Share_noteId_fkey] FOREIGN KEY ([noteId]) REFERENCES [dbo].[Note]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Share] ADD CONSTRAINT [Share_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
