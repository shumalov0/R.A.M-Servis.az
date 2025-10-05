# OpenStreetMap Setup (API Key-siz)

Bu sənəd OpenStreetMap və Leaflet istifadə edərək pulsuz map sistemi qurmağı izah edir.

## 1. Niyə OpenStreetMap?

### Üstünlüklər:

- **Tamamilə pulsuz** - API key lazım deyil
- **Məhdudiyyət yoxdur** - istənilən qədər istifadə edin
- **Açıq mənbə** - şəffaf və etibarlı
- **Yaxşı performans** - sürətli yüklənmə
- **Responsive** - bütün cihazlarda işləyir

### Google Maps ilə müqayisə:

- Google Maps: API key lazım, ödənişli, məhdudiyyətlər
- OpenStreetMap: Heç nə lazım deyil, tamamilə pulsuz

## 2. Environment Variables konfiqurasiyası

`.env.local` faylınızda yalnız aşağıdakı dəyişənlər lazımdır:

```env
# Ram Servis Ünvan Məlumatları (OpenStreetMap istifadə edir - API key lazım deyil)
NEXT_PUBLIC_COMPANY_ADDRESS="Bakı şəhəri, Nəsimi rayonu, Azadlıq prospekti 123"
NEXT_PUBLIC_COMPANY_LAT=40.4093
NEXT_PUBLIC_COMPANY_LNG=49.8671
```

**Diqqət:**

- API key lazım deyil!
- Yalnız koordinatları və ünvanı dəyişdirin

## 3. Koordinatları tapmaq

### Metod 1: Google Maps istifadə edin

1. [Google Maps](https://maps.google.com/) açın
2. Biznesinizin ünvanını axtarın
3. Ünvana sağ klik edin
4. Koordinatları kopyalayın (məs: 40.4093, 49.8671)

### Metod 2: OpenStreetMap istifadə edin

1. [OpenStreetMap](https://www.openstreetmap.org/) açın
2. Ünvanı axtarın
3. Sağ klik edib "Show address" seçin
4. URL-dən koordinatları götürün

### Metod 3: GPS koordinat tapıcı istifadə edin

1. [GPS Coordinates](https://www.gps-coordinates.net/) kimi saytları istifadə edin
2. Ünvanı daxil edin
3. Lat/Lng koordinatlarını kopyalayın

## 4. Test edin

1. Saytınızı yenidən başladın: `npm run dev`
2. Ana səhifəyə gedin və map bölməsini yoxlayın
3. `/contact` səhifəsinə gedin və orada da map-i yoxlayın
4. Browser Developer Tools-da console-u yoxlayın
5. **API key xətası olmayacaq!**

## 5. Xüsusiyyətlər

### Ana Səhifədə Map

- Şirkət məlumatları ilə birlikdə
- "Yol tarifi al" düyməsi
- Responsive dizayn
- Custom marker

### Contact Səhifəsində Map

- Tam contact form
- Ətraflı şirkət məlumatları
- Sürətli əlaqə düymələri
- WhatsApp, telefon, email linklər

### Map Özellikleri

- Custom red marker (CSS ilə yaradılmış)
- Auto-open popup
- Zoom control
- Mobile responsive
- OpenStreetMap tiles

## 6. Troubleshooting

### Map yüklənmir

- Browser console-da xəta mesajlarını yoxlayın
- Internet bağlantınızı yoxlayın
- Leaflet CDN-nin əlçatan olduğunu təsdiq edin

### Koordinatlar səhvdir

- OpenStreetMap-də koordinatları yenidən yoxlayın
- Lat/Lng sırasının doğru olduğunu təsdiq edin
- Onluq nöqtə istifadə edin (vergül deyil)

### Marker görünmür

- Koordinatların düzgün olduğunu yoxlayın
- CSS-in düzgün yükləndiğini təsdiq edin

## 7. Qiymətləndirmə

### Tamamilə Pulsuz

- **0 AZN** - heç bir ödəniş yoxdur
- **Məhdudiyyət yoxdur** - istənilən qədər istifadə edin
- **API key lazım deyil** - dərhal işləyir

### Google Maps ilə müqayisə

- Google Maps: 28,000 yükləmədən sonra ödənişli
- OpenStreetMap: Həmişə pulsuz

## 8. Təhlükəsizlik

### Heç bir API Key yoxdur

- Təhlükəsizlik problemi yoxdur
- Açıq mənbə və şəffafdır
- Məlumat sızıntısı riski yoxdur

### Performance

- CDN istifadə edilir
- Sürətli yüklənmə
- Minimal resurs istifadəsi

## 9. Əlavə Funksiyalar

### Mövcud funksiyalar

- Interactive map
- Custom marker
- Popup info window
- Zoom və pan
- Mobile touch support

### Gələcək əlavələr

- Routing (yol tarifi)
- Search functionality
- Multiple markers
- Custom map styles

## 10. Performance

### Optimization

- Lazy loading istifadə edilir
- Map yalnız görünəndə yüklənir
- CDN-dən sürətli yüklənmə
- Minimal JavaScript

### Caching

- Map tiles avtomatik cache edilir
- Browser cache istifadə edilir
- Leaflet library cache edilir

## 11. Nəticə

Bu OpenStreetMap sistemi ilə:

- **API key problemi yoxdur**
- **Tamamilə pulsuz**
- **Professional görünüş**
- **Sürətli performans**
- **Mobile responsive**

Google Maps-dən daha sadə və etibarlı həll!
