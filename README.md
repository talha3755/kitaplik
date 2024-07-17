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



### Amaç

# Proje Özeti

Bu proje, kullanıcıların kitapları yönetebileceği, notlar alabileceği ve bu notları diğer kullanıcılarla paylaşabileceği bir web uygulamasıdır. Uygulama, kullanıcı yönetimi, kitap yönetimi, not alma sistemi ve paylaşım sistemi gibi ana özelliklere sahiptir.

## Ana Özellikler

### 1. Kullanıcı Yönetimi
- **Kayıt (Register)**
- **Giriş (Login)**
- **Profil yönetimi**

### 2. Kitap Yönetimi
- **Kitap ekleme, düzenleme, silme**
- **Detaylı raf yeri bilgisi girişi**
- **Kitap arama ve filtreleme**

### 3. Not Alma Sistemi
- **Kitaplarla ilgili not ekleme, düzenleme, silme**
- **Notları özel veya paylaşımlı olarak işaretleme**

### 4. Paylaşım Sistemi
- **Kitap notlarını diğer kullanıcılarla paylaşma**
- **Paylaşım gizlilik ayarları (herkese açık, sadece arkadaşlar, özel)**

## Teknik Gereksinimler

1. **Node.js ve Express.js kullanarak RESTful API geliştirme**
2. **MSSQL veritabanı kullanımı ve Prisma ORM entegrasyonu**
3. **JWT tabanlı kimlik doğrulama ve yetkilendirme sistemi**
4. **Dosya yükleme için multer veya benzeri bir middleware kullanımı (kitap kapakları için)**
5. **Veritabanı ilişkilerinin doğru yönetimi (one-to-many, many-to-many)**
6. **İş mantığının servis katmanında uygulanması**
7. **Hata yönetimi ve loglama**
8. **Birim testleri ve entegrasyon testleri**
9. **API dokümantasyonu (Swagger/OpenAPI)**
10. **Güvenlik önlemleri (input validasyonu, sanitizasyon, rate limiting)**

## Kullanım

1. **Kullanıcı Yönetimi:**
    - Kullanıcılar, uygulamaya kayıt olabilir, giriş yapabilir ve profil bilgilerini yönetebilir.
  
2. **Kitap Yönetimi:**
    - Kullanıcılar kitap ekleyebilir, düzenleyebilir ve silebilir. Ayrıca, kitapların raf yeri bilgilerini detaylı bir şekilde girebilir ve kitapları arayıp filtreleyebilir.
  
3. **Not Alma Sistemi:**
    - Kullanıcılar, kitaplarla ilgili notlar ekleyebilir, düzenleyebilir ve silebilir. Notları özel veya paylaşımlı olarak işaretleyebilir.
  
4. **Paylaşım Sistemi:**
    - Kullanıcılar, kitap notlarını diğer kullanıcılarla paylaşabilir ve paylaşım gizlilik ayarlarını (herkese açık, sadece arkadaşlar, özel) belirleyebilir.

## Geliştirme

1. **API Geliştirme:**
    - Node.js ve Express.js kullanarak RESTful API geliştirilir.
  
2. **Veritabanı:**
    - MSSQL veritabanı kullanılır ve Prisma ORM ile entegre edilir.
  
3. **Kimlik Doğrulama:**
    - JWT tabanlı kimlik doğrulama ve yetkilendirme sistemi uygulanır.
  
4. **Dosya Yükleme:**
    - Multer veya benzeri bir middleware kullanılarak dosya yükleme işlemleri gerçekleştirilir.
  
5. **Veritabanı İlişkileri:**
    - One-to-many ve many-to-many ilişkileri doğru yönetilir.
  
6. **Servis Katmanı:**
    - İş mantığı servis katmanında uygulanır.
  
7. **Hata Yönetimi:**
    - Hata yönetimi ve loglama yapılır.
  
8. **Testler:**
    - Birim testleri ve entegrasyon testleri yazılır.
  
9. **API Dokümantasyonu:**
    - API dokümantasyonu Swagger/OpenAPI ile yapılır.
  
10. **Güvenlik:**
    - Input validasyonu, sanitizasyon ve rate limiting gibi güvenlik önlemleri alınır.




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


