import type { Card } from "../types";

// TRUTH — 100 cards across 7 categories
const truthFun: string[] = [
  "Siapa yang paling lama kalau siap-siap sebelum pergi?",
  "Jujur, siapa yang lebih sering bilang 'aku nggak lapar' padahal ujung-ujungnya ikutan makan?",
  "Kalau kita buka bisnis bareng, siapa yang bakal lebih dulu panik kalau ada masalah?",
  "Kebiasaan aku yang paling bikin kamu geleng-geleng kepala apa?",
  "Kalau kita tukeran HP selama sehari, hal pertama yang bakal kamu cari apa?",
  "Menurutmu, siapa yang lebih parah kalau lagi ngantuk tapi maksa nggak mau tidur?",
  "Kalau kita ikut kuis pasangan di TV, kira-kira kita bakal menang atau malu-maluin?",
  "Ada nggak kebiasaan aku waktu makan yang menurutmu agak aneh?",
  "Kalau lagi jalan bareng, siapa yang lebih sering nyasar duluan?",
  "Coba tebak, snack apa yang bakal aku pilih duluan kalau ke minimarket sekarang?",
  "Kalau kita disuruh masak berdua tanpa resep, hasilnya bakal kayak apa menurutmu?",
  "Siapa yang lebih sering ketawa duluan pas nonton film garing?",
  "Kalau aku ngambek, biasanya kamu ngerti dari tanda-tanda apa?",
  "Menurutmu siapa yang lebih parah kalau disuruh bangun pagi?",
  "Kalau kita main game bareng, siapa yang lebih baperan kalau kalah?",
  "Ada kebiasaan random aku yang sebenarnya bikin kamu ketawa sendiri kalau ingat?",
  "Kalau kita dikasih waktu 5 menit belanja gratis di minimarket, kamu bakal ngarahin aku ke rak mana?",
  "Siapa yang lebih sering ngeyel padahal salah?",
  "Kalau couple lain lihat kita dari luar, menurutmu kita kelihatan kayak pasangan yang gimana?",
  "Jujur, siapa yang lebih ribet milih menu kalau makan di luar?",
];

const truthLove: string[] = [
  "Hal kecil apa yang aku lakukan yang ternyata kamu suka banget?",
  "Kapan terakhir kali aku bikin kamu merasa benar-benar disayang?",
  "Apa hal dari aku yang paling bikin kamu nyaman?",
  "Kalau harus pilih satu kenangan kita buat diulang, kamu pilih yang mana?",
  "Apa panggilan sayang yang paling kamu suka dari aku?",
  "Momen mana yang bikin kamu makin yakin sama aku?",
  "Kalau aku lagi jauh, hal apa dari aku yang paling kamu kangenin?",
  "Ada nggak lagu yang kalau kamu dengar langsung keingat aku?",
  "Perubahan apa dari diri kamu setelah bareng aku yang menurutmu ke arah lebih baik?",
  "Waktu pertama sadar sayang sama aku itu momennya kapan?",
  "Hal apa yang bikin kamu yakin aku peduli, meskipun aku nggak selalu bilang langsung?",
  "Kalau ditanya satu alasan kenapa masih bareng aku sampai sekarang, kamu bakal jawab apa?",
  "Ada momen kecil yang menurut aku biasa aja, tapi ternyata berarti banget buat kamu?",
  "Cara aku nunjukin sayang yang paling ngena buat kamu itu yang mana?",
  "Kalau boleh minta satu hal buat lebih sering aku lakuin, kamu bakal minta apa?",
  "Apa yang bikin kamu ngerasa aman kalau lagi sama aku?",
  "Kalau harus jelasin rasa sayang kamu ke aku pakai satu kalimat, kira-kira apa?",
  "Hal dari masa awal kita yang masih pengin kamu pertahankan sampai sekarang apa?",
  "Kapan kamu paling bangga punya aku sebagai pasangan?",
  "Kalau harus pilih satu foto berdua buat dijadiin wallpaper, kamu bakal pilih momen yang mana?",
];

