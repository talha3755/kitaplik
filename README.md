# Kitaplık Projesi

Bu proje, kullanıcıların kitapları yönetmesine, notlar eklemesine ve bu notları paylaşmasına olanak tanıyan bir kitaplık uygulamasıdır. Proje Node.js, Express.js ve Prisma ORM kullanılarak geliştirilmiştir ve MSSQL Server veritabanı kullanmaktadır.

## Kurulum

### Gerekli Yazılımlar

- Node.js
- npm
- MSSQL Server
- Git
- Prisma

.
├── src
│   ├── controllers
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   └── noteController.js
│   ├── middlewares
│   │   └── errorHandler.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   └── noteRoutes.js
│   ├── services
│   └── utils
│   │   └── swagger.js
│   │
│   └──  authController.test.js
│   └──  bookController.test.js
│   └──  noteController.test.js
├── prisma
│   ├── schema.prisma
├── uploads
├── .env
├── app.js
├── package.json
└── server.js



### Adımlar

1. **Repository'yi Klonlayın:**
   ```bash
   git clone https://github.com/talha3755/kitaplik.git
   cd REPOSITORY_NAME

2. **Postman üzerinde sonuçlar ve Test Sonuçları bu dosyada mevcuttur:**
   ```bash
   kitap uygulaması



   ### Kullanıcı Yönetimi

- **POST /auth/register**
  - Açıklama: Yeni bir kullanıcı kaydı oluşturur.
  - Body Parameters:
    - `username`: String
    - `email`: String
    - `password`: String

- **POST /auth/login**
  - Açıklama: Kullanıcı girişi yapar.
  - Body Parameters:
    - `email`: String
    - `password`: String

### Kitap Yönetimi

- **POST /books**
  - Açıklama: Yeni bir kitap ekler.
  - Body Parameters:
    - `title`: String
    - `author`: String
    - `isbn`: String
    - `shelfInfo`: String
    - `cover`: File

- **GET /books**
  - Açıklama: Tüm kitapları listeler.

- **PUT /books/:id**
  - Açıklama: Belirtilen ID'ye sahip kitabı günceller.
  - URL Parameters:
    - `id`: Kitabın ID'si
  - Body Parameters:
    - `title`: String
    - `author`: String
    - `isbn`: String
    - `shelfInfo`: String
    - `cover`: File

- **DELETE /books/:id**
  - Açıklama: Belirtilen ID'ye sahip kitabı siler.
  - URL Parameters:
    - `id`: Kitabın ID'si

### Not Yönetimi

- **POST /notes**
  - Açıklama: Yeni bir not ekler.
  - Body Parameters:
    - `content`: String
    - `isPublic`: Boolean
    - `bookId`: Integer

- **PUT /notes/:id**
  - Açıklama: Belirtilen ID'ye sahip notu günceller.
  - URL Parameters:
    - `id`: Notun ID'si
  - Body Parameters:
    - `content`: String
    - `isPublic`: Boolean

- **DELETE /notes/:id**
  - Açıklama: Belirtilen ID'ye sahip notu siler.
  - URL Parameters:
    - `id`: Notun ID'si

- **POST /notes/:id/share**
  - Açıklama: Belirtilen ID'ye sahip notu paylaşır.
  - URL Parameters:
    - `id`: Notun ID'si
  - Body Parameters:
    - `userId`: Integer
    - `visibility`: String (public, private, friends)
   
# Testleri çalıştırmak için
npm test

# Test sonuçları
Test sonuçları proje dizininde `coverage` klasöründe bulunacaktır.


