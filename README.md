# HWA-NodeJS-Redis-Caching

Bu proje, Node.js kullanarak geliştirilmiş bir RESTful API'yi ve çeşitli yapıları içerir. Temel amaç, middleware, redil ile önbellek (cache) yönetimi ve loglama gibi yapıların nasıl kullanılacağını göstermektir.

<img src="https://www.aihr.com/wp-content/uploads/performance-management-cover.png" width="1000" height="553" alt="">

## Kurulum
1. Repoyu klonlayın: git clone https://github.com/mustafaalpyanikoglu/HWA-NodeJS-MemoryCache-And-Logging.git
2. Proje dizinine gidin: cd nodejs-cache-api
3. Bağımlılıkları yükleyin: npm install
4. Projeyi başlatın: node app.js

## Çalıştırma
Proje başlatıldığında, belirtilen ortam değişkenlerine göre bir Express sunucusu başlatılır. Varsayılan olarak 3000 portunda çalışır.

Projede Redis kullanmak için öncelikle bir Redis sunucusuna ihtiyacınız olacaktır. Kendi sunucunuzu kullanmak için Redis'in resmi web sitesinden veya bulut tabanlı bir hizmet sağlayıcısından bir Redis sunucusu oluşturabilirsiniz.
Ardından, projenizin `.env` dosyasındaki Redis bağlantı dizesini tanımlamanız gerekmektedir. Örneğin:

```json
# Bu dosya, çevresel değişkenlerin tanımlarını içerir.

# Sunucunun host adresi ve port numarası
HOST_NAME = "127.0.0.1"
PORT = 3000

# Sunucunun çalışma ortamı (development, production, test vb.)
NODE_ENV = development

# Redis sunucusu için bağlantı bilgileri
# Not: REDIS_CLOUD_URL kullanılacaksa, REDIS_USER_NAME ve REDIS_SLIDING_EXPIRE ayarları atlanmalıdır.
REDIS_USER_NAME = "username" # Redis bulut hizmeti kullanılıyorsa kullanıcı adı
REDIS_PORT = 6379 # Redis port numarası
REDIS_CLOUD_URL = 'redis-<your-host>:<your-port>,password=<your-password>' # Redis bulut hizmeti için bağlantı dizesi
REDIS_SLIDING_EXPIRE = 60 # Önbellek öğelerinin süresi (saniye cinsinden)

# Diğer çevresel değişkenler buraya eklenebilir.
```
Yukarıdaki örnekte, `REDIS_CLOUD_URL` değeri bulut tabanlı bir Redis hizmetine, `REDIS_PORT` ise yerel bir Redis sunucusuna bağlanmayı sağlar.

## Kullanılan Teknolojiler
**Node.js ve Paketleri:**
- Node.js (v14.17.0): JavaScript tabanlı sunucu tarafı çalıştırma ortamı.
- Express.js (v4.18.3): Minimalist web çerçevesi, API rotalarını tanımlamak ve işlemek için kullanılmıştır.
- Body-parser (v1.20.2): Gelen isteklerin vücut verilerini ayrıştırmak için kullanılmıştır.
- Multer (v1.4.5-lts.1): Dosya yükleme işlemleri için kullanılmıştır.

**Loglama İçin Kullanılan Paket:**
- Winston (v3.13.0): Loglama işlemlerini gerçekleştirmek için kullanılmıştır.

**Önbellek Yönetimi İçin Kullanılan Paket:**
- Node-Cache (v5.1.2): Bellek tabanlı önbellekleme işlemleri için kullanılmıştır.
- Redis (v8.0.0): Dağıtılmış önbellekleme için kullanılan anahtar-değer tabanlı bellek veri deposu.

**Çevresel Değişken Yönetimi İçin Kullanılan Paketler:**
- Dotenv (v16.4.5): Çevresel değişkenlerin yüklenmesi için kullanılmıştır.
- Dotenv-cli (v7.4.2): Çevresel değişkenlerin yüklenmesi için kullanılmıştır.

**HTTP İstek Loglama İçin Kullanılan Paket:**
- Morgan (v1.10.0): HTTP isteklerini loglamak için kullanılmıştır.

**Geliştirme İçin Kullanılan Paketler:**
- Nodemon (v3.1.0): Geliştirme sırasında sunucunun otomatik olarak yeniden başlatılmasını sağlamak için kullanılmıştır.
- Prettier (v3.2.5): Kodun konsistansını sağlamak için kullanılmıştır.

## Yapılar ve Kullanımları

**Middleware'ler**
Proje, çeşitli middleware'ler kullanarak isteklerin işlenmesini sağlar. Middleware'ler arasında loglama, önbellekleme ve hata işleme gibi işlevler bulunmaktadır. Middleware'ler, /api/middleware dizininde yer almaktadır.

- logs.middleware.js: İsteklerin ayrıntılarını loglama işlemi gerçekleştirir.
- cache.middleware.js: Önbellekleme (cache) yönetimini sağlar.
- error-handler.middleware.js: Hata işleme middleware'ini sağlar.

**Routes**
RESTful API rotaları sunar. Bu rotalar önbellekleme, loglama ve hata işleme middleware'lerini kullanmaktadır.
- /planets: Tüm gezegenleri getiren bir GET endpoint'i.
- /planets/:id: Belirli bir gezegeni getiren bir GET endpoint'i.

**Controllers**
API rotalarının iş mantığını içeren controller dosyası.
**Shared**
Paylaşılan modeller, sabitler ve yardımcı işlevlerin yer aldığı bir index dosyası.
- **Errors**
  - app.error.class.js -> Uygulama hata sınıfını tanımlayan dosya.
- **Utils**
  - logger.utils.js -> Loglama işlemlerini gerçekleştiren yardımcı fonksiyonlar.
  - request.utils.js -> İstek nesnesinden bilgi çıkarmak için yardımcı fonksiyonlar.