const truthCurious: string[] = [
  "Ada hal tentang aku yang dari dulu sebenarnya pengin kamu tanyain tapi belum pernah?",
  "First impression kamu ke aku dulu sebenarnya kayak gimana?",
  "Apa hal yang dulu kamu kira tentang aku, tapi ternyata salah?",
  "Ada kebiasaan aku yang sampai sekarang masih bikin kamu penasaran kenapa aku lakuin itu?",
  "Pernah nggak kamu diam-diam kepo sama masa lalu aku? Cerita dong.",
  "Ada nggak sisi aku yang cuma kamu yang tahu, yang orang lain nggak pernah lihat?",
  "Kalau boleh baca pikiran aku selama sehari, hari apa yang pengin kamu pilih?",
  "Ada momen waktu aku diam terus kamu penasaran banget lagi mikirin apa?",
  "Hal apa dari kebiasaan keluarga aku yang bikin kamu kaget waktu pertama tahu?",
  "Kira-kira ada nggak rahasia kecil yang belum aku ceritain ke kamu?",
  "Ada nggak momen aku kelihatan beda banget dari biasanya dan kamu penasaran kenapa?",
  "Kalau bisa intip satu chat aku, chat sama siapa yang bikin kamu paling kepo?",
  "Ada bagian dari hidup aku sebelum kenal kamu yang pengin banget kamu tahu lebih dalam?",
  "Hal apa dari aku yang awalnya biasa aja buat kamu, tapi makin lama makin bikin penasaran?",
  "Kalau nemu diary aku waktu remaja, halaman apa yang paling pengin kamu baca?",
];

const truthDeep: string[] = [
  "Kalau kamu lagi punya masalah, kamu sebenarnya lebih suka ditemenin atau dikasih ruang dulu?",
  "Apa hal yang paling bikin kamu merasa dimengerti sama aku?",
  "Kalau kita lagi beda pendapat, apa yang paling kamu butuhin dariku saat itu?",
  "Ada hal yang pengin kamu ubah dari cara kita ngobrol selama ini?",
  "Kalau kamu capek tapi nggak bilang, aku biasanya bisa nyadar dari apa?",
  "Hal apa yang bikin kamu gampang insecure, yang mungkin aku belum terlalu ngerti?",
  "Kalau kita lagi diem-dieman, biasanya siapa yang lebih dulu nggak tahan?",
  "Apa yang kamu takutin soal hubungan kita, kalau ada?",
  "Cara aku minta maaf itu udah cukup buat kamu, atau ada yang kurang?",
  "Kalau kamu ngerasa jauh sama aku walau kita ketemu tiap hari, itu biasanya kenapa?",
  "Ada beban yang selama ini kamu pikul sendiri padahal sebenarnya bisa dibagi ke aku?",
  "Kalau kita berantem, apa yang paling kamu inget dari cara aku bersikap?",
  "Hal apa yang bikin kamu ngerasa dihargai, bukan cuma disayang?",
  "Kalau ada satu kesalahan aku yang masih ngganjel di kamu, itu soal apa?",
  "Menurutmu kita lebih sering nyelesain masalah bareng, atau salah satu ngalah aja?",
];

const truthPrivate: string[] = [
  "Ada nggak hal yang kamu rasain tapi belum pernah kamu ungkapin ke aku sampai sekarang?",
  "Kalau harus jujur, ada nggak momen kamu ngerasa ragu sama hubungan kita?",
  "Ada kebiasaan aku di rumah yang sebenarnya agak ganggu tapi kamu diemin aja?",
  "Hal apa yang kamu simpan sendiri karena takut aku salah paham?",
  "Ada nggak sesuatu soal keluarga kamu yang belum sepenuhnya kamu certain ke aku?",
  "Kalau kita bahas soal uang, hal apa yang bikin kamu nggak nyaman ngomongnya?",
  "Ada momen kamu cemburu tapi mutusin buat diam aja? Kejadiannya gimana?",
  "Hal apa tentang penampilan kamu yang masih susah kamu terima sepenuhnya?",
  "Ada nggak keputusan penting yang kamu ambil sendiri tanpa cerita dulu ke aku?",
  "Kalau ada satu hal yang pengin kamu sembunyikan dari aku seumur hidup, itu soal apa — atau kamu bakal tetap cerita?",
];

const truthFuture: string[] = [
  "Kalau suatu hari kita tinggal bareng, hal pertama yang menurutmu bakal jadi drama apa?",
  "Kalau punya rumah sendiri, bagian rumah mana yang paling pengin kamu urus?",
  "Menurut kamu, uang sebagai pasangan enaknya diatur kayak gimana?",
  "Ada kebiasaan dari keluarga kamu yang pengin kamu bawa ke keluarga kita nanti?",
  "Kalau karier salah satu dari kita mengharuskan pindah kota, menurutmu kita bakal ngapain?",
  "Lima tahun ke depan, kamu bayangin kita lagi ngapain?",
  "Kalau kita nanti punya anak, sifat siapa yang kamu harap lebih dominan menurun?",
  "Hari tua nanti, kamu bayangin kita berdua ngabisin waktu kayak gimana?",
  "Ada tradisi keluarga yang pengin banget kamu lanjutin sama aku nanti?",
  "Kalau kita nikah nanti, satu hal yang paling pengin kamu jaga dari hubungan kita sekarang apa?",
];

