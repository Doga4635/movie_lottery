# Movie Lottery

React framework ile geliştirilmiş, LocalStorage entegrasyonlu izlemek istediğiniz filmler için CRUD uygulaması.

## 🚀 Özellikler

- ✅ LocalStorage ile veri persist etme
- ✅ Yeni film ekleme (Form)
- ✅ Film silme
- ✅ Film güncelleme
- ✅ Filmleri filtreleme
- ✅ TypeScript desteği
- ✅ Netlify'a deploy edilebilir

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

## 🌐 Deploy (Netlify)

1. GitHub'a push et
2. Netlify'da "New site from Git" seç
3. GitHub reposunu bağla
4. Build komutu: `npm run build`
5. Publish dizini: `build/client`

Veya Netlify CLI ile:

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── FilmCard.tsx        # Film kartı
│   ├── FilmForm.tsx        # Film ekleme formu
│   └── FilmList.tsx        # Fİlmlerin liste görünümü
│   └── FilterButtons.tsx   # Filtre butonlarının görünümü  ?
├── interfaces/
│   └── Film.ts             # Film objesi  ?
├── pages/
│   └── Home.tsx            # Ana sayfa
├── utils/
│   └── filmStorage.ts      # LocalStorage işlemleri
├── App.css                 # Global stiller
├── App.tsx
├── index.css               # TailWindCSS
└── main.tsx                # Uygulama kökü
```

## 🔧 Teknolojiler

- **TypeScript** - Tip güvenliği
- **Vite** - Build tool
- **Netlify** - Hosting