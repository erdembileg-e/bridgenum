# Монгол дохионы хэл

Монгол дохионы хэлний өгүүлбэр, үсгийг зургаар таниулах сайт (Next.js, Vercel).

## Ажиллуулах

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # тестүүд
npm run build
```

Шинэ дохио нэмэх заавар: [docs/adding-signs.md](docs/adding-signs.md).

## Сэтгэгдэл (Supabase)

Зочид нүүр хуудсанд сэтгэгдэл үлдээнэ. Таныг `/admin` дээр зөвшөөрсний дараа л сайтад харагдана.
Тохируулаагүй бол сайт хэвийн ажиллаж, сэтгэгдлийн хэсэг «хаалттай» гэж харагдана.

1. [supabase.com](https://supabase.com) дээр шинэ төсөл үүсгэнэ.
2. **SQL Editor** нээгээд [supabase/migrations/0001_comments.sql](supabase/migrations/0001_comments.sql)-ийн
   агуулгыг хуулж ажиллуулна.
3. **Project Settings → API Keys → Secret keys** хэсгээс `sb_secret_…` түлхүүрийг хуулна. Project URL нь `https://<project-id>.supabase.co`.
   Энэ нууц түлхүүрийг хэнд ч битгий өгөөрэй.
4. Vercel → төсөл → **Settings → Environment Variables** дээр дараах 4-ийг нэмнэ
   ([.env.example](.env.example)-г үзнэ үү):
   - `SUPABASE_URL` — Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — `sb_secret_…` нууц түлхүүр
   - `ADMIN_PASSWORD` — `/admin`-д нэвтрэх нууц үг, **дор хаяж 12 тэмдэгт** (урт, санамсаргүй байх тусам сайн)
   - `COMMENTS_SECRET` — 32+ санамсаргүй тэмдэгт (`openssl rand -hex 32`)
5. Дахин deploy хийнэ.
6. `сайт/admin` руу орж нууц үгээ оруулаад сэтгэгдлийг **Зөвшөөрөх**, **Нуух** эсвэл **Устгах**.

Компьютер дээрээ туршихдаа `.env.example`-г `.env.local` болгон хуулж утгуудыг бөглөнө.
