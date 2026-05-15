# Movie Lottery

React framework ile geliştirilmiş, LocalStorage entegrasyonlu izlemek istediğiniz filmler için CRUD uygulaması.

## 🚀 Özellikler

- ✅ LocalStorage ile veri persist etme
- ✅ Yeni film ekleme (Form)
- ✅ Film silme
- ✅ Film güncelleme
- ✅ Filmleri filtreleme
- ✅ Rastgele film önerme
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

1. GitHub reposunu indir.
2. Netlify'da "Create New Project" bölümüne git.
3. İndirdiğin repoyu buraya yükle.
4. Deploy edilen sitenin linkine tıkla.

Veya Netlify ile önceden oluşturulmuş siteye git:
https://loquacious-taffy-75bfde.netlify.app/


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