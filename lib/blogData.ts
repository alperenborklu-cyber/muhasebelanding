export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Mali Müşavirlik" | "Devlet Teşvikleri" | "Yönetim Muhasebesi" | "KOSGEB" | "Vergi Mevzuatı";
  date: string;
  readTime: string;
  image: string;
  author: string;
  content: string[];
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "2026-sgk-istihdam-tesvikleri-rehberi",
    title: "2026 Yılında Şirketlerin Yararlanabileceği SGK İstihdam Teşvikleri",
    excerpt: "Personel maliyetlerinizi %20 ila %35 oranında düşüren güncel SGK prim teşvikleri, geriye dönük hak kazanımları ve başvuru adımları.",
    category: "Mali Müşavirlik",
    date: "15 Ocak 2026",
    readTime: "4 dk okuma",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    author: "ROTAYD Teşvik Departmanı",
    tags: ["SGK Teşvikleri", "İstihdam", "Personel Maliyeti", "6111 Teşviki"],
    content: [
      "Türkiye'de faaliyet gösteren işletmelerin en önemli gider kalemlerinden biri istihdam maliyetleridir. Sosyal Güvenlik Kurumu (SGK) ve İŞKUR tarafından yürütülen teşvik programları, doğru analiz edildiğinde şirket bütçelerinde milyonlarca liralık tasarruf sağlayabilir.",
      "6111 Sayılı Genç ve Kadın İstihdamı Teşviki, 7103 Sayılı İmalat ve Bilişim Teşviki ve engelli istihdamı indirimleri başta olmak üzere, ortalama sigortalı sayısına göre hesaplanan haklar çoğu şirket tarafından farkında olmadan kaçırılmaktadır.",
      "ROTAYD olarak geliştirdiğimiz analitik yazılımlarla geriye dönük 6 aylık ve cari dönem personel bordrolarınızı tarıyor, yasal haklarınızı kuruşu kuruşuna tespit ederek şirketinize nakit tasarruf kazandırıyoruz."
    ]
  },
  {
    id: "2",
    slug: "yatirim-tesvik-belgesi-ile-kdv-ve-gumruk-muafiyeti",
    title: "Yatırım Teşvik Belgesi ile Sıfır KDV ve Gümrük Muafiyeti Rehberi",
    excerpt: "Makine ve teçhizat alımlarında %20 KDV istisnası, gümrük vergisi muafiyeti ve %90'a varan kurumlar vergisi indirimi kazanma stratejisi.",
    category: "Devlet Teşvikleri",
    date: "28 Ocak 2026",
    readTime: "5 dk okuma",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    author: "ROTAYD Yatırım Masası",
    tags: ["Yatırım Teşvik", "KDV İstisnası", "Gümrük Muafiyeti", "Vergi İndirimi"],
    content: [
      "Yeni bir fabrika kurmak, mevcut kapasiteyi artırmak veya teknolojik yenileme yapmak isteyen işletmeler için Sanayi ve Teknoloji Bakanlığı Yatırım Teşvik Belgesi hayati önem taşır.",
      "Yatırım Teşvik Belgesi alan işletmeler; ithal edilecek makinelerde gümrük vergisi ödemez, yurt içinden veya yurt dışından temin edilen makinelerde KDV ödemez ve yatırıma katkı oranı nispetinde kurumlar vergisini neredeyse sıfırlayabilir.",
      "ROTAYD uzmanları, yatırımınızın lokasyonuna ve sektör koduna göre en avantajlı teşvik bölgesini belirler, dosyanızı hazırlar ve belge tamamlama vizesine kadar tüm süreci uçtan uca yönetir."
    ]
  },
  {
    id: "3",
    slug: "yonetim-muhasebesi-ile-sirket-karliligini-artirma",
    title: "Yönetim Muhasebesi ile Şirket Kârlılığını Artırmanın 5 Stratejisi",
    excerpt: "Geleneksel vergi muhasebesinin ötesine geçerek maliyet analizi, nakit akış simülasyonu ve aylık yönetim raporlamasıyla kârlılığı maksimize edin.",
    category: "Yönetim Muhasebesi",
    date: "04 Şubat 2026",
    readTime: "6 dk okuma",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    author: "Süleyman Bey & Mali Analiz Ekibi",
    tags: ["Yönetim Muhasebesi", "Finansal Analiz", "Kârlılık", "Bütçe Planlama"],
    content: [
      "Geleneksel muhasebe geçmişi kaydeder; yönetim muhasebesi ise geleceğe yön verir. Şirket yöneticilerinin doğru zamanda doğru yatırımı yapabilmesi için anlık mali göstergelere ihtiyacı vardır.",
      "1. Birim Maliyet Ayrıştırması: Hangi ürün veya hizmetin gerçekte ne kadar kâr bıraktığını tespit edin.\n2. Nakit Akış Simülasyonu: Beklenmeyen nakit sıkışıklıklarını en az 90 gün önceden öngörün.\n3. Başabaş (Break-Even) Noktası Takibi: Sabit ve değişken gider dengesini optimize edin.",
      "ROTAYD, şirket yönetim kurullarına özel hazırladığı dashboard ve periyodik sunumlarla kârlılığı optimize eden finansal mimariyi kurmaktadır."
    ]
  },
  {
    id: "4",
    slug: "kosgeb-yesil-sanayi-ve-kobigel-destekleri-2026",
    title: "KOSGEB Yeşil Sanayi ve KOBİGEL Destekleri Başvuru Kriterleri",
    excerpt: "Güneş enerjisi (GES), enerji verimliliği ve dijitalleşme yatırımlarında KOBİ'lere sunulan milyonlarca liralık geri ödemesiz hibe programları.",
    category: "KOSGEB",
    date: "11 Şubat 2026",
    readTime: "4 dk okuma",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    author: "ROTAYD Hibe & Proje Departmanı",
    tags: ["KOSGEB", "Yeşil Sanayi", "KOBİGEL", "Geri Ödemesiz Hibe"],
    content: [
      "KOSGEB tarafından Avrupa Yeşil Mutabakatı uyum süreci kapsamında devreye alınan Yeşil Sanayi Destek Programı, enerji tüketimini azaltan ve karbon ayak izini düşüren işletmelere büyük ölçekli kaynak aktarmaktadır.",
      "KOBİGEL kapsamında dijital dönüşüm, otomasyon, ERP yazılım yatırımları ve modern tezgah alımları %70 ila %85 oranında desteklenmektedir.",
      "Proje dosyasının eksiksiz kurgulanması, bağımsız değerlendirici puanlamasında en yüksek skoru almak için ROTAYD danışmanları tam destek vermektedir."
    ]
  },
  {
    id: "5",
    slug: "2026-e-defter-ve-e-fatura-donusumunde-yasal-zorunluluklar",
    title: "2026 E-Defter ve E-Fatura Dönüşümünde Dikkat Edilmesi Gerekenler",
    excerpt: "Ciro limitlerinin güncellenmesiyle e-uygulamalara dahil olması gereken sektörler, saklama zorunlulukları ve vergi cezalarından korunma yolları.",
    category: "Vergi Mevzuatı",
    date: "18 Şubat 2026",
    readTime: "3 dk okuma",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    author: "ROTAYD Mevzuat Masası",
    tags: ["E-Defter", "E-Fatura", "VUK", "Vergi Cezaları"],
    content: [
      "Gelir İdaresi Başkanlığı (GİB) tarafından yayımlanan tebliğlerle e-Dönüşüm zorunluluk kapsamı her yıl genişlemektedir. Brüt satış hasılatı kriterleri ve e-ticaret faaliyetinde bulunan şirketlerin sisteme entegrasyonu sıkı denetlenmektedir.",
      "Zamanında e-Defter beratı yüklememek veya e-Fatura yerine kağıt fatura düzenlemek özel usulsüzlük cezalarına yol açmaktadır.",
      "ROTAYD, müşterilerinin entegratör seçiminden yasal berat onaylarına kadar tüm dijital muhasebe süreçlerini sıfır hata prensibiyle yürütmektedir."
    ]
  },
  {
    id: "6",
    slug: "limited-sirketten-anonim-sirkete-gecisin-vergisel-avantajlari",
    title: "Limited Şirketten Anonim Şirkete Geçişin Vergisel Avantajları",
    excerpt: "2 yıl elde tutulan A.Ş. pay senetlerinin satışında %0 gelir vergisi istisnası, ortakların kamu borçlarından korunması ve kurumsal itibar.",
    category: "Mali Müşavirlik",
    date: "25 Şubat 2026",
    readTime: "5 dk okuma",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    author: "ROTAYD Şirketler Hukuku & Mali Birim",
    tags: ["Nevi Değişikliği", "Anonim Şirket", "Vergi Muafiyeti", "Hisse Devri"],
    content: [
      "Büyüyen KOBİ'lerin en çok tercih ettiği yapısal dönüşümlerin başında Limited Şirket'ten (LTD) Anonim Şirket'e (A.Ş.) nevi değişikliği gelmektedir.",
      "En kritik avantaj: Anonim şirketlerde basılı hisse senetleri veya geçici ilmuhaberler 2 yıl elde tutulduktan sonra satıldığında elde edilen değer artış kazancı tamamen gelir vergisinden muaftır. Ayrıca ortakların vergi/SGK borçlarına karşı şahsi mal varlığı sorumluluğu sınırlandırılır.",
      "ROTAYD, özvarlık tespit raporundan ticaret sicil tesciline kadar nevi değişikliği sürecini hiçbir vergi cezası veya aksama olmadan yönetmektedir."
    ]
  },
  {
    id: "7",
    slug: "ticaret-bakanligi-ihracat-destekleri-fuar-ve-kira-hibeleri",
    title: "Ticaret Bakanlığı İhracat Destekleri: Fuar ve Ofis Kira Hibeleri",
    excerpt: "Yurt dışı pazar araştırması, küresel fuar katılımları ve mağaza kira harcamalarınızın %50 ila %70'ini devlet hibesiyle geri alın.",
    category: "Devlet Teşvikleri",
    date: "01 Mart 2026",
    readTime: "4 dk okuma",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
    author: "ROTAYD İhracat Masası",
    tags: ["İhracat Teşvikleri", "Ticaret Bakanlığı", "Fuar Desteği", "Kira Hibesi"],
    content: [
      "Türkiye'den dünyaya açılan şirketlerin küresel rekabet gücünü artırmak amacıyla Ticaret Bakanlığı çok geniş kapsamlı destek paketleri sunmaktadır.",
      "Yurt dışı yetkili fuar harcamaları, hedef ülkelerde açılan ofis ve depo kiraları, marka tescil masrafları ve CE/ISO gibi uluslararası kalite sertifikasyonları hibe kapsamındadır.",
      "Desteklerin onaylanabilmesi için başvuru süreleri ve fatura akışlarının bakanlık yönergesine tam uyması gerekir. ROTAYD uzmanları evrak yönetimini titizlikle koordine eder."
    ]
  },
  {
    id: "8",
    slug: "ar-ge-ve-tasarim-merkezi-kurulumu-vergi-muafiyetleri",
    title: "Ar-Ge ve Tasarım Merkezi Kurmanın Sağladığı Vergi Muafiyetleri",
    excerpt: "Personel stopaj teşviki, %50 SGK işveren prim desteği, Ar-Ge indirimi ve gümrük vergisi istisnası ile kurumunuzu inovasyon üssüne dönüştürün.",
    category: "Devlet Teşvikleri",
    date: "10 Mart 2026",
    readTime: "6 dk okuma",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    author: "ROTAYD Teknoloji Masası",
    tags: ["Ar-Ge Merkezi", "Tasarım Merkezi", "Stopaj Teşviki", "TÜBİTAK"],
    content: [
      "5746 Sayılı Kanun kapsamında Ar-Ge veya Tasarım Merkezi belgesi alan şirketler muazzam vergisel ve finansal ayrıcalıklar kazanır.",
      "Merkezde çalışan personellerin gelir vergisi stopajı terkin edilir, damga vergisinden muaf tutulur ve yapılan Ar-Ge harcamalarının %100'ü kurumlar vergisi matrahından indirilir.",
      "ROTAYD; fizibilite, organizasyonel yapı, personel kotası ve bakanlık denetim sunumlarına kadar anahtar teslim merkez kurulumu gerçekleştirmektedir."
    ]
  },
  {
    id: "9",
    slug: "enflasyon-duzeltmesi-ve-sirket-bilancolarina-etkileri",
    title: "Enflasyon Düzeltmesi ve Şirket Bilançolarına Etkileri",
    excerpt: "Parasal olmayan kıymetlerin güncellenmesi, sermaye yapısı ve vergi matrahına yansımaları karşısında şirket yönetiminin alması gereken önlemler.",
    category: "Vergi Mevzuatı",
    date: "17 Mart 2026",
    readTime: "5 dk okuma",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    author: "ROTAYD Baş Denetçi Grubu",
    tags: ["Enflasyon Düzeltmesi", "Bilanço", "VUK", "Vergi Matrahı"],
    content: [
      "Enflasyon düzeltmesi, yüksek enflasyon dönemlerinde mali tabloların gerçek durumu yansıtması amacıyla uygulanan karmaşık bir muhasebe metodolojisidir.",
      "Duran varlıklar, stoklar ve özkaynak kalemlerinin düzeltme katsayılarıyla güncellenmesi bazı şirketlerde vergi yükü doğururken, bazı şirketlerde ise ciddi vergi kalkanı oluşturmaktadır.",
      "ROTAYD, firmanızın bilanço simülasyonunu önceden çıkartarak sürpriz vergi tahakkuklarının önüne geçer ve stratejik bilanço yönetimi sağlar."
    ]
  },
  {
    id: "10",
    slug: "bordrolama-sureclerinde-dis-kaynak-kullaniminin-faydalari",
    title: "Bordrolama Süreçlerinde Dış Kaynak (BPO) Kullanımının 6 Faydası",
    excerpt: "Maaş gizliliğinin korunması, yasal ceza risklerinin sıfırlanması ve İK departmanının ana iş hedeflerine odaklanmasını sağlayan modern yöntem.",
    category: "Mali Müşavirlik",
    date: "24 Mart 2026",
    readTime: "4 dk okuma",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    author: "ROTAYD Bordrolama Masası",
    tags: ["Bordrolama", "BPO", "İnsan Kaynakları", "Gizlilik"],
    content: [
      "Şirket içi maaş dengelerinin korunması ve çalışan gizliliği günümüz kurumsal dünyasında kritik bir konudur. Bordrolama sürecini dış kaynağa devreden işletmeler şirket içi bilgi sızıntılarını tamamen engeller.",
      "1. Tam Maaş Gizliliği\n2. SGK ve İş Kanunu Cezalarından %100 Muafiyet\n3. Zaman ve Yazılım Tasarrufu\n4. Kıdem ve İhbar Karşılıklarının Hatasız Takibi\n5. İstihdam Teşviklerinin Otomatik Entegrasyonu\n6. İK'nın Stratejik Yetenek Yönetimine Odaklanması.",
      "ROTAYD Bordrolama Hizmetleri, en üst düzey güvenlik protokolleriyle çalışanlarınızın haklarını ve şirketinizin itibarını korur."
    ]
  }
];