const truthBold: string[] = [
  "Jujur, kapan menurutmu aku paling attractive?",
  "Pernah nggak kamu pura-pura nggak kangen padahal sebenarnya kangen banget?",
  "Kalau disuruh pilih satu hal dari aku yang paling susah kamu tolak, apa?",
  "Pernah cemburu tapi memilih diam? Kapan?",
  "Hal paling bucin yang pernah kamu lakukan buat aku apa?",
  "Kalau aku deketin kamu pelan-pelan sekarang, reaksi kamu bakal gimana?",
  "Ada gerakan atau kebiasaan kecil aku yang bikin kamu langsung salah fokus?",
  "Jujur, siapa yang lebih sering mulai duluan kalau lagi mesra-mesraan?",
  "Kalau aku godain kamu di depan orang lain, kamu maunya gimana — lanjut atau berhenti?",
  "Momen mana yang bikin kamu diam-diam mikir 'aku beruntung banget punya dia'?",
];

// DARE — 50 cards across 8 categories
const dareRomantic: string[] = [
  "Peluk pasanganmu selama 20 detik tanpa ngomong apa-apa.",
  "Kasih pasanganmu satu pujian yang jarang kamu ucapin.",
  "Pegang tangan pasanganmu dan ceritain satu alasan kamu senang bareng dia.",
  "Kecup kening pasanganmu, terus bilang satu hal yang kamu syukurin dari dia.",
  "Peluk dari belakang selama 10 detik sambil bilang makasih buat satu hal hari ini.",
  "Tatap pasanganmu dan bilang 'aku sayang kamu' dengan cara yang belum pernah kamu coba sebelumnya.",
  "Rangkul pasanganmu dan sebutin tiga hal kecil yang bikin kamu jatuh cinta ulang tiap hari.",
];

const dareFunny: string[] = [
  "Tirukan cara pasanganmu kalau lagi ngambek.",
  "Peragakan gaya jalan pasanganmu waktu baru bangun tidur.",
  "Buat suara tawa paling aneh yang bisa kamu keluarin, lalu suruh pasangan nebak kamu ketawa kenapa.",
  "Nyanyikan potongan lagu galau dengan gaya paling lebay.",
  "Tirukan cara pasanganmu ngomong kalau lagi kesel sama kerjaan.",
  "Buat wajah paling aneh yang menurutmu bikin pasanganmu ketawa, tahan 5 detik.",
  "Praktikkan gaya pasanganmu kalau lagi pura-pura sibuk padahal cuma main HP.",
];

const dareActing: string[] = [
  "Selama 30 detik, pura-pura jadi pasanganmu — lengkap dengan kebiasaan bicaranya.",
  "Perankan momen pertama kali kalian ketemu, versi drama lebay.",
  "Jadi reporter dadakan dan wawancarai pasanganmu soal 'rahasia kesuksesan hubungan kalian'.",
  "Perankan gaya pasanganmu kalau lagi minta maaf.",
  "Jadi MC dadakan dan perkenalkan pasanganmu seolah dia tamu spesial acara TV.",
  "Perankan ulang adegan pertama kalian jadian, selengkap yang kamu ingat.",
];

const darePhoto: string[] = [
  "Foto berdua dengan pose paling aneh yang bisa kalian pikirkan.",
  "Ambil satu foto candid pasanganmu sekarang, tanpa aba-aba.",
  "Foto berdua sambil masing-masing bikin ekspresi kebalikan dari perasaan aslinya.",
  "Selfie berdua dengan gaya seolah baru menang lomba yang nggak jelas lombanya apa.",
  "Foto tangan kalian yang lagi gandengan, ambil dari angle paling kreatif.",
  "Foto berdua meniru pose foto pertama kalian waktu masih PDKT.",
];

