# Шинэ дохио нэмэх

1. Зургуудаа `public/signs/<slug>/` фолдерт хийнэ: `step-1.png`, `step-2.png`, … Facebook-т хуваалцахад
   харагдах нэгтгэсэн зураг байвал `steps.png` гэж нэрлэнэ.
   - `<slug>` нь `content/sentences.ts` эсвэл `content/letters.ts` доторх тухайн мөрийн `slug`.
     Жишээ нь «Баярлалаа» → `bayarlalaa`, «Ө» үсэг → `oe`.
2. Тухайн мөрийн `steps`-д алхам бүрийг нэмнэ:
   ```ts
   steps: [
     { image: "/signs/bayarlalaa/step-1.png", caption: "Алхмын тайлбар." },
     { image: "/signs/bayarlalaa/step-2.png", caption: "Алхмын тайлбар." },
   ],
   ogImage: "/signs/bayarlalaa/steps.png", // байхгүй бол энэ мөрийг бичихгүй
   ```
3. `npm test`-ийг ажиллуулна. Зургийн зам буруу бол тест унана.
4. Commit хийгээд push хийнэ. Дохио каталогт автоматаар нэмэгдэнэ.

Анхаар: `mnsl-source/` фолдероос (mnsl.mn-ийн зураг, видео) юуг ч энд хуулж болохгүй.
`slug`-ийг нэг удаа нийтэлсний дараа солихгүй: хуваалцсан линкүүд эвдэрнэ.
