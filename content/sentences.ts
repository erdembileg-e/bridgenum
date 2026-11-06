import type { Sign } from "@/lib/signs";

// Order and wording follow ~/Desktop/sign-language-images/README.md.
// A sentence without steps is not published yet.
export const sentences: Sign[] = [
  {
    kind: "sentence",
    order: 1,
    slug: "sain-baina-uu",
    title: "Сайн байна уу?",
    steps: [
      {
        image: "/signs/sain-baina-uu/step-1.png",
        caption: "Баруун гарын алгаа нүүрнийхээ өмнө, нүдний түвшинд байрлуулна.",
      },
      {
        image: "/signs/sain-baina-uu/step-2.png",
        caption: "Гараа доош буулгаж, алгаа цээжин дээрээ тавина.",
      },
      {
        image: "/signs/sain-baina-uu/step-3.png",
        caption: "Алгаа дээш харуулан, гараа урагш хүн рүү сунгана.",
      },
    ],
    ogImage: "/signs/sain-baina-uu/steps.png",
  },
  {
    kind: "sentence",
    order: 2,
    slug: "saikhan-amarsan-uu",
    title: "Сайхан амарсан уу?",
    steps: [
      {
        image: "/signs/saikhan-amarsan-uu/step-1.jpg",
        caption: "Баруун гарын хуруугаа бага зэрэг нугалан хүзүүнийхээ өмнө барина.",
      },
      {
        image: "/signs/saikhan-amarsan-uu/step-2.jpg",
        caption: "Гараа дээш өргөж, хуруугаараа эрүүгээ илэн хүргэнэ.",
      },
      {
        image: "/signs/saikhan-amarsan-uu/step-3.jpg",
        caption: "Хоёр гараа цээжнийхээ өмнө солбин тавьж, аажуухан доош буулгана.",
      },
    ],
    ogImage: "/signs/saikhan-amarsan-uu/steps.jpg",
  },
  {
    kind: "sentence",
    order: 3,
    slug: "udriig-saikhan-unguruuleerei",
    title: "Өдрийг сайхан өнгөрүүлээрэй.",
    steps: [
      {
        image: "/signs/udriig-saikhan-unguruuleerei/step-1.jpg",
        caption: "Нэг гараа хэвтээ барьж, нөгөө гарынхаа тохойг дээр нь тулгаад шуугаа босоо өргөнө.",
      },
      {
        image: "/signs/udriig-saikhan-unguruuleerei/step-2.jpg",
        caption: "Босоо гараа нар хөдлөх мэт хажуу тийш аажмаар хазайлгана.",
      },
      {
        image: "/signs/udriig-saikhan-unguruuleerei/step-3.jpg",
        caption: "Баруун гарын хуруугаа бага зэрэг нугалан хүзүүнийхээ өмнө барина.",
      },
      {
        image: "/signs/udriig-saikhan-unguruuleerei/step-4.jpg",
        caption: "Гараа дээш өргөж, хуруугаараа эрүүгээ илэн хүргэнэ.",
      },
      {
        image: "/signs/udriig-saikhan-unguruuleerei/step-5.jpg",
        caption: "Хоёр гарын долоовор, дунд хуруугаа дээш чиглүүлэн цээжний өмнө солбин барина.",
      },
      {
        image: "/signs/udriig-saikhan-unguruuleerei/step-6.jpg",
        caption: "Хоёр гараа салгаж, хуруугаа дээш чиглүүлэн зэрэгцүүлнэ.",
      },
      {
        image: "/signs/udriig-saikhan-unguruuleerei/step-7.jpg",
        caption: "Хоёр гарын хурууны үзүүрийг хооронд нь нийлүүлнэ.",
      },
    ],
    ogImage: "/signs/udriig-saikhan-unguruuleerei/steps.jpg",
  },
  {
    kind: "sentence",
    order: 4,
    slug: "ugluunii-mend",
    title: "Өглөөний мэнд.",
    steps: [
      {
        image: "/signs/ugluunii-mend/step-1.jpg",
        caption: "Баруун гарын алгаа босоо барьж, ирмэгээр нь эрүүндээ хүргэнэ.",
      },
      {
        image: "/signs/ugluunii-mend/step-2.jpg",
        caption: "Гараа нүүрнийхээ өмнүүр дээш өргөнө — нар мандах мэт.",
      },
      {
        image: "/signs/ugluunii-mend/step-3.jpg",
        caption: "Баруун гарын хурууны үзүүрийг духандаа хүргэнэ.",
      },
      {
        image: "/signs/ugluunii-mend/step-4.jpg",
        caption: "Гараа духнаасаа урагш, дээш холдуулна.",
      },
    ],
    ogImage: "/signs/ugluunii-mend/steps.jpg",
  },
  {
    kind: "sentence",
    order: 5,
    slug: "udriin-mend",
    title: "Өдрийн мэнд.",
    steps: [
      {
        image: "/signs/udriin-mend/step-1.jpg",
        caption: "Нэг гараа хэвтээ барьж, нөгөө гарынхаа тохойг дээр нь тулгаад шуугаа цагийн 12 шиг босоо өргөнө.",
      },
      {
        image: "/signs/udriin-mend/step-2.jpg",
        caption: "Баруун гарын хурууны үзүүрийг духандаа хүргэнэ.",
      },
      {
        image: "/signs/udriin-mend/step-3.jpg",
        caption: "Гараа духнаасаа урагш, дээш холдуулна.",
      },
    ],
    ogImage: "/signs/udriin-mend/steps.jpg",
  },
  {
    kind: "sentence",
    order: 6,
    slug: "oroin-mend",
    title: "Оройн мэнд.",
    steps: [
      {
        image: "/signs/oroin-mend/step-1.jpg",
        caption: "Хоёр гараа алгаа урагш харуулан мөрний түвшинд хоёр тийш дэлгэнэ.",
      },
      {
        image: "/signs/oroin-mend/step-2.jpg",
        caption: "Хоёр гараа нүүрнийхээ өмнө ойртуулан нийлүүлж, нүүрээ халхлах мэт болгоно.",
      },
      {
        image: "/signs/oroin-mend/step-3.jpg",
        caption: "Баруун гарын хурууны үзүүрийг духандаа хүргэнэ.",
      },
      {
        image: "/signs/oroin-mend/step-4.jpg",
        caption: "Гараа духнаасаа урагш, дээш холдуулна.",
      },
    ],
    ogImage: "/signs/oroin-mend/steps.jpg",
  },
  {
    kind: "sentence",
    order: 7,
    slug: "bayartai",
    title: "Баяртай.",
    steps: [
      {
        image: "/signs/bayartai/step-1.jpg",
        caption: "Баруун гараа нүүрнийхээ хажууд өргөж, алгаа урагш харуулан хуруугаа нугалж тэнийлгэн даллана.",
      },
    ],
    ogImage: "/signs/bayartai/steps.jpg",
  },
  {
    kind: "sentence",
    order: 8,
    slug: "bayarlalaa",
    title: "Баярлалаа.",
    steps: [
      {
        image: "/signs/bayarlalaa/step-1.jpg",
        caption: "Нэг гарын алгаа цээжин дээрээ тавьж, нөгөө гарын алгаа дээш харуулан доор нь барина.",
      },
      {
        image: "/signs/bayarlalaa/step-2.jpg",
        caption: "Цээжин дээрх гараа доош буулгаж, доод гарынхаа алган дээр зөрүүлэн тавина.",
      },
    ],
    ogImage: "/signs/bayarlalaa/steps.jpg",
  },
  {
    kind: "sentence",
    order: 9,
    slug: "namaig-gedeg",
    title: "Намайг _ гэдэг.",
    steps: [
      {
        image: "/signs/namaig-gedeg/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаар өөрийнхөө цээж рүү заана.",
      },
      {
        image: "/signs/namaig-gedeg/step-2.jpg",
        caption: "Зүүн гарын эрхий хуруугаа дээш гозойлгож, баруун гарын долоовор хуруугаа түүн рүү чиглүүлнэ.",
      },
      {
        image: "/signs/namaig-gedeg/step-3.jpg",
        caption: "Долоовор хуруугаа эрхий хуруун дээр нь хүргэнэ.",
      },
    ],
    ogImage: "/signs/namaig-gedeg/steps.jpg",
  },
  {
    kind: "sentence",
    order: 10,
    slug: "taniltssandaa-taatai-baina",
    title: "Танилцсандаа таатай байна.",
    steps: [
      {
        image: "/signs/taniltssandaa-taatai-baina/step-1.jpg",
        caption: "Хоёр гарын алгаа хэвтээ байдлаар хэвлийн өмнө барьж, бие бие рүү нь ойртуулан нийлүүлнэ.",
      },
      {
        image: "/signs/taniltssandaa-taatai-baina/step-2.jpg",
        caption: "Баруун гарын хуруугаа бага зэрэг нугалан хүзүүнийхээ өмнө барина.",
      },
      {
        image: "/signs/taniltssandaa-taatai-baina/step-3.jpg",
        caption: "Гараа дээш өргөж, хуруугаараа эрүүгээ илэн хүргэнэ.",
      },
    ],
    ogImage: "/signs/taniltssandaa-taatai-baina/steps.jpg",
  },
  {
    kind: "sentence",
    order: 11,
    slug: "chamaar-bakharkhaj-baina",
    title: "Чамаар бахархаж байна.",
    steps: [
      {
        image: "/signs/chamaar-bakharkhaj-baina/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаа урагш чиглүүлэн цээжний өмнө өргөнө.",
      },
      {
        image: "/signs/chamaar-bakharkhaj-baina/step-2.jpg",
        caption: "Долоовор хуруугаараа урд байгаа хүн рүү заана.",
      },
    ],
    ogImage: "/signs/chamaar-bakharkhaj-baina/steps.jpg",
  },
  {
    kind: "sentence",
    order: 12,
    slug: "daraa-uulzya",
    title: "Дараа уулзъя.",
    steps: [
      {
        image: "/signs/daraa-uulzya/step-1.jpg",
        caption: "Баруун гарын алгаа доош харуулан бэлхүүсний хажууд барьж, урагш түлхэх мэт хөдөлгөнө.",
      },
      {
        image: "/signs/daraa-uulzya/step-2.jpg",
        caption: "Хоёр гарын долоовор хуруугаа дээш чиглүүлж, цээжний өмнө бие бие рүү нь ойртуулан нийлүүлнэ.",
      },
    ],
    ogImage: "/signs/daraa-uulzya/steps.jpg",
  },
  {
    kind: "sentence",
    order: 13,
    slug: "bi-bayartai-baina",
    title: "Би баяртай байна.",
    steps: [
      {
        image: "/signs/bi-bayartai-baina/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаар өөрийнхөө цээж рүү заана.",
      },
      {
        image: "/signs/bi-bayartai-baina/step-2.jpg",
        caption: "Баруун гараа нүүрнийхээ хажууд өргөж, алгаа урагш харуулан хуруугаа нугалж тэнийлгэн даллана.",
      },
    ],
    ogImage: "/signs/bi-bayartai-baina/steps.jpg",
  },
  {
    kind: "sentence",
    order: 14,
    slug: "bi-chamd-khairtai",
    title: "Би чамд хайртай.",
    steps: [
      {
        image: "/signs/bi-chamd-khairtai/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаар өөрийнхөө цээж рүү заана.",
      },
      {
        image: "/signs/bi-chamd-khairtai/step-2.jpg",
        caption: "Баруун гарын долоовор хуруугаа урагш чиглүүлэн цээжний өмнө өргөнө.",
      },
      {
        image: "/signs/bi-chamd-khairtai/step-3.jpg",
        caption: "Долоовор хуруугаараа урд байгаа хүн рүү заана.",
      },
      {
        image: "/signs/bi-chamd-khairtai/step-4.jpg",
        caption: "Баруун гарын алгаа цээжин дээрээ хэвтээ тавина.",
      },
      {
        image: "/signs/bi-chamd-khairtai/step-5.jpg",
        caption: "Алгаа зүрхэн дээрээ бага зэрэг эргүүлэн дарна.",
      },
      {
        image: "/signs/bi-chamd-khairtai/step-6.jpg",
        caption: "Гараа цээжнээсээ доош, урагш гулсуулан сунгана.",
      },
    ],
    ogImage: "/signs/bi-chamd-khairtai/steps.jpg",
  },
  {
    kind: "sentence",
    order: 15,
    slug: "uuriiguu-sain-bodooroi",
    title: "Өөрийгөө сайн бодоорой.",
    steps: [
      {
        image: "/signs/uuriiguu-sain-bodooroi/step-1.jpg",
        caption: "Баруун гараа нударга болгож, эрхий хуруугаараа цээжиндээ хүргэнэ.",
      },
      {
        image: "/signs/uuriiguu-sain-bodooroi/step-2.jpg",
        caption: "Нударгаа цээжнээсээ бага зэрэг холдуулна.",
      },
      {
        image: "/signs/uuriiguu-sain-bodooroi/step-3.jpg",
        caption: "Баруун гарын эрхий хуруугаа дээш гозойлгон цээжний өмнө барина.",
      },
      {
        image: "/signs/uuriiguu-sain-bodooroi/step-4.jpg",
        caption: "Баруун гарын долоовор хуруугаа чамархай дээрээ хүргэнэ.",
      },
    ],
    ogImage: "/signs/uuriiguu-sain-bodooroi/steps.jpg",
  },
  {
    kind: "sentence",
    order: 16,
    slug: "urgelj-ineej-yavaarai",
    title: "Үргэлж инээж яваарай.",
    steps: [
      {
        image: "/signs/urgelj-ineej-yavaarai/step-1.jpg",
        caption: "Баруун гарын долоовор, дунд хуруугаа V хэлбэрээр дэлгэж, нүүрнийхээ хажууд өргөнө.",
      },
      {
        image: "/signs/urgelj-ineej-yavaarai/step-2.jpg",
        caption: "Баруун гараа алгаа урагш харуулан толгойн түвшинд өргөнө.",
      },
      {
        image: "/signs/urgelj-ineej-yavaarai/step-3.jpg",
        caption: "Алгаа доош харуулан гараа урагш хазайлгана.",
      },
    ],
    ogImage: "/signs/urgelj-ineej-yavaarai/steps.jpg",
  },
  {
    kind: "sentence",
    order: 17,
    slug: "chi-yuu-khiij-baina",
    title: "Чи юу хийж байна?",
    steps: [
      {
        image: "/signs/chi-yuu-khiij-baina/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаа урагш чиглүүлэн цээжний өмнө өргөнө.",
      },
      {
        image: "/signs/chi-yuu-khiij-baina/step-2.jpg",
        caption: "Долоовор хуруугаараа урд байгаа хүн рүү заана.",
      },
      {
        image: "/signs/chi-yuu-khiij-baina/step-3.jpg",
        caption: "Баруун гарын долоовор хуруугаа дээш чиглүүлэн цээжний өмнө барьж, хажуу тийш сэгсэрнэ.",
      },
      {
        image: "/signs/chi-yuu-khiij-baina/step-4.jpg",
        caption: "Хоёр гараа нударга болгон цээжний өмнө ойртуулан барина.",
      },
      {
        image: "/signs/chi-yuu-khiij-baina/step-5.jpg",
        caption: "Нударгануудаа хооронд нь хүргэж, ажил хийх мэт ээлжлэн эргүүлнэ.",
      },
    ],
    ogImage: "/signs/chi-yuu-khiij-baina/steps.jpg",
  },
  {
    kind: "sentence",
    order: 18,
    slug: "khooloo-idsen-uu",
    title: "Хоолоо идсэн үү?",
    steps: [
      {
        image: "/signs/khooloo-idsen-uu/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаа босоо барьж, уруулынхаа өмнө авчирна.",
      },
      {
        image: "/signs/khooloo-idsen-uu/step-2.jpg",
        caption: "Хуруугаа уруул дээрээ хүргэнэ.",
      },
      {
        image: "/signs/khooloo-idsen-uu/step-3.jpg",
        caption: "Баруун гарын хурууны үзүүрүүдийг нийлүүлж, ам руугаа хэд хэдэн удаа ойртуулна.",
      },
    ],
    ogImage: "/signs/khooloo-idsen-uu/steps.jpg",
  },
  {
    kind: "sentence",
    order: 19,
    slug: "kheden-nastai-ve",
    title: "Хэдэн настай вэ?",
    steps: [
      {
        image: "/signs/kheden-nastai-ve/step-1.jpg",
        caption: "Баруун гарын алгаа дээш харуулан цээжний өмнө өргөж, хуруугаа тоолох мэт хөдөлгөнө.",
      },
      {
        image: "/signs/kheden-nastai-ve/step-2.jpg",
        caption: "Баруун гараа эрүүндээ хүргэж, хуруугаараа эрүүгээ доош илнэ.",
      },
    ],
    ogImage: "/signs/kheden-nastai-ve/steps.jpg",
  },
  {
    kind: "sentence",
    order: 20,
    slug: "chi-zugeer-uu",
    title: "Чи зүгээр үү?",
    steps: [
      {
        image: "/signs/chi-zugeer-uu/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаа урагш чиглүүлэн цээжний өмнө өргөнө.",
      },
      {
        image: "/signs/chi-zugeer-uu/step-2.jpg",
        caption: "Долоовор хуруугаараа урд байгаа хүн рүү заана.",
      },
      {
        image: "/signs/chi-zugeer-uu/step-3.jpg",
        caption: "Баруун гарын алгаа доош харуулан цээжний өмнө барина.",
      },
      {
        image: "/signs/chi-zugeer-uu/step-4.jpg",
        caption: "Гараа доош буулгаж, хуруугаа сул унжуулна.",
      },
    ],
    ogImage: "/signs/chi-zugeer-uu/steps.jpg",
  },
  {
    kind: "sentence",
    order: 21,
    slug: "chi-mundag-shuu",
    title: "Чи мундаг шүү.",
    steps: [
      {
        image: "/signs/chi-mundag-shuu/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаа урагш чиглүүлэн цээжний өмнө өргөнө.",
      },
      {
        image: "/signs/chi-mundag-shuu/step-2.jpg",
        caption: "Долоовор хуруугаараа урд байгаа хүн рүү заана.",
      },
      {
        image: "/signs/chi-mundag-shuu/step-3.jpg",
        caption: "Баруун гарын эрхий хуруугаа дээш гозойлгон мөрний түвшинд өргөнө.",
      },
    ],
    ogImage: "/signs/chi-mundag-shuu/steps.jpg",
  },
  {
    kind: "sentence",
    order: 22,
    slug: "yuu-baina-daa",
    title: "Юу байна даа?",
    steps: [
      {
        image: "/signs/yuu-baina-daa/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаа дээш чиглүүлэн цээжний өмнө барьж, хажуу тийш сэгсэрнэ.",
      },
      {
        image: "/signs/yuu-baina-daa/step-2.jpg",
        caption: "Нэг гарын алгаа дээш харуулан барьж, нөгөө гарын ирмэгийг дээрээс нь доош буулгана.",
      },
    ],
    ogImage: "/signs/yuu-baina-daa/steps.jpg",
  },
  {
    kind: "sentence",
    order: 23,
    slug: "khaashaa-yavj-baina",
    title: "Хаашаа явж байна?",
    steps: [
      {
        image: "/signs/khaashaa-yavj-baina/step-1.jpg",
        caption: "Баруун гарын алгаа дээш харуулан цээжний өмнө урагш сунгана.",
      },
      {
        image: "/signs/khaashaa-yavj-baina/step-2.jpg",
        caption: "Гараа хажуу тийш бага зэрэг хөдөлгөж, асуух нүүрний хувирал гаргана.",
      },
      {
        image: "/signs/khaashaa-yavj-baina/step-3.jpg",
        caption: "Баруун гараа алгаа урагш харуулан толгойн түвшинд өргөнө.",
      },
      {
        image: "/signs/khaashaa-yavj-baina/step-4.jpg",
        caption: "Алгаа доош харуулан гараа урагш хазайлгана.",
      },
    ],
    ogImage: "/signs/khaashaa-yavj-baina/steps.jpg",
  },
  {
    kind: "sentence",
    order: 24,
    slug: "bayar-khurgee",
    title: "Баяр хүргэе!",
    steps: [
      {
        image: "/signs/bayar-khurgee/step-1.jpg",
        caption: "Баруун гараа нударга болгон толгойн хажууд дээш өргөнө.",
      },
      {
        image: "/signs/bayar-khurgee/step-2.jpg",
        caption: "Хоёр гараа нударга хэлбэрээр бэлхүүсний өмнө хүчтэй доош татна.",
      },
    ],
    ogImage: "/signs/bayar-khurgee/steps.jpg",
  },
  {
    kind: "sentence",
    order: 25,
    slug: "yuu-khiij-baigaa-ve",
    title: "Юу хийж байгаа вэ?",
    steps: [
      {
        image: "/signs/yuu-khiij-baigaa-ve/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаа дээш чиглүүлэн цээжний өмнө барьж, хажуу тийш сэгсэрнэ.",
      },
      {
        image: "/signs/yuu-khiij-baigaa-ve/step-2.jpg",
        caption: "Хоёр гараа нударга болгон цээжний өмнө ойртуулан барина.",
      },
      {
        image: "/signs/yuu-khiij-baigaa-ve/step-3.jpg",
        caption: "Нударгануудаа хооронд нь хүргэж, ажил хийх мэт ээлжлэн эргүүлнэ.",
      },
    ],
    ogImage: "/signs/yuu-khiij-baigaa-ve/steps.jpg",
  },
  {
    kind: "sentence",
    order: 26,
    slug: "chamd-amjilt-khuse",
    title: "Чамд амжилт хүсье.",
    steps: [
      {
        image: "/signs/chamd-amjilt-khuse/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаа урагш чиглүүлэн цээжний өмнө өргөнө.",
      },
      {
        image: "/signs/chamd-amjilt-khuse/step-2.jpg",
        caption: "Долоовор хуруугаараа урд байгаа хүн рүү заана.",
      },
      {
        image: "/signs/chamd-amjilt-khuse/step-3.jpg",
        caption: "Хоёр гарын эрхий хуруугаа дээш гозойлгож, бэлхүүсний өмнө зэрэгцүүлэн барина.",
      },
      {
        image: "/signs/chamd-amjilt-khuse/step-4.jpg",
        caption: "Баруун гараа мөрний түвшинд дээш өргөж, зүүн гараа байранд нь үлдээнэ.",
      },
    ],
    ogImage: "/signs/chamd-amjilt-khuse/steps.jpg",
  },
  {
    kind: "sentence",
    order: 27,
    slug: "sanaa-zovoltgui",
    title: "Санаа зоволтгүй.",
    steps: [
      {
        image: "/signs/sanaa-zovoltgui/step-1.jpg",
        caption: "Хоёр гарын долоовор хуруугаа бие бие рүү нь чиглүүлэн цээжний өмнө барина.",
      },
      {
        image: "/signs/sanaa-zovoltgui/step-2.jpg",
        caption: "Хоёр гараа цээжний өмнө ээлжлэн дээш доош эргэлдүүлнэ.",
      },
    ],
    ogImage: "/signs/sanaa-zovoltgui/steps.jpg",
  },
  {
    kind: "sentence",
    order: 28,
    slug: "bukh-zuil-saikhan-bolno",
    title: "Бүх зүйл сайхан болно.",
    steps: [
      {
        image: "/signs/bukh-zuil-saikhan-bolno/step-1.jpg",
        caption: "Хоёр гарын алгаа урагш харуулан цээжний өмнө ойртуулж барина.",
      },
      {
        image: "/signs/bukh-zuil-saikhan-bolno/step-2.jpg",
        caption: "Хоёр гараа хоёр тийш нь тойруулан дэлгэнэ.",
      },
      {
        image: "/signs/bukh-zuil-saikhan-bolno/step-3.jpg",
        caption: "Гараа буцаан цээжний өмнө нийлүүлж, алгаа дээш харуулна.",
      },
      {
        image: "/signs/bukh-zuil-saikhan-bolno/step-4.jpg",
        caption: "Баруун гарын хуруугаа бага зэрэг нугалан хүзүүнийхээ өмнө барина.",
      },
      {
        image: "/signs/bukh-zuil-saikhan-bolno/step-5.jpg",
        caption: "Гараа дээш өргөж, хуруугаараа эрүүгээ илэн хүргэнэ.",
      },
      {
        image: "/signs/bukh-zuil-saikhan-bolno/step-6.jpg",
        caption: "Хоёр гарын хуруугаа бага зэрэг нугалан алгаа доош харуулж, цээжний өмнө барина.",
      },
      {
        image: "/signs/bukh-zuil-saikhan-bolno/step-7.jpg",
        caption: "Хоёр гараа зэрэг доош буулгана.",
      },
      {
        image: "/signs/bukh-zuil-saikhan-bolno/step-8.jpg",
        caption: "Гараа бэлхүүсний түвшинд зогсоож, хуруугаа доош чиглүүлнэ.",
      },
    ],
    ogImage: "/signs/bukh-zuil-saikhan-bolno/steps.jpg",
  },
  {
    kind: "sentence",
    order: 29,
    slug: "bi-oilgoloo",
    title: "Би ойлголоо.",
    steps: [
      {
        image: "/signs/bi-oilgoloo/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаар өөрийнхөө цээж рүү заана.",
      },
      {
        image: "/signs/bi-oilgoloo/step-2.jpg",
        caption: "Баруун гарын эрхий, долоовор хуруугаа дугуйлан (OK хэлбэр) нүүрнийхээ хажууд өргөнө.",
      },
    ],
    ogImage: "/signs/bi-oilgoloo/steps.jpg",
  },
  {
    kind: "sentence",
    order: 30,
    slug: "bi-medekhgui-baina",
    title: "Би мэдэхгүй байна.",
    steps: [
      {
        image: "/signs/bi-medekhgui-baina/step-1.jpg",
        caption: "Баруун гарын хуруугаа цээжиндээ хүргээд, гараа доош буулган хажуу тийш шилжүүлнэ.",
      },
    ],
    ogImage: "/signs/bi-medekhgui-baina/steps.jpg",
  },
  {
    kind: "sentence",
    order: 31,
    slug: "nadad-tuslaach",
    title: "Надад туслаач.",
    steps: [
      {
        image: "/signs/nadad-tuslaach/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаар өөрийнхөө цээж рүү заана.",
      },
      {
        image: "/signs/nadad-tuslaach/step-2.jpg",
        caption: "Хоёр гараа цээжний өмнө давхарлан, дээд гарын хуруугаар доод гарынхаа нурууг дарна.",
      },
      {
        image: "/signs/nadad-tuslaach/step-3.jpg",
        caption: "Давхарласан гараа хамтад нь урагш бага зэрэг түлхэнэ.",
      },
    ],
    ogImage: "/signs/nadad-tuslaach/steps.jpg",
  },
  {
    kind: "sentence",
    order: 32,
    slug: "tur-khuleegeerei",
    title: "Түр хүлээгээрэй.",
    steps: [
      {
        image: "/signs/tur-khuleegeerei/step-1.jpg",
        caption: "Баруун гарын нэг хуруугаа дээш босгон цээжний хажууд барина.",
      },
      {
        image: "/signs/tur-khuleegeerei/step-2.jpg",
        caption: "Гараа цээжнийхээ гол руу аажмаар шилжүүлнэ.",
      },
      {
        image: "/signs/tur-khuleegeerei/step-3.jpg",
        caption: "Хуруугаа бага зэрэг бөхийлгөн цээжний голд зогсооно.",
      },
    ],
    ogImage: "/signs/tur-khuleegeerei/steps.jpg",
  },
  {
    kind: "sentence",
    order: 33,
    slug: "namaig-uuchlaarai",
    title: "Намайг уучлаарай.",
    steps: [
      {
        image: "/signs/namaig-uuchlaarai/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаар өөрийнхөө цээж рүү заана.",
      },
      {
        image: "/signs/namaig-uuchlaarai/step-2.jpg",
        caption: "Хоёр гарын алгаа доош харуулан цээжний өмнө давхарлан барина.",
      },
      {
        image: "/signs/namaig-uuchlaarai/step-3.jpg",
        caption: "Дээд гарын алгаар доод гарынхаа нурууг тойруулан илнэ.",
      },
    ],
    ogImage: "/signs/namaig-uuchlaarai/steps.jpg",
  },
  {
    kind: "sentence",
    order: 34,
    slug: "zugeer-ee",
    title: "Зүгээр ээ.",
    steps: [
      {
        image: "/signs/zugeer-ee/step-1.jpg",
        caption: "Баруун гарын алгаа доош харуулан цээжний өмнө барина.",
      },
      {
        image: "/signs/zugeer-ee/step-2.jpg",
        caption: "Гараа доош буулгаж, хуруугаа сул унжуулна.",
      },
    ],
    ogImage: "/signs/zugeer-ee/steps.jpg",
  },
  {
    kind: "sentence",
    order: 35,
    slug: "mash-ikh-bayarlalaa",
    title: "Маш их баярлалаа.",
    steps: [
      {
        image: "/signs/mash-ikh-bayarlalaa/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаа дээш, эрхий хуруугаа хажуу тийш тэнийлгэн барина.",
      },
      {
        image: "/signs/mash-ikh-bayarlalaa/step-2.jpg",
        caption: "Долоовор хуруугаа урагш хурдан нугална.",
      },
      {
        image: "/signs/mash-ikh-bayarlalaa/step-3.jpg",
        caption: "Нэг гарын алгаа цээжин дээрээ тавьж, нөгөө гарын алгаа дээш харуулан доор нь барина.",
      },
      {
        image: "/signs/mash-ikh-bayarlalaa/step-4.jpg",
        caption: "Цээжин дээрх гараа доош буулгаж, доод гарынхаа алган дээр зөрүүлэн тавина.",
      },
    ],
    ogImage: "/signs/mash-ikh-bayarlalaa/steps.jpg",
  },
  {
    kind: "sentence",
    order: 36,
    slug: "chamd-itgej-baina",
    title: "Чамд итгэж байна.",
    steps: [
      {
        image: "/signs/chamd-itgej-baina/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаа урагш чиглүүлэн цээжний өмнө өргөнө.",
      },
      {
        image: "/signs/chamd-itgej-baina/step-2.jpg",
        caption: "Долоовор хуруугаараа урд байгаа хүн рүү заана.",
      },
      {
        image: "/signs/chamd-itgej-baina/step-3.jpg",
        caption: "Баруун гарын алгаа цээжин дээрээ тавина.",
      },
      {
        image: "/signs/chamd-itgej-baina/step-4.jpg",
        caption: "Алгаа цээжиндээ зөөлөн дарна.",
      },
    ],
    ogImage: "/signs/chamd-itgej-baina/steps.jpg",
  },
  {
    kind: "sentence",
    order: 37,
    slug: "chi-chadna-aa",
    title: "Чи чадна аа.",
    steps: [
      {
        image: "/signs/chi-chadna-aa/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаа урагш чиглүүлэн цээжний өмнө өргөнө.",
      },
      {
        image: "/signs/chi-chadna-aa/step-2.jpg",
        caption: "Долоовор хуруугаараа урд байгаа хүн рүү заана.",
      },
      {
        image: "/signs/chi-chadna-aa/step-3.jpg",
        caption: "Баруун гараа нударга болгон толгойн хажууд өргөнө.",
      },
      {
        image: "/signs/chi-chadna-aa/step-4.jpg",
        caption: "Нударгаа урагш хүчтэй бөхийлгөнө.",
      },
    ],
    ogImage: "/signs/chi-chadna-aa/steps.jpg",
  },
  {
    kind: "sentence",
    order: 38,
    slug: "saikhan-amraarai",
    title: "Сайхан амраарай.",
    steps: [
      {
        image: "/signs/saikhan-amraarai/step-1.jpg",
        caption: "Баруун гарын хуруугаа бага зэрэг нугалан хүзүүнийхээ өмнө барина.",
      },
      {
        image: "/signs/saikhan-amraarai/step-2.jpg",
        caption: "Гараа дээш өргөж, хуруугаараа эрүүгээ илэн хүргэнэ.",
      },
      {
        image: "/signs/saikhan-amraarai/step-3.jpg",
        caption: "Хоёр гараа цээжнийхээ өмнө солбин тавьж, аажуухан доош буулгана.",
      },
    ],
    ogImage: "/signs/saikhan-amraarai/steps.jpg",
  },
  {
    kind: "sentence",
    order: 39,
    slug: "ulsuj-baina-uu",
    title: "Өлсөж байна уу?",
    steps: [
      {
        image: "/signs/ulsuj-baina-uu/step-1.jpg",
        caption: "Хоёр гарын хуруугаа бага зэрэг нугалан хэвлийн өмнө тавьж, доош илэх мэт хөдөлгөнө.",
      },
    ],
    ogImage: "/signs/ulsuj-baina-uu/steps.jpg",
  },
  {
    kind: "sentence",
    order: 40,
    slug: "bi-chamd-tusalya",
    title: "Би чамд туслъя.",
    steps: [
      {
        image: "/signs/bi-chamd-tusalya/step-1.jpg",
        caption: "Баруун гарын долоовор хуруугаар өөрийнхөө цээж рүү заана.",
      },
      {
        image: "/signs/bi-chamd-tusalya/step-2.jpg",
        caption: "Баруун гарын долоовор хуруугаа урагш чиглүүлэн цээжний өмнө өргөнө.",
      },
      {
        image: "/signs/bi-chamd-tusalya/step-3.jpg",
        caption: "Долоовор хуруугаараа урд байгаа хүн рүү заана.",
      },
      {
        image: "/signs/bi-chamd-tusalya/step-4.jpg",
        caption: "Хоёр гараа цээжний өмнө давхарлан, дээд гарын хуруугаар доод гарынхаа нурууг дарна.",
      },
      {
        image: "/signs/bi-chamd-tusalya/step-5.jpg",
        caption: "Давхарласан гараа хамтад нь урагш бага зэрэг түлхэнэ.",
      },
    ],
    ogImage: "/signs/bi-chamd-tusalya/steps.jpg",
  },
];
