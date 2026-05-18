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

Ön Gereksinimler <br>
Sisteminizde Git ve Node.js'in yüklü olduğundan emin olun. Eğer yüklü değilse <a href="https://git-scm.com/install/" target="_blank">Git</a> ve <a href="https://nodejs.org/en/download" target="_blank">Node.js</a> Kurulum Rehberleri üzerinden kurulumları tamamlayabilirsiniz.

```bash
# Projeyi klonlayın
git clone https://github.com/Doga4635/movie_lottery
cd movie_lottery

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
https://movielottery.netlify.app/


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

- **TypeScript** - Uygulamanın ana dili
- **Vite** - Build aracı
- **Netlify** - Hosting