const dareConfession: string[] = [
  "Bisikkan satu hal yang jarang kamu bilang ke pasanganmu.",
  "Akui satu kebiasaan kamu yang sebenarnya kamu tahu agak nyebelin buat pasangan.",
  "Ceritain satu momen kamu diam-diam kangen banget pas nggak lagi sama pasangan.",
  "Ngaku, pernah nggak kamu baca chat pasangan lebih dari sekali cuma buat mastiin maksudnya apa.",
  "Sebutin satu hal kecil yang bikin kamu diam-diam bangga sama pasanganmu.",
  "Akui satu kali kamu salah paham sama pasangan padahal masalahnya sepele banget.",
];

const dareTogether: string[] = [
  "Buat handshake versi kalian sendiri, minimal 5 gerakan.",
  "Kompakkan satu gerakan tari singkat dalam 15 detik.",
  "Coba ucapin kalimat yang sama persis bareng-bareng dalam hitungan ketiga.",
  "Buat julukan pasangan baru buat diri kalian berdua, sepakati sekarang.",
  "Tentukan bareng satu 'lagu tema' resmi buat hubungan kalian.",
  "Susun rencana kencan dadakan buat minggu ini, putuskan dalam satu menit.",
];

const dareGuess: string[] = [
  "Tebak makanan yang paling pengin dimakan pasanganmu sekarang.",
  "Tebak mood pasanganmu hari ini dalam satu kata, tanpa nanya dulu.",
  "Tebak film atau series yang paling ingin ditonton ulang oleh pasanganmu.",
  "Tebak satu barang di tas atau kantong pasanganmu sekarang.",
  "Tebak siapa yang paling sering diomongin pasanganmu kalau cerita soal temannya.",
  "Tebak jam berapa biasanya pasanganmu paling capek dalam sehari.",
];

const dareFlirty: string[] = [
  "Tatap mata pasanganmu selama 15 detik. Yang ketawa duluan kalah.",
  "Godain pasanganmu pakai gombalan receh, buat dia senyum dalam 10 detik.",
  "Kalau nyaman, kasih kode paling menggoda yang biasa kamu pakai ke pasangan.",
  "Bilang ke pasangan satu alasan kenapa dia susah buat dilupain.",
  "Kalau nyaman, coba deketin wajah pasangan pelan-pelan sampai dia yang gerak duluan.",
  "Kasih pasangan tatapan paling menggoda yang kamu punya, tahan sampai dia salah tingkah.",
];

function build(list: string[], type: "truth" | "dare", category: Card["category"], prefix: string): Card[] {
  return list.map((content, i) => ({
    id: `${prefix}${String(i + 1).padStart(3, "0")}`,
    type,
    category,
    content,
  }));
}

export const CARDS: Card[] = [
  ...build(truthFun, "truth", "fun", "tf"),
  ...build(truthLove, "truth", "love", "tl"),
  ...build(truthCurious, "truth", "curious", "tc"),
  ...build(truthDeep, "truth", "deep", "td"),
  ...build(truthPrivate, "truth", "private", "tp"),
  ...build(truthFuture, "truth", "future", "tu"),
  ...build(truthBold, "truth", "bold", "tb"),
  ...build(dareRomantic, "dare", "romantic", "dr"),
  ...build(dareFunny, "dare", "funny", "df"),
  ...build(dareActing, "dare", "acting", "da"),
  ...build(darePhoto, "dare", "photo", "dp"),
  ...build(dareConfession, "dare", "confession", "dc"),
  ...build(dareTogether, "dare", "together", "dg"),
  ...build(dareGuess, "dare", "guess", "dq"),
  ...build(dareFlirty, "dare", "flirty", "dy"),
];

export const CATEGORY_META: Record<
  Card["category"],
  { label: string; emoji: string }
> = {
  fun: { label: "Fun", emoji: "😂" },
  love: { label: "Love", emoji: "❤️" },
  curious: { label: "Curious", emoji: "👀" },
  deep: { label: "Deep", emoji: "💬" },
  private: { label: "Private", emoji: "🔐" },
  future: { label: "Future", emoji: "💍" },
  bold: { label: "Bold", emoji: "😈" },
  romantic: { label: "Romantic", emoji: "❤️" },
  funny: { label: "Funny", emoji: "😂" },
  acting: { label: "Acting", emoji: "🎭" },
  photo: { label: "Photo", emoji: "📸" },
  confession: { label: "Confession", emoji: "💬" },
  together: { label: "Together", emoji: "🤝" },
  guess: { label: "Guess", emoji: "🧠" },
  flirty: { label: "Flirty", emoji: "😈" },
};
