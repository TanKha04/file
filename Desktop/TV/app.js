/* ==========================================================================
   📚 CORE LOGIC & SRS CONTROLLER - HỌC SIÊU NHANH
   ========================================================================== */

// 1. PRE-LOADED SEED DATABASE (Premium Hand-Curated Vocabulary from sieutuvung.com)
const SEED_VOCABULARY = [
    {
        id: "vocab-accuse",
        english_word: "Accuse",
        ipa: "/ə'kjuːz/",
        part_of_speech: "(v)",
        vietnamese_meaning: "Buộc tội, đổ lỗi",
        phonetic_cue: "ai cứu",
        surreal_story: "Tôi xin mọi người, <strong>ai</strong> đó hãy <strong>cứu</strong> lấy con tôi, con tôi bị <strong>buộc tội</strong> oan!",
        image_url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
        example_sentence: "He was accused of stealing money from the company.",
        topic: "work"
    },
    {
        id: "vocab-abandon",
        english_word: "Abandon",
        ipa: "/ə'bændən/",
        part_of_speech: "(v)",
        vietnamese_meaning: "Từ bỏ, ruồng bỏ",
        phonetic_cue: "a bản đồ",
        surreal_story: "<strong>A, bản đồ</strong> kho báu đây rồi! Dù chặng đường phía trước có gian nan nguy hiểm thế nào ta cũng quyết không <strong>từ bỏ</strong>.",
        image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
        example_sentence: "They had to abandon the car and walk the rest of the way.",
        topic: "travel"
    },
    {
        id: "vocab-ability",
        english_word: "Ability",
        ipa: "/ə'bɪlɪti/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Khả năng, năng lực",
        phonetic_cue: "a bị ly",
        surreal_story: "<strong>A! Bị ly</strong> nước đổ ụp vào đầu mà anh ta vẫn đứng giữ thăng bằng được trên xe đạp, thật là một <strong>khả năng</strong> phi thường!",
        image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        example_sentence: "He has the ability to solve complex mathematical equations rapidly.",
        topic: "education"
    },
    {
        id: "vocab-abuse",
        english_word: "Abuse",
        ipa: "/ə'bjuːz/",
        part_of_speech: "(v)",
        vietnamese_meaning: "Lạm dụng, bạo hành",
        phonetic_cue: "a bưu tá",
        surreal_story: "Gã đàn ông tàn nhẫn đã <strong>lạm dụng</strong> lòng tin và hành hạ cả chú chó đáng thương của <strong>a bưu tá</strong>.",
        image_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
        example_sentence: "It is illegal to abuse power for personal gain in office.",
        topic: "emotions"
    },
    {
        id: "vocab-acquire",
        english_word: "Acquire",
        ipa: "/ə'kwaɪə/",
        part_of_speech: "(v)",
        vietnamese_meaning: "Đạt được, thu được",
        phonetic_cue: "a qua ải",
        surreal_story: "Chỉ cần <strong>a qua ải</strong> này của trò chơi thôi là anh ấy sẽ <strong>đạt được</strong> thanh gươm huyền thoại mạnh nhất game.",
        image_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
        example_sentence: "She managed to acquire a reputation as a fine lawyer.",
        topic: "education"
    },
    {
        id: "vocab-agenda",
        english_word: "Agenda",
        ipa: "/ə'dʒendə/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Chương trình nghị sự, nhật trình",
        phonetic_cue: "a, dân ta",
        surreal_story: "<strong>A, dân ta</strong> đang tập trung thảo luận vô cùng sôi nổi về các điều khoản trong bản <strong>chương trình nghị sự</strong> mới.",
        image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
        example_sentence: "The committee place this topic at the top of their meeting agenda.",
        topic: "work"
    },
    {
        id: "vocab-amuse",
        english_word: "Amuse",
        ipa: "/ə'mjuːz/",
        part_of_speech: "(v)",
        vietnamese_meaning: "Làm cho vui, giải trí",
        phonetic_cue: "ai mưu sự",
        surreal_story: "<strong>Ai mưu sự</strong> mà lại đi làm trò hề xiếc khỉ nhảy múa để <strong>làm vui lòng</strong> đức vua đang tức giận thế kia?",
        image_url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80",
        example_sentence: "This funny game will surely amuse all the guests at the party.",
        topic: "emotions"
    },
    {
        id: "vocab-analyze",
        english_word: "Analyze",
        ipa: "/'ænəlaɪz/",
        part_of_speech: "(v)",
        vietnamese_meaning: "Phân tích, nghiên cứu",
        phonetic_cue: "ăn ăn lại",
        surreal_story: "Nhà khoa học vừa <strong>ăn</strong> rồi <strong>ăn lại</strong> chiếc bánh cũ để tiến hành <strong>phân tích</strong> mẫu hóa chất độc hại ẩn bên trong.",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        example_sentence: "Scientists need to analyze the data carefully before publishing it.",
        topic: "technology"
    },
    {
        id: "vocab-apologize",
        english_word: "Apologize",
        ipa: "/ə'pɒlədʒaɪz/",
        part_of_speech: "(v)",
        vietnamese_meaning: "Xin lỗi, tạ lỗi",
        phonetic_cue: "ăn bơ lo dai",
        surreal_story: "Lỡ <strong>ăn bơ lo dai</strong> của sếp mà không xin phép nên tôi phải lập tức cúi đầu <strong>xin lỗi</strong> để không bị trừ lương.",
        image_url: "https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=600&q=80",
        example_sentence: "We apologize for the delay in processing your flight.",
        topic: "emotions"
    },
    {
        id: "vocab-approve",
        english_word: "Approve",
        ipa: "/ə'pruːv/",
        part_of_speech: "(v)",
        vietnamese_meaning: "Tán thành, phê duyệt",
        phonetic_cue: "a, púp",
        surreal_story: "<strong>A! Púp</strong> măng non này đã chính thức được hội đồng nông nghiệp <strong>phê duyệt</strong> và tán thành để đem đi nhân giống.",
        image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
        example_sentence: "The manager will approve the marketing budget tomorrow.",
        topic: "work"
    },
    {
        id: "vocab-helmet",
        english_word: "Helmet",
        ipa: "/'helmɪt/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Mũ bảo hiểm",
        phonetic_cue: "héo mựt",
        surreal_story: "Chiếc lá <strong>héo</strong> dính đầy nước <strong>mực</strong> đen sì được dán lên chiếc <strong>mũ bảo hiểm</strong> độc lạ của tôi.",
        image_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
        example_sentence: "You must always wear a helmet when riding a motorbike.",
        topic: "travel"
    },
    {
        id: "vocab-cabinet",
        english_word: "Cabinet",
        ipa: "/'kæbɪnət/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Tủ có nhiều ngăn, nội các",
        phonetic_cue: "cạp bánh mì",
        surreal_story: "Cậu bé vừa <strong>cạp bánh mì</strong> ngấu nghiến vừa mở chiếc <strong>tủ có nhiều ngăn</strong> để cất giấu món đồ chơi bí mật.",
        image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
        example_sentence: "The documents are stored in the bottom drawer of the metal cabinet.",
        topic: "work"
    },
    {
        id: "vocab-campaign",
        english_word: "Campaign",
        ipa: "/kæm'peɪn/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Chiến dịch, cuộc vận động",
        phonetic_cue: "cắm trại",
        surreal_story: "Hội tình nguyện rủ nhau đi <strong>cắm trại</strong> trong rừng để gây quỹ hưởng ứng cho <strong>chiến dịch</strong> bảo vệ môi trường.",
        image_url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80",
        example_sentence: "The charity group launched a national fundraising campaign yesterday.",
        topic: "travel"
    },
    {
        id: "vocab-candidate",
        english_word: "Candidate",
        ipa: "/'kændɪdət/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Ứng cử viên, thí sinh",
        phonetic_cue: "kẹo đi đứt",
        surreal_story: "<strong>Ứng cử viên</strong> tổng thống khóc ròng vì toàn bộ túi <strong>kẹo đi đứt</strong> sạch vào tay ứng cử viên đối thủ.",
        image_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
        example_sentence: "She is the strongest candidate for the vacant leadership post.",
        topic: "education"
    },
    {
        id: "vocab-capital",
        english_word: "Capital",
        ipa: "/'kæpɪtl/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Thủ đô, vốn tài sản",
        phonetic_cue: "cặp vịt to",
        surreal_story: "Tôi dắt một <strong>cặp vịt to</strong> béo đi du lịch tự hào khắp các nẻo đường của <strong>thủ đô</strong> Hà Nội cổ kính.",
        image_url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
        example_sentence: "Hanoi is the capital of Vietnam, rich in cultural heritage.",
        topic: "travel"
    },
    {
        id: "vocab-disaster",
        english_word: "Disaster",
        ipa: "/dɪ'zɑːstə/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Thảm họa, tai ương",
        phonetic_cue: "đi xa sợ",
        surreal_story: "Mỗi lần xảy ra thiên tai <strong>thảm họa</strong>, ai nấy đều cuốn gói muốn <strong>đi xa</strong> vì quá <strong>sợ</strong> hãi.",
        image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
        example_sentence: "The flood disaster left thousands of families homeless in the province.",
        topic: "travel"
    },
    {
        id: "vocab-envelope",
        english_word: "Envelope",
        ipa: "/'envələʊp/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Phong bì, bao thư",
        phonetic_cue: "em vẽ lốp",
        surreal_story: "<strong>Em vẽ lốp</strong> xe ô tô ngộ nghĩnh lên mặt chiếc <strong>phong bì</strong> tình yêu để gửi tặng cho anh xã ở xa.",
        image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
        example_sentence: "Please remember to write the delivery address on the envelope.",
        topic: "work"
    },
    {
        id: "vocab-obstacle",
        english_word: "Obstacle",
        ipa: "/'ɒbstəkl/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Chướng ngại vật, trở ngại",
        phonetic_cue: "ốp tai cừu",
        surreal_story: "Phải đeo cái <strong>ốp tai cừu</strong> ấm áp này vào thì ta mới có đủ sức lực vượt qua <strong>chướng ngại vật</strong> bão tuyết nguy hiểm.",
        image_url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80",
        example_sentence: "Lack of funding is the main obstacle to the success of this project.",
        topic: "travel"
    },
    {
        id: "vocab-curious",
        english_word: "Curious",
        ipa: "/'kjʊəriəs/",
        part_of_speech: "(adj)",
        vietnamese_meaning: "Tò mò, hiếu kỳ",
        phonetic_cue: "cứu rỗi",
        surreal_story: "Sự <strong>tò mò</strong> muốn đi tìm nguồn sáng ấm áp của chú cừu nhỏ đã vô tình <strong>cứu rỗi</strong> cả đàn khỏi hang tối lạnh giá.",
        image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
        example_sentence: "Children are naturally curious about the world around them.",
        topic: "education"
    },
    {
        id: "vocab-adjust",
        english_word: "Adjust",
        ipa: "/ə'dʒʌst/",
        part_of_speech: "(v)",
        vietnamese_meaning: "Điều chỉnh, thích nghi",
        phonetic_cue: "a, chất",
        surreal_story: "<strong>A, chất</strong> lỏng hóa học này cần phải được <strong>điều chỉnh</strong> lại độ pH ngay để phản ứng xảy ra an toàn.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        example_sentence: "You can adjust the height of the office chair for maximum comfort.",
        topic: "technology"
    },
    {
        id: "vocab-attend",
        english_word: "Attend",
        ipa: "/ə'tend/",
        part_of_speech: "(v)",
        vietnamese_meaning: "Tham dự, có mặt",
        phonetic_cue: "anh tẩn",
        surreal_story: "Nếu ngày mai cậu không đến <strong>tham dự</strong> buổi lễ khai giảng trang trọng của trường, <strong>anh tẩn</strong> cậu đó nhé!",
        image_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
        example_sentence: "More than 500 delegates will attend the annual IT conference this week.",
        topic: "education"
    },
    {
        id: "vocab-avoid",
        english_word: "Avoid",
        ipa: "/ə'vɔɪd/",
        part_of_speech: "(v)",
        vietnamese_meaning: "Tránh né, phòng ngừa",
        phonetic_cue: "anh voi",
        surreal_story: "<strong>Anh voi</strong> khổng lồ đi lại cẩn thận luồn lách để <strong>tránh né</strong> việc giẫm nát vườn rau cải quý giá của người nông dân.",
        image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
        example_sentence: "We should drive carefully to avoid potential traffic accidents.",
        topic: "travel"
    },
    {
        id: "vocab-diet",
        english_word: "Diet",
        ipa: "/'daɪət/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Chế độ ăn kiêng, ăn uống",
        phonetic_cue: "đai ớt",
        surreal_story: "Để thực hiện nghiêm túc <strong>chế độ ăn kiêng</strong> khắc nghiệt này, cô ấy phải thắt một chiếc <strong>đai ớt</strong> cay xè quanh bụng để giảm cảm giác thèm ăn.",
        image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
        example_sentence: "It is essential to maintain a healthy and balanced diet every day.",
        topic: "food"
    },
    {
        id: "vocab-nutrition",
        english_word: "Nutrition",
        ipa: "/nju'trɪʃn/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Dinh dưỡng",
        phonetic_cue: "nữ trị sơn",
        surreal_story: "Vị <strong>nữ trị sơn</strong> nổi tiếng của vùng núi này chuyên bốc thuốc thảo mộc cực nhiều chất <strong>dinh dưỡng</strong> giúp bổ máu.",
        image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
        example_sentence: "A good diet must provide all the essential nutrition for physical growth.",
        topic: "food"
    },
    {
        id: "vocab-recipe",
        english_word: "Recipe",
        ipa: "/'resəpi/",
        part_of_speech: "(n)",
        vietnamese_meaning: "Công thức nấu ăn",
        phonetic_cue: "rẻ sấp bì",
        surreal_story: "Tôi mua được cuốn sách hướng dẫn <strong>công thức nấu ăn</strong> siêu ngon với giá vô cùng <strong>rẻ</strong>, bìa sách được đóng <strong>sấp bì</strong> da bóng loáng.",
        image_url: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=600&q=80",
        example_sentence: "She followed a traditional recipe to bake a delicious strawberry cake.",
        topic: "food"
    }
];

// Syllable Map for Smart Offline Phonetic Cue Generator
const SYLLABLE_MAP = {
    tion: 'sơn', sion: 'sơn', ment: 'mựt', ture: 'chờ', able: 'ây-bờ', ible: 'i-bờ',
    ing: 'inh', ed: 'tờ', ly: 'li', ty: 'ti', ful: 'phù', less: 'lét', ness: 'nét', ship: 'síp',
    con: 'kơn', com: 'kơm', pro: 'prô', pre: 'pri', ex: 'ếch', in: 'in', re: 'ri', de: 'đi', un: 'ăn',
    dis: 'đít', ad: 'át', sub: 'sắp', inter: 'in-tơ', trans: 'trăng', super: 'su-pơ', over: 'ô-vơ',
    under: 'ăn-dơ', ab: 'áp', ac: 'ác', al: 'eo', an: 'an', ap: 'áp', ar: 'a', as: 'át', at: 'át',
    be: 'bi', bi: 'bai', ca: 'ka', ce: 'xi', ch: 'chờ', co: 'kô', cu: 'kiu', di: 'đi', do: 'đu',
    du: 'đu', ee: 'i', ef: 'ép', el: 'eo', en: 'en', ep: 'ép', er: 'ơ', es: 'ét', et: 'ét',
    fa: 'pha', fe: 'phi', fi: 'phai', fl: 'phờ', fo: 'pho', fu: 'phu', ga: 'ga', ge: 'gi',
    gi: 'giai', go: 'gô', gr: 'gờ', gu: 'gu', ha: 'ha', he: 'hi', hi: 'hai', ho: 'hô', hu: 'hu',
    im: 'im', ir: 'ơ', it: 'ít', ja: 'gia', je: 're', jo: 'rô', ju: 'ru', ka: 'ka', ke: 'ki',
    ki: 'kai', ko: 'kô', ku: 'ku', la: 'la', le: 'le', li: 'li', lo: 'lô', lu: 'lu', ma: 'ma',
    me: 'mi', mi: 'mai', mo: 'mô', mu: 'mu', na: 'na', ne: 'ne', ni: 'nai', no: 'nô', nu: 'nu',
    ob: 'óp', oc: 'óc', of: 'óp', ol: 'ô', on: 'on', op: 'óp', or: 'o', os: 'ót', ot: 'ót',
    pa: 'pa', pe: 'pe', pi: 'pai', pl: 'pờ', po: 'pô', pu: 'pu', qu: 'kơ', ra: 'ra', re: 'ri',
    ri: 'rai', ro: 'rô', ru: 'ru', sa: 'sa', se: 'xi', si: 'sai', so: 'sô', su: 'su', ta: 'ta',
    te: 'te', ti: 'tai', to: 'tô', tu: 'tu', va: 'va', ve: 've', vi: 'vai', vo: 'vô', vu: 'vu',
    wa: 'wa', we: 'wi', wi: 'wai', wo: 'wơ', ya: 'da', ye: 'de', yi: 'di', yo: 'dô', za: 'za',
    ze: 'zi', zi: 'zai', zo: 'zô'
};

const OFFLINE_STORY_TEMPLATES = {
    work: [
        "Hãy tưởng tượng sếp bắt bạn phải ôm chiếc [CUE] trong lúc đang bàn bạc về [MEANING] ở văn phòng.",
        "Hôm nay công ty ra quy định mới: ai muốn thảo luận về [MEANING] thì phải vừa nói vừa hét to '[CUE]'.",
        "Đồng nghiệp bất ngờ tặng bạn một hộp [CUE] khổng lồ để chúc mừng bạn đạt được [MEANING] mới.",
        "Bạn quyết định giấu tài liệu về [MEANING] vào bên trong một chiếc [CUE] để tránh bị đối thủ phát hiện."
    ],
    travel: [
        "Trong chuyến đi [MEANING] tới vùng đất [CUE], bạn tình cờ phát hiện ra một cảnh tượng vô cùng kỳ lạ.",
        "Hãy tưởng tượng bạn đang lái xe đi [MEANING] thì gặp một biển báo hình [CUE] lấp lánh giữa đường.",
        "Vừa đặt chân đến [MEANING], hướng dẫn viên du lịch đã phát cho mỗi người một chiếc [CUE] để làm kỷ niệm.",
        "Bạn đang leo núi ngắm [MEANING] thì bỗng một chiếc [CUE] từ trên trời rơi ngay xuống trước mặt."
    ],
    education: [
        "Giáo sư yêu cầu cả lớp phải học thuộc nghĩa của [MEANING] bằng cách liên tưởng trực tiếp đến hình ảnh [CUE].",
        "Cuốn sách nghiên cứu về [MEANING] cổ xưa ghi lại rằng: mọi kiến thức vĩ đại đều bắt đầu từ một chiếc [CUE].",
        "Để vượt qua bài thi về [MEANING], học sinh phải đứng trên bục giảng và vẽ lại hình [CUE] lên bảng.",
        "Bạn ngồi trong lớp học về [MEANING] mà đầu óc cứ mơ màng nghĩ về một chiếc [CUE] khổng lồ ngoài cửa sổ."
    ],
    emotions: [
        "Cảm giác [MEANING] trào dâng mãnh liệt khiến bạn muốn lập tức chạy đi mua ngay một chiếc [CUE].",
        "Khi bạn cảm thấy [MEANING], gương mặt bạn bỗng tự động biến đổi thành hình [CUE] cực kỳ vui nhộn.",
        "Một người luôn tràn đầy [MEANING] thường mang theo một chiếc [CUE] may mắn bên mình để tự tin hơn.",
        "Nỗi [MEANING] của bạn bỗng chốc tan biến hoàn toàn khi nhìn thấy một chú hề đang cầm [CUE] nhảy múa."
    ],
    technology: [
        "Hệ thống máy tính thông minh tự động tối ưu hóa [MEANING] bằng cách liên kết trực tiếp với mã [CUE].",
        "Thuật toán mới nhất sử dụng hình ảnh [CUE] để phân tích và bảo mật toàn bộ dữ liệu [MEANING].",
        "Thiết bị công nghệ thực tế ảo tái hiện lại hình ảnh [MEANING] sống động và đẹp đẽ như một chiếc [CUE].",
        "Bạn vừa lập trình xong một robot chuyên về [MEANING] có hình dáng kỳ lạ giống hệt một chiếc [CUE]."
    ],
    food: [
        "Bác sĩ khuyên để tăng cường [MEANING] tốt nhất, bạn nên bổ sung món ăn chế biến từ [CUE] mỗi sáng.",
        "Món ăn thịnh soạn giúp cải thiện [MEANING] hôm nay được nấu hoàn toàn từ nguyên liệu đặc sắc là [CUE].",
        "Hãy tưởng tượng bạn đang ăn món ngon cho [MEANING] thì cắn trúng một vật thể giống hệt chiếc [CUE].",
        "Mỗi lần nhìn thấy món ăn hấp dẫn tốt cho [MEANING], bạn lại nghe tiếng nhạc hiệu [CUE] vang lên bên tai."
    ]
};

const OFFLINE_TOPIC_IMAGES = {
    work: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
    ],
    travel: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80"
    ],
    education: [
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
    ],
    emotions: [
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
    ],
    technology: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80"
    ],
    food: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=600&q=80"
    ]
};

// 2. STATE MANAGEMENT
let vocabulary = [];
let progress = {};
let currentView = 'dashboard';
let currentTopic = 'all';
let libraryCurrentPage = 1;
const libraryPageSize = 25;
let learnSessionWords = [];
let learnSessionIndex = 0;
let reviewSessionWords = [];
let reviewSessionIndex = 0;
let geminiApiKey = '';
let dailyGoalTarget = 5; // learn 5 new words or review due words
let userStreak = 0;
let lastStudyDate = '';

// ==========================================================================
// 3. MOTIVATIONAL QUOTES FOR ENGLISH LEARNING
// ==========================================================================

const MOTIVATION_QUOTES = [
    { quote: "\"The limits of my language mean the limits of my world.\"", author: "— Ludwig Wittgenstein", vi: "Giới hạn ngôn ngữ là giới hạn thế giới của tôi." },
    { quote: "\"One language sets you in a corridor for life. Two languages open every door along the way.\"", author: "— Frank Smith", vi: "Một ngôn ngữ đặt bạn vào một hành lang suốt đời. Hai ngôn ngữ mở mọi cánh cửa trên đường đi." },
    { quote: "\"To have another language is to possess a second soul.\"", author: "— Charlemagne", vi: "Biết thêm một ngôn ngữ là sở hữu thêm một tâm hồn." },
    { quote: "\"Learning another language is not only learning different words for the same things, but learning another way to think about things.\"", author: "— Flora Lewis", vi: "Học ngôn ngữ khác không chỉ là học từ mới, mà là học cách tư duy mới." },
    { quote: "\"Language is the road map of a culture. It tells you where its people come from and where they are going.\"", author: "— Rita Mae Brown", vi: "Ngôn ngữ là bản đồ văn hóa." },
    { quote: "\"A different language is a different vision of life.\"", author: "— Federico Fellini", vi: "Một ngôn ngữ khác là một tầm nhìn khác về cuộc sống." },
    { quote: "\"You can never understand one language until you understand at least two.\"", author: "— Geoffrey Willans", vi: "Bạn không thể hiểu một ngôn ngữ cho đến khi hiểu ít nhất hai." },
    { quote: "\"With languages, you are at home anywhere.\"", author: "— Edmund de Waal", vi: "Với ngôn ngữ, bạn như ở nhà ở bất cứ đâu." },
    { quote: "\"The more you read, the more things you will know. The more that you learn, the more places you'll go.\"", author: "— Dr. Seuss", vi: "Đọc càng nhiều, biết càng rộng. Học càng sâu, đi càng xa." },
    { quote: "\"Do not be afraid of making mistakes. That is the best way to learn.\"", author: "— Neil Gaiman", vi: "Đừng sợ mắc lỗi. Đó là cách học tốt nhất." },
    { quote: "\"Success is not final, failure is not fatal: it is the courage to continue that counts.\"", author: "— Winston Churchill", vi: "Thành công không phải là cuối cùng, thất bại không phải là chết chóc: chính lòng can đảm tiếp tục mới quan trọng." },
    { quote: "\"Every expert was once a beginner.\"", author: "— Helen Hayes", vi: "Mọi chuyên gia đều từng là người mới bắt đầu." },
    { quote: "\"The secret of getting ahead is getting started.\"", author: "— Mark Twain", vi: "Bí quyết để tiến lên phía trước là bắt đầu." },
    { quote: "\"It does not matter how slowly you go as long as you do not stop.\"", author: "— Confucius", vi: "Không quan trọng bạn đi chậm thế nào, miễn là đừng dừng lại." },
    { quote: "\"Education is the most powerful weapon which you can use to change the world.\"", author: "— Nelson Mandela", vi: "Giáo dục là vũ khí mạnh nhất để thay đổi thế giới." },
    { quote: "\"Học một ngôn ngữ mới giống như bắt đầu một cuộc sống mới.\"", author: "— Michel Bouthot", vi: "" },
    { quote: "\"Mỗi từ vựng bạn nhớ là một viên gạch xây lên tương lai của bạn.\"", author: "— Khuyết danh", vi: "" },
    { quote: "\"Ngày hôm nay bạn lười biếng, ngày mai bạn sẽ phải trả giá gấp đôi.\"", author: "— Khuyết danh", vi: "" },
    { quote: "\"Không có con đường tắt nào dẫn đến nơi đáng đi.\"", author: "— Beverly Sills", vi: "" },
    { quote: "\"Kiên trì mỗi ngày 5 từ, một năm bạn sẽ biết gần 2000 từ vựng.\"", author: "— Học Siêu Nhanh", vi: "" },
    { quote: "\"Discipline is the bridge between goals and accomplishment.\"", author: "— Jim Rohn", vi: "Kỷ luật là cầu nối giữa mục tiêu và thành tựu." },
    { quote: "\"The best time to plant a tree was 20 years ago. The second best time is now.\"", author: "— Proverb", vi: "Thời điểm tốt nhất để trồng cây là 20 năm trước. Thời điểm tốt thứ hai là ngay bây giờ." },
    { quote: "\"Hành trình vạn dặm bắt đầu từ một bước chân.\"", author: "— Lão Tử", vi: "" },
    { quote: "\"Người thông minh học từ sai lầm của người khác, người bình thường học từ sai lầm của chính mình.\"", author: "— Khuyết danh", vi: "" },
    { quote: "\"Your vocabulary is your intellectual currency. Invest in it daily.\"", author: "— Khuyết danh", vi: "Vốn từ vựng là tài sản trí tuệ. Hãy đầu tư mỗi ngày." },
    { quote: "\"Repetition is the mother of learning.\"", author: "— Proverb", vi: "Sự lặp lại là mẹ của tri thức." },
    { quote: "\"Có công mài sắt, có ngày nên kim. Mỗi từ bạn học hôm nay là một bước tiến vào tương lai.\"", author: "— Tục ngữ Việt Nam", vi: "" },
    { quote: "\"Đừng so sánh mình với người khác. Hãy so sánh mình hôm nay với mình ngày hôm qua.\"", author: "— Jordan Peterson", vi: "" },
    { quote: "\"Học tiếng Anh không khó, khó là ở chỗ kiên trì mỗi ngày.\"", author: "— Học Siêu Nhanh", vi: "" },
    { quote: "\"What we learn with pleasure we never forget.\"", author: "— Alfred Mercier", vi: "Điều chúng ta học với niềm vui, chúng ta không bao giờ quên." }
];

let currentQuoteIndex = -1;

function initMotivationQuotes() {
    showRandomQuote();
    
    const refreshBtn = document.getElementById('btn-refresh-quote');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            showRandomQuote();
        });
    }

    // Auto-rotate every 30 seconds
    setInterval(showRandomQuote, 30000);
}

function showRandomQuote() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * MOTIVATION_QUOTES.length);
    } while (newIndex === currentQuoteIndex && MOTIVATION_QUOTES.length > 1);
    
    currentQuoteIndex = newIndex;
    const q = MOTIVATION_QUOTES[currentQuoteIndex];
    
    const quoteEl = document.getElementById('motivation-quote');
    const authorEl = document.getElementById('motivation-author');
    
    if (quoteEl && authorEl) {
        // Animate out then in
        quoteEl.style.animation = 'none';
        authorEl.style.animation = 'none';
        
        // Force reflow
        void quoteEl.offsetWidth;
        
        quoteEl.textContent = q.quote;
        authorEl.textContent = q.author;
        
        // If has Vietnamese translation, show it below
        if (q.vi) {
            authorEl.innerHTML = q.author + ' <span style="color: var(--color-text-muted); font-weight: 400; font-style: italic; margin-left: 6px;">— ' + q.vi + '</span>';
        }
        
        quoteEl.style.animation = 'quoteSlideIn 0.5s ease-out';
        authorEl.style.animation = 'quoteSlideIn 0.6s ease-out';
    }
}

// ==========================================================================
// 4. INITIALIZATION & STORAGE SYNC
// ==========================================================================

window.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    initAppNavigation();
    initDashboard();
    initLearnView();
    initReviewView();
    initWritingView();
    initLibraryView();
    initSettingsModals();
    updateUIStats();
    checkDailyStreak();
    initMotivationQuotes();
});

function getStorageKey(baseKey) {
    const activeSyncCode = localStorage.getItem('sieu_sync_code') || '';
    if (activeSyncCode) {
        const prefix = activeSyncCode.replace(/[^a-zA-Z0-9]/g, '_');
        return `sieu_${prefix}_${baseKey}`;
    }
    return `sieu_${baseKey}`;
}

function initDatabase() {
    // Reset state before loading the user-specific database
    progress = {};
    vocabulary = [];

    // Sync Vocabulary list and progress
    const storedVocab = localStorage.getItem(getStorageKey('vocab_list'));
    const storedProgress = localStorage.getItem(getStorageKey('vocab_progress'));
    
    if (storedProgress) {
        progress = JSON.parse(storedProgress);
    }

    if (storedVocab) {
        vocabulary = JSON.parse(storedVocab);
    }

    // Auto-migrate to the authentic vocabulary database from sieutuvung.com
    // Force re-sync if vocabulary count doesn't match SCRAPED_VOCABULARY (e.g., after filtering to authentic-only)
    if ((!storedVocab || vocabulary.length !== (typeof SCRAPED_VOCABULARY !== 'undefined' ? SCRAPED_VOCABULARY.length : 0)) && typeof SCRAPED_VOCABULARY !== 'undefined') {
        console.log("Loading/syncing authentic vocabulary database from sieutuvung.com: " + SCRAPED_VOCABULARY.length + " words");
        vocabulary = [...SCRAPED_VOCABULARY];
        localStorage.setItem(getStorageKey('vocab_list'), JSON.stringify(vocabulary));
        
        vocabulary.forEach(word => {
            if (!progress[word.id]) {
                progress[word.id] = {
                    vocab_id: word.id,
                    current_level: 0,
                    next_review_date: new Date().toISOString().split('T')[0], // today
                    last_reviewed: null,
                    ease_factor: 2.5,
                    interval: 0,
                    repetitions: 0
                };
            }
        });
        localStorage.setItem(getStorageKey('vocab_progress'), JSON.stringify(progress));
    } else if (storedVocab && typeof SCRAPED_VOCABULARY !== 'undefined') {
        // Auto-merge newly scraped/enriched premium cards without losing SRS learning progress
        let updatedCount = 0;
        vocabulary = vocabulary.map(v => {
            const enriched = SCRAPED_VOCABULARY.find(sv => sv.english_word.toLowerCase() === v.english_word.toLowerCase());
            if (enriched) {
                // Update with authentic premium card details if the stored one has placeholders
                const needsImageUpdate = enriched.image_url.includes('sieutuvung.com') && !v.image_url.includes('sieutuvung.com');
                const needsStoryUpdate = enriched.surreal_story.includes('class=') && !v.surreal_story.includes('class=');
                if (needsImageUpdate || needsStoryUpdate) {
                    updatedCount++;
                    return {
                        ...v,
                        phonetic_cue: enriched.phonetic_cue,
                        surreal_story: enriched.surreal_story,
                        image_url: enriched.image_url,
                        ipa: enriched.ipa || v.ipa
                    };
                }
            }
            return v;
        });
        if (updatedCount > 0) {
            console.log(`Auto-merged ${updatedCount} authentic premium cards into localStorage database.`);
            localStorage.setItem(getStorageKey('vocab_list'), JSON.stringify(vocabulary));
        }
    } else if (!storedVocab) {
        // Fallback for clean start when no SCRAPED_VOCABULARY is present
        vocabulary = [...SEED_VOCABULARY];
        localStorage.setItem(getStorageKey('vocab_list'), JSON.stringify(vocabulary));
        
        vocabulary.forEach(word => {
            progress[word.id] = {
                vocab_id: word.id,
                current_level: 0,
                next_review_date: new Date().toISOString().split('T')[0],
                last_reviewed: null,
                ease_factor: 2.5,
                interval: 0,
                repetitions: 0
            };
        });
        localStorage.setItem(getStorageKey('vocab_progress'), JSON.stringify(progress));
    }

    // Sync Settings & API Key
    geminiApiKey = localStorage.getItem('sieu_gemini_key') || '';
    userStreak = parseInt(localStorage.getItem(getStorageKey('streak')) || '0', 10);
    lastStudyDate = localStorage.getItem(getStorageKey('last_study_date')) || '';
}

function saveDatabase() {
    localStorage.setItem(getStorageKey('vocab_list'), JSON.stringify(vocabulary));
    localStorage.setItem(getStorageKey('vocab_progress'), JSON.stringify(progress));
    localStorage.setItem(getStorageKey('streak'), userStreak.toString());
    localStorage.setItem(getStorageKey('last_study_date'), lastStudyDate);
}

// ==========================================================================
// 4. SPACED REPETITION ALGORITHM (SM-2 ADAPTATION)
// ==========================================================================

/**
 * Calculates new interval, ease factor and level using SM-2
 * @param {Object} itemProgress - The current progress object for a word
 * @param {number} grade - Grade assessed by user (0: Forgot, 1: Hard, 2: Good, 3: Easy)
 */
function calculateSM2(itemProgress, grade) {
    let { current_level, ease_factor, interval, repetitions } = itemProgress;
    
    // Default level fallback
    if (!current_level || current_level < 1) {
        current_level = 1;
    }
    
    let next_interval = 0;
    let next_level = current_level;
    let isMastered = false;

    if (grade === 3) { // 🔥 DỄ
        // Lịch ôn: hôm nay (level 1), +7 ngày (level 2), +14 ngày (level 3), +30 ngày (level 4), +90 ngày (level 5)
        const intervals = [0, 7, 14, 30, 90];
        if (current_level >= 5) {
            isMastered = true;
            next_interval = 99999;
            next_level = 6;
        } else {
            next_interval = intervals[current_level] || 90;
            next_level = current_level + 1;
        }
        repetitions++;
    } else if (grade === 2) { // 👍 TỐT
        // Lịch ôn: hôm nay (level 1), +1 ngày (level 2), +3 ngày (level 3), +7 ngày (level 4), +14 ngày (level 5), +30 ngày (level 6), +90 ngày (level 7)
        const intervals = [0, 1, 3, 7, 14, 30, 90];
        if (current_level >= 7) {
            isMastered = true;
            next_interval = 99999;
            next_level = 8;
        } else {
            next_interval = intervals[current_level] || 90;
            next_level = current_level + 1;
        }
        repetitions++;
    } else if (grade === 1) { // ⚠️ KHÓ
        // Lịch ôn: hôm nay (level 1), +1 ngày (level 2), +1 ngày (level 3), +3 ngày (level 4), +7 ngày (level 5), +14 ngày (level 6), +30 ngày (level 7), +90 ngày (level 8)
        const intervals = [0, 1, 1, 3, 7, 14, 30, 90];
        if (current_level >= 8) {
            isMastered = true;
            next_interval = 99999;
            next_level = 9;
        } else {
            next_interval = intervals[current_level] || 90;
            next_level = current_level + 1;
        }
        repetitions++;
    } else { // ❌ QUÊN
        // Relearning state
        next_interval = 0; // immediate review again today
        next_level = 1;    // reset back to Level 1
        repetitions = 0;   // reset learning progress
    }

    // Set next review date
    const today = new Date();
    today.setDate(today.getDate() + next_interval);
    const next_review_date = today.toISOString().split('T')[0];

    return {
        vocab_id: itemProgress.vocab_id,
        current_level: next_level,
        interval: next_interval,
        ease_factor: 2.5,
        repetitions: repetitions,
        next_review_date,
        last_reviewed: new Date().toISOString().split('T')[0],
        date_learned: itemProgress.date_learned || (grade > 0 ? new Date().toISOString().split('T')[0] : null)
    };
}

// ==========================================================================
// 5. VIEW CONTROL & STATE UPDATES
// ==========================================================================

function initAppNavigation() {
    const navButtons = document.querySelectorAll('.nav-item');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = btn.dataset.view;
            switchView(targetView);
        });
    });
}

function switchView(viewName) {
    currentView = viewName;
    
    // Toggle active view elements
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active');
    });
    
    const activeViewEl = document.getElementById(`view-${viewName}`);
    if (activeViewEl) {
        activeViewEl.classList.add('active');
    }

    // Update active nav button
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewName) {
            btn.classList.add('active');
        }
    });

    // Specific loaders per view
    if (viewName === 'dashboard') {
        initDashboard();
        updateUIStats();
    } else if (viewName === 'learn') {
        startLearnSession();
    } else if (viewName === 'review') {
        startReviewSession();
    } else if (viewName === 'writing') {
        startWritingSession();
    } else if (viewName === 'library') {
        renderLibraryTable();
    } else if (viewName === 'chat') {
        initChatView();
    }

    // Stop active chat polling interval when navigating away
    if (viewName !== 'chat' && window._chatPollTimer) {
        clearInterval(window._chatPollTimer);
        window._chatPollTimer = null;
        console.log('Stopped online chat polling');
    }

    // Update topbar title
    const titles = {
        dashboard: "Chào mừng trở lại! 👋",
        learn: "Giao Diện Học Từ Mới ⚡",
        review: "Ôn Tập Ngắt Quãng SRS 🔄",
        library: "Thư Viện Dữ Liệu Từ Vựng 📚",
        writing: "Ghép Chữ Luyện Viết ⌨️",
        chat: "Hệ Thống Nhắn Tin Trực Tuyến 💬"
    };
    const subtitles = {
        dashboard: "Hôm nay là một ngày tuyệt vời để ghi nhớ từ mới.",
        learn: "Phương pháp liên tưởng hình ảnh, âm thanh bồi độc đáo.",
        review: "Thách thức bộ não truy xuất thông tin từ vựng chủ động.",
        library: "Xem, sửa và tự tạo câu chuyện liên tưởng của riêng bạn.",
        writing: "Tăng khả năng phản xạ và ghi nhớ mặt chữ.",
        chat: "Trò chuyện và thảo luận học tập trực tiếp giữa các tài khoản."
    };
    
    document.getElementById('topbar-title').innerText = titles[viewName] || "Học Siêu Nhanh";
    document.getElementById('topbar-subtitle').innerText = subtitles[viewName] || "";
}

function updateUIStats() {
    const total = vocabulary.length;
    let newWords = 0;
    let dueWords = 0;
    let mastered = 0;

    const todayStr = new Date().toISOString().split('T')[0];

    vocabulary.forEach(word => {
        const itemProgress = progress[word.id];
        if (!itemProgress || (itemProgress.repetitions === 0 && itemProgress.current_level === 0)) {
            newWords++;
        } else if (itemProgress.interval >= 99999) {
            mastered++;
        }

        if (itemProgress && (itemProgress.repetitions > 0 || itemProgress.current_level > 0) && itemProgress.next_review_date <= todayStr && itemProgress.interval < 99999) {
            dueWords++;
        }
    });

    document.getElementById('stat-total').innerText = total;
    document.getElementById('stat-new').innerText = newWords;
    document.getElementById('stat-due').innerText = dueWords;
    document.getElementById('stat-mastered').innerText = mastered;

    // Sidebar & Mobile Bottom Nav badge & Dashboard buttons
    document.querySelectorAll('.review-badge').forEach(badge => {
        badge.innerText = dueWords;
        badge.style.display = dueWords > 0 ? 'inline-block' : 'none';
    });
    document.getElementById('quick-review-count').innerText = dueWords;

    // Topic counts
    const topicCounts = { all: total, work: 0, travel: 0, education: 0, emotions: 0, technology: 0, food: 0 };
    vocabulary.forEach(w => {
        if (topicCounts[w.topic] !== undefined) {
            topicCounts[w.topic]++;
        }
    });

    Object.keys(topicCounts).forEach(topic => {
        const el = document.getElementById(`topic-count-${topic}`);
        if (el) el.innerText = topicCounts[topic];
    });

    // Daily Goals Calculations
    updateDailyGoalProgress();
}

function getNewWordsLearnedToday() {
    const todayStr = new Date().toISOString().split('T')[0];
    let count = 0;
    Object.keys(progress).forEach(key => {
        if (progress[key].date_learned === todayStr) {
            count++;
        }
    });
    return count;
}

function getReviewedDueTodayCount() {
    const todayStr = new Date().toISOString().split('T')[0];
    let count = 0;
    Object.keys(progress).forEach(key => {
        const item = progress[key];
        if (item.last_reviewed === todayStr && item.date_learned !== todayStr && item.repetitions > 0) {
            count++;
        }
    });
    return count;
}

function getRemainingDueReviewsToday() {
    const todayStr = new Date().toISOString().split('T')[0];
    let count = 0;
    vocabulary.forEach(word => {
        const item = progress[word.id];
        if (item && item.repetitions > 0 && item.date_learned !== todayStr && item.next_review_date <= todayStr) {
            count++;
        }
    });
    return count;
}

function updateDailyGoalProgress() {
    const learnedToday = getNewWordsLearnedToday();
    const remainingDue = getRemainingDueReviewsToday();
    const reviewedDueToday = getReviewedDueTodayCount();

    const totalDueToday = remainingDue + reviewedDueToday;
    const learnGoalPercent = Math.min(100, (learnedToday / 5) * 100);
    const reviewGoalPercent = totalDueToday === 0 ? 100 : Math.round((reviewedDueToday / totalDueToday) * 100);
    
    let percent;
    if (totalDueToday === 0) {
        // If no reviews are due today, progress depends 100% on learning 5 new words
        percent = Math.round(learnGoalPercent);
    } else {
        // Otherwise, it is an even split between learning new words and finishing daily reviews
        percent = Math.round((learnGoalPercent + reviewGoalPercent) / 2);
    }

    document.getElementById('goal-percent').innerText = `${percent}%`;
    document.getElementById('goal-progress').style.width = `${percent}%`;

    const descEl = document.getElementById('goal-desc');
    
    if (learnedToday >= 5 && remainingDue === 0) {
        descEl.innerHTML = `<span class="text-green"><i class="fa-solid fa-circle-check"></i> Chúc mừng! Bạn đã hoàn thành xuất sắc mục tiêu ngày hôm nay (học đủ 5 từ mới và dò lại toàn bộ từ đến hạn)!</span>`;
    } else if (learnedToday < 5 && remainingDue > 0) {
        descEl.innerText = `Hôm nay bạn đã học ${learnedToday}/5 từ mới và còn ${remainingDue} từ cần ôn tập theo chu kỳ.`;
    } else if (learnedToday === 5 && remainingDue > 0) {
        descEl.innerText = `Đã học đủ 5 từ mới! Hãy ôn tập nốt ${remainingDue} từ đến hạn để hoàn thành chuỗi liên tiếp hôm nay.`;
    } else if (learnedToday < 5 && remainingDue === 0) {
        descEl.innerText = `Đã hoàn thành các từ ôn tập đến hạn! Hãy học thêm ${5 - learnedToday} từ mới để hoàn thành chuỗi liên tiếp hôm nay.`;
    }
}

function checkDailyStreak() {
    const todayStr = new Date().toISOString().split('T')[0];
    
    if (lastStudyDate === todayStr) {
        // already counted today
    } else if (lastStudyDate === "") {
        userStreak = 0;
    } else {
        // Check if yesterday was last study date to keep streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastStudyDate !== yesterdayStr) {
            userStreak = 0; // broke streak
        }
    }

    document.getElementById('streak-counter').innerText = `${userStreak} ngày liên tiếp`;
}

function registerStudyAction() {
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Streak completes ONLY when they learn exactly 5 new words AND review ALL due proposed words (remainingDue === 0)
    if (lastStudyDate !== todayStr) {
        const learnedToday = getNewWordsLearnedToday();
        const remainingDue = getRemainingDueReviewsToday();

        if (learnedToday >= 5 && remainingDue === 0) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastStudyDate === yesterdayStr || lastStudyDate === '') {
                userStreak++;
            } else {
                userStreak = 1;
            }
            lastStudyDate = todayStr;
            saveDatabase();
            checkDailyStreak();
            showToast("🎉 Xuất sắc! Bạn đã hoàn thành chuỗi liên tiếp ngày hôm nay!");
        }
    }
}

// ==========================================================================
// 6. DASHBOARD INTERACTIVITY
// ==========================================================================

function initDashboard() {
    // Topic Grid selection trigger
    const topicCards = document.querySelectorAll('.topic-card');
    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            topicCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentTopic = card.dataset.topic;
            
            // Auto navigate to Learning View
            switchView('learn');
        });
    });

    // Quick review button
    document.getElementById('btn-quick-review').onclick = () => {
        switchView('review');
    };
}

// ==========================================================================
// 7. VIEW 2: LEARNING FLOW CONTROLLER
// ==========================================================================

function initLearnView() {
    const cardEl = document.getElementById('learn-card');
    
    // Toggle card flip on click
    cardEl.addEventListener('click', () => {
        cardEl.classList.toggle('flipped');
        // Show/hide SRS grading area based on flip state
        const learnSrsArea = document.getElementById('learn-srs-area');
        if (cardEl.classList.contains('flipped')) {
            learnSrsArea.classList.remove('hide');
        } else {
            learnSrsArea.classList.add('hide');
        }
    });

    // Sound TTS triggers
    document.getElementById('btn-learn-voice').addEventListener('click', (e) => {
        e.stopPropagation(); // prevent card flip
        const wordText = document.getElementById('learn-word').innerText;
        speakWord(wordText);
    });

    // Next / Prev control
    document.getElementById('btn-learn-next').onclick = () => {
        if (learnSessionIndex < learnSessionWords.length - 1) {
            learnSessionIndex++;
            showLearnCard(learnSessionIndex);
        }
    };

    document.getElementById('btn-learn-prev').onclick = () => {
        if (learnSessionIndex > 0) {
            learnSessionIndex--;
            showLearnCard(learnSessionIndex);
        }
    };

    // Back to Dashboard
    document.getElementById('btn-learn-back').onclick = () => {
        switchView('dashboard');
    };

    // Action button to start SRS
    // "Đã hiểu, Tiếp tục" button — skip SRS grading and just advance
    document.getElementById('btn-start-srs').onclick = () => {
        const currentWord = learnSessionWords[learnSessionIndex];
        if (currentWord) {
            const todayStr = new Date().toISOString().split('T')[0];
            
            // 5-word per day limit enforcement
            if (getNewWordsLearnedToday() >= 5) {
                showToast("Mỗi ngày bạn chỉ được học tối đa 5 từ mới! Hãy ôn tập các từ cũ nhé.");
                return;
            }

            // Activate SRS track with default "Tốt" grade
            progress[currentWord.id] = {
                vocab_id: currentWord.id,
                current_level: 1,
                next_review_date: todayStr,
                last_reviewed: todayStr,
                date_learned: todayStr,
                ease_factor: 2.5,
                interval: 1,
                repetitions: 1
            };
            saveDatabase();
            registerStudyAction();
            updateUIStats();
            showToast(`Đã đưa "${currentWord.english_word}" vào vòng lặp ôn tập SRS!`);
            
            // Advance to next or trigger completion UI
            if (learnSessionIndex < learnSessionWords.length - 1) {
                learnSessionIndex++;
                showLearnCard(learnSessionIndex);
            } else {
                showToast("Bạn đã học hết từ vựng của chủ đề này!");
                switchView('dashboard');
            }
        }
    };

    // Attach SRS self-assessment grading events for Learn mode (4 buttons)
    const learnSrsButtons = document.querySelectorAll('[data-learn-grade]');
    learnSrsButtons.forEach(btn => {
        btn.onclick = () => {
            const grade = parseInt(btn.dataset.learnGrade, 10);
            submitLearnGrade(grade);
        };
    });

    // Go to Review from completed overlay
    document.getElementById('btn-learn-go-review').onclick = () => {
        switchView('review');
    };
    // Go to Home from completed overlay
    document.getElementById('btn-learn-go-home').onclick = () => {
        switchView('dashboard');
    };
}

function startLearnSession() {
    const activeLayout = document.querySelector('#view-learn .flashcard-layout');
    const completedState = document.getElementById('learn-completed-state');

    // 5-word per day limit check
    if (getNewWordsLearnedToday() >= 5) {
        if (activeLayout) activeLayout.classList.add('hide');
        if (completedState) completedState.classList.remove('hide');
        return;
    } else {
        if (activeLayout) activeLayout.classList.remove('hide');
        if (completedState) completedState.classList.add('hide');
    }

    // Filter words matching currentTopic AND must be UNLEARNED!
    let filteredTopicWords = [];
    if (currentTopic === 'all') {
        filteredTopicWords = [...vocabulary];
    } else {
        filteredTopicWords = vocabulary.filter(w => w.topic === currentTopic);
    }

    // Filter only UNLEARNED words: repetitions === 0 and current_level === 0
    learnSessionWords = filteredTopicWords.filter(word => {
        const itemProgress = progress[word.id];
        return !itemProgress || (itemProgress.repetitions === 0 && itemProgress.current_level === 0);
    });

    const topicLabels = {
        all: "Tất cả chủ đề",
        work: "💼 Công Việc & Công Sở",
        travel: "✈️ Du Lịch & Đời Sống",
        education: "🎓 Học Tập & Giáo Dục",
        emotions: "🧠 Cảm Xúc & Tính Cách",
        technology: "💻 Công Nghệ & Xã Hội",
        food: "🍎 Đồ Ăn & Sức Khỏe"
    };

    document.getElementById('learn-topic-badge').innerText = topicLabels[currentTopic] || "Tất cả";
    document.getElementById('learn-total-count').innerText = learnSessionWords.length;
    
    learnSessionIndex = 0;
    
    if (learnSessionWords.length > 0) {
        showLearnCard(learnSessionIndex);
        document.getElementById('learn-card').classList.remove('hide');
    } else {
        // empty topic fallback
        document.getElementById('learn-word').innerText = "Hết từ rồi";
        document.getElementById('learn-ipa').innerText = "";
        document.getElementById('learn-pos').innerText = "";
        document.getElementById('learn-meaning').innerText = "Hãy tự thêm từ mới!";
        document.getElementById('learn-cue').innerHTML = "Chủ đề này chưa có từ nào.";
        document.getElementById('learn-story').innerHTML = "Bấm vào 'Thư Viện Từ' để tạo từ mới.";
        document.getElementById('learn-total-count').innerText = "0";
        document.getElementById('learn-current-index').innerText = "0";
    }
}

function showLearnCard(index) {
    const card = learnSessionWords[index];
    if (!card) return;

    // Reset card state to front face
    const cardEl = document.getElementById('learn-card');
    cardEl.classList.remove('flipped');

    // Hide learn SRS grading area when showing a new card
    const learnSrsArea = document.getElementById('learn-srs-area');
    if (learnSrsArea) learnSrsArea.classList.add('hide');

    // Fill Front details
    document.getElementById('learn-word').innerText = card.english_word;
    document.getElementById('learn-ipa').innerText = card.ipa || "";
    document.getElementById('learn-pos').innerText = card.part_of_speech || "";

    // Fill Back details
    document.getElementById('learn-image').src = card.image_url || `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80`;
    document.getElementById('learn-meaning').innerText = card.vietnamese_meaning;
    document.getElementById('learn-cue').innerHTML = `Đọc gần giống: <strong>${card.phonetic_cue}</strong>`;
    document.getElementById('learn-story').innerHTML = card.surreal_story;

    if (card.example_sentence) {
        document.getElementById('learn-example-section').style.display = 'block';
        document.getElementById('learn-example').innerText = card.example_sentence;
    } else {
        document.getElementById('learn-example-section').style.display = 'none';
    }

    // Auto voice out on initial show
    setTimeout(() => speakWord(card.english_word), 500);

    // Update index & session navigation buttons
    document.getElementById('learn-current-index').innerText = index + 1;
    const progressPercent = Math.round(((index + 1) / learnSessionWords.length) * 100);
    document.getElementById('learn-progress-bar').style.width = `${progressPercent}%`;

    document.getElementById('btn-learn-prev').disabled = index === 0;
    document.getElementById('btn-learn-next').disabled = index === learnSessionWords.length - 1;
}

// Submit SRS self-assessment grade during Learn mode
function submitLearnGrade(grade) {
    const currentWord = learnSessionWords[learnSessionIndex];
    if (!currentWord) return;

    const todayStr = new Date().toISOString().split('T')[0];

    // 5-word per day limit enforcement
    if (!progress[currentWord.id] && getNewWordsLearnedToday() >= 5) {
        showToast("Mỗi ngày bạn chỉ được học tối đa 5 từ mới! Hãy ôn tập các từ cũ nhé.");
        return;
    }

    // Initialize progress for this word if it doesn't exist yet
    if (!progress[currentWord.id]) {
        progress[currentWord.id] = {
            vocab_id: currentWord.id,
            current_level: 1,
            next_review_date: todayStr,
            last_reviewed: todayStr,
            date_learned: todayStr,
            ease_factor: 2.5,
            interval: 1,
            repetitions: 1
        };
    }

    // Apply the SRS algorithm based on grade
    const updatedProgress = calculateSM2(progress[currentWord.id], grade);
    progress[currentWord.id] = updatedProgress;

    saveDatabase();
    registerStudyAction();
    updateUIStats();

    const gradeLabels = ['❌ Quên', '⚠️ Khó', '👍 Tốt', '🔥 Dễ'];
    showToast(`Đã ghi nhận "${currentWord.english_word}" → ${gradeLabels[grade]}`);

    // Advance to next or trigger completion UI
    if (learnSessionIndex < learnSessionWords.length - 1) {
        learnSessionIndex++;
        showLearnCard(learnSessionIndex);
    } else {
        showToast("Bạn đã học hết từ vựng của chủ đề này!");
        switchView('dashboard');
    }
}

// ==========================================================================
// 8. VIEW 3: SRS REVIEW FLOW CONTROLLER (Recall challenge)
// ==========================================================================

function initReviewView() {
    const cardEl = document.getElementById('review-card');
    
    // Toggle card flip on click
    cardEl.addEventListener('click', () => {
        if (!cardEl.classList.contains('flipped')) {
            revealAnswer();
        } else {
            cardEl.classList.remove('flipped');
        }
    });

    // Reveal trigger button
    document.getElementById('btn-reveal-card').onclick = () => {
        revealAnswer();
    };

    // Back to Dashboard
    document.getElementById('btn-review-back').onclick = () => {
        switchView('dashboard');
    };
    
    document.getElementById('btn-review-go-home').onclick = () => {
        switchView('dashboard');
    };

    // Free review button action
    document.getElementById('btn-review-all-learned').onclick = () => {
        startReviewSession(true);
    };

    // Voice synthesis on review
    document.getElementById('btn-review-voice').addEventListener('click', (e) => {
        e.stopPropagation();
        const wordText = document.getElementById('review-word').innerText;
        speakWord(wordText);
    });

    // Attach SRS evaluation grading events (4 buttons)
    const srsButtons = document.querySelectorAll('.btn-srs');
    srsButtons.forEach(btn => {
        btn.onclick = () => {
            const grade = parseInt(btn.dataset.grade, 10);
            submitReviewGrade(grade);
        };
    });
}

let isFreeReviewMode = false;

function startReviewSession(isFree = false) {
    isFreeReviewMode = isFree;
    const todayStr = new Date().toISOString().split('T')[0];
    
    if (isFree) {
        // Free review mode: get all learned words (repetitions > 0 || current_level > 0)
        reviewSessionWords = vocabulary.filter(word => {
            const itemProgress = progress[word.id];
            return itemProgress && (itemProgress.repetitions > 0 || itemProgress.current_level > 0);
        });
    } else {
        // Normal SRS review mode: get only due words that have been learned and not mastered
        reviewSessionWords = vocabulary.filter(word => {
            const itemProgress = progress[word.id];
            return itemProgress && (itemProgress.repetitions > 0 || itemProgress.current_level > 0) && itemProgress.next_review_date <= todayStr && itemProgress.interval < 99999;
        });
    }

    // Shuffle the list to randomize
    reviewSessionWords.sort(() => Math.random() - 0.5);
    reviewSessionIndex = 0;

    const activeArea = document.getElementById('review-active-area');
    const emptyState = document.getElementById('review-empty-state');

    if (reviewSessionWords.length > 0) {
        activeArea.classList.remove('hide');
        emptyState.classList.add('hide');
        showReviewCard(reviewSessionIndex);
        if (isFree) {
            showToast("Đã bắt đầu ôn tập tự do với toàn bộ các từ đã học!");
        }
    } else {
        activeArea.classList.add('hide');
        emptyState.classList.remove('hide');
        document.getElementById('review-remaining-count').innerText = "0";
    }
}

function updateSrsButtonsSubtext(itemProgress) {
    const level = (itemProgress && itemProgress.current_level) ? itemProgress.current_level : 1;
    
    const easyDays = level >= 5 ? 'Thuộc lòng' : `Ôn sau ${[0, 7, 14, 30, 90][level] || 90} ngày`;
    const goodDays = level >= 7 ? 'Thuộc lòng' : `Ôn sau ${[0, 1, 3, 7, 14, 30, 90][level] || 90} ngày`;
    const hardDays = level >= 8 ? 'Thuộc lòng' : `Ôn sau ${[0, 1, 1, 3, 7, 14, 30, 90][level] || 90} ngày`;

    const btnForgot = document.querySelector('.btn-srs-forgot .btn-srs-desc');
    const btnHard = document.querySelector('.btn-srs-hard .btn-srs-desc');
    const btnGood = document.querySelector('.btn-srs-good .btn-srs-desc');
    const btnEasy = document.querySelector('.btn-srs-easy .btn-srs-desc');

    if (btnForgot) btnForgot.innerText = 'Lặp lại ngay';
    if (btnHard) btnHard.innerText = hardDays;
    if (btnGood) btnGood.innerText = goodDays;
    if (btnEasy) btnEasy.innerText = easyDays;
}

function showReviewCard(index) {
    const card = reviewSessionWords[index];
    if (!card) return;

    // Reset card state to front face
    const cardEl = document.getElementById('review-card');
    cardEl.classList.remove('flipped');

    // Show front actions, hide grading actions
    document.getElementById('reveal-trigger-area').classList.remove('hide');
    document.getElementById('srs-options-area').classList.add('hide');

    // Update button descriptions dynamically based on level
    const wordProgress = progress[card.id];
    updateSrsButtonsSubtext(wordProgress);

    // Load Back details ready
    document.getElementById('review-word').innerText = card.english_word;
    document.getElementById('review-ipa').innerText = card.ipa || "";
    document.getElementById('review-meaning').innerText = card.vietnamese_meaning;
    document.getElementById('review-cue').innerHTML = `Đọc gần giống: <strong>${card.phonetic_cue}</strong>`;
    document.getElementById('review-story').innerHTML = card.surreal_story;
    document.getElementById('review-image').src = card.image_url || `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80`;

    // Active Recall Challenge: Randomize 50/50 displaying EITHER the English word OR the story image on the front
    const frontEl = document.getElementById('review-front-content');
    const isWordFront = Math.random() > 0.5;

    if (isWordFront) {
        frontEl.innerHTML = `
            <div class="recall-word-only">${card.english_word}</div>
            <p class="recall-caption-hint"><i class="fa-solid fa-brain"></i> Từ này nghĩa tiếng Việt và mẹo liên tưởng là gì?</p>
        `;
    } else {
        frontEl.innerHTML = `
            <img class="recall-image-only" src="${card.image_url}" alt="Recall Mnemonic Visual" onerror="this.src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'">
            <p class="recall-caption-hint"><i class="fa-solid fa-image"></i> Hình ảnh liên tưởng này tượng trưng cho từ tiếng Anh nào?</p>
        `;
    }

    document.getElementById('review-remaining-count').innerText = reviewSessionWords.length - index;
}

function revealAnswer() {
    const cardEl = document.getElementById('review-card');
    cardEl.classList.add('flipped');

    // Toggle control view
    document.getElementById('reveal-trigger-area').classList.add('hide');
    document.getElementById('srs-options-area').classList.remove('hide');

    // TTS pronunciation play
    const wordText = document.getElementById('review-word').innerText;
    speakWord(wordText);
}

function submitReviewGrade(grade) {
    const currentWord = reviewSessionWords[reviewSessionIndex];
    if (!currentWord) return;

    const itemProgress = progress[currentWord.id];
    if (itemProgress) {
        // Calculate new SRS date
        const updatedProgress = calculateSM2(itemProgress, grade);
        progress[currentWord.id] = updatedProgress;
        
        saveDatabase();
        registerStudyAction();
        updateUIStats();

        // Handle Forgot (grade === 0): put it at the end of the session to review again immediately
        if (grade === 0) {
            reviewSessionWords.push(currentWord);
            showToast(`Từ "${currentWord.english_word}" đã được đưa vào cuối hàng đợi để ôn lại ngay!`);
        }

        // Animate review progress and show next card
        if (reviewSessionIndex < reviewSessionWords.length - 1) {
            reviewSessionIndex++;
            showReviewCard(reviewSessionIndex);
        } else {
            showToast("Tuyệt vời! Bạn đã ôn tập xong toàn bộ từ trong lượt này!");
            if (isFreeReviewMode) {
                switchView('dashboard');
            } else {
                startReviewSession(); // reload reviews
            }
        }
    }
}

// ==========================================================================
// 9. VIEW 4: CRUD LIBRARY & WORD MANAGEMENT
// ==========================================================================

function initLibraryView() {
    // Search input handler
    document.getElementById('library-search').oninput = () => {
        libraryCurrentPage = 1; // reset page on search query
        renderLibraryTable();
    };

    // Topic filter selection handler
    document.getElementById('library-filter-topic').onchange = () => {
        libraryCurrentPage = 1; // reset page on filter change
        renderLibraryTable();
    };

    // Status filter selection handler
    document.getElementById('library-filter-status').onchange = () => {
        libraryCurrentPage = 1; // reset page on status change
        renderLibraryTable();
    };

    // Trigger Add Vocab Modal
    document.getElementById('btn-add-vocab').onclick = () => {
        openCrudModal(null);
    };

    // CRUD Modal form controls
    document.getElementById('btn-close-crud-modal').onclick = closeCrudModal;
    document.getElementById('btn-close-crud-modal-footer').onclick = closeCrudModal;

    // AI Generation Assistant click
    document.getElementById('btn-ai-assist-generate').onclick = triggerAIAssistant;

    // Save vocab handler
    document.getElementById('btn-save-crud').onclick = submitCrudForm;
}

function renderLibraryTable() {
    const tbody = document.getElementById('library-tbody');
    tbody.innerHTML = '';

    const query = document.getElementById('library-search').value.toLowerCase().trim();
    const filterTopic = document.getElementById('library-filter-topic').value;
    const filterStatus = document.getElementById('library-filter-status').value;

    const filtered = vocabulary.filter(w => {
        const matchesQuery = w.english_word.toLowerCase().includes(query) || 
                             w.vietnamese_meaning.toLowerCase().includes(query) || 
                             w.phonetic_cue.toLowerCase().includes(query) ||
                             w.surreal_story.toLowerCase().includes(query);
                             
        const matchesTopic = filterTopic === 'all' || w.topic === filterTopic;

        // Check if word is learned (level > 0)
        const wordProgress = progress[w.id];
        const isLearned = wordProgress && wordProgress.current_level > 0;
        
        let matchesStatus = true;
        if (filterStatus === 'learned') {
            matchesStatus = isLearned;
        } else if (filterStatus === 'unlearned') {
            matchesStatus = !isLearned;
        }

        return matchesQuery && matchesTopic && matchesStatus;
    });

    const topicLabels = {
        work: "💼 Công Việc",
        travel: "✈️ Du Lịch",
        education: "🎓 Giáo Dục",
        emotions: "🧠 Cảm Xúc",
        technology: "💻 Công Nghệ",
        food: "🍎 Sức Khỏe"
    };

    // Client-side pagination logic
    const totalPages = Math.ceil(filtered.length / libraryPageSize);
    if (libraryCurrentPage > totalPages && totalPages > 0) {
        libraryCurrentPage = totalPages;
    }

    const startIndex = (libraryCurrentPage - 1) * libraryPageSize;
    const endIndex = startIndex + libraryPageSize;
    const paginatedWords = filtered.slice(startIndex, endIndex);

    if (paginatedWords.length > 0) {
        paginatedWords.forEach(w => {
            const wordProgress = progress[w.id];
            const isLearned = wordProgress && wordProgress.current_level > 0;
            const statusBadge = isLearned 
                ? `<span class="badge" style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.22); color: #10b981; font-size: 0.7rem; padding: 2px 6px; border-radius: 6px; font-weight: 600; display: inline-block; margin-top: 4px;"><i class="fa-solid fa-circle-check"></i> Đã học</span>`
                : `<span class="badge" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.08); color: var(--color-text-muted); font-size: 0.7rem; padding: 2px 6px; border-radius: 6px; font-weight: 500; display: inline-block; margin-top: 4px;"><i class="fa-solid fa-circle-minus"></i> Chưa học</span>`;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <span class="tbl-word">${w.english_word}</span>
                    <br>${statusBadge}
                </td>
                <td>
                    <span class="tbl-ipa">${w.ipa}</span> <span class="tbl-pos">${w.part_of_speech || '(v)'}</span>
                </td>
                <td>
                    <span class="tbl-meaning">${w.vietnamese_meaning}</span>
                </td>
                <td>
                    <span class="tbl-cue">${w.phonetic_cue}</span>
                    <div class="tbl-story">${w.surreal_story}</div>
                </td>
                <td>
                    <span class="badge bg-purple-soft text-purple">${topicLabels[w.topic] || w.topic}</span>
                </td>
                <td>
                    <div class="tbl-actions">
                        <button class="btn-icon edit" onclick="openCrudModal('${w.id}')" title="Sửa từ">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteWord('${w.id}')" title="Xóa từ">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } else {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 30px; text-align: center; color: var(--color-text-secondary);">Không tìm thấy từ vựng nào khớp với kết quả tìm kiếm!</td></tr>`;
    }

    // Dynamically inject pagination controls
    let pagEl = document.getElementById('library-pagination');
    if (!pagEl) {
        pagEl = document.createElement('div');
        pagEl.id = 'library-pagination';
        pagEl.className = 'library-pagination';
        tbody.closest('.library-table-container').appendChild(pagEl);
    }

    if (totalPages > 1) {
        pagEl.style.display = 'flex';
        pagEl.innerHTML = `
            <button class="btn btn-secondary btn-sm" id="btn-lib-prev" ${libraryCurrentPage === 1 ? 'disabled' : ''}>
                <i class="fa-solid fa-chevron-left"></i> Trang Trước
            </button>
            <span class="pagination-info">Trang <strong>${libraryCurrentPage}</strong> / ${totalPages} (${filtered.length} từ)</span>
            <button class="btn btn-secondary btn-sm" id="btn-lib-next" ${libraryCurrentPage === totalPages ? 'disabled' : ''}>
                Trang Sau <i class="fa-solid fa-chevron-right"></i>
            </button>
        `;

        document.getElementById('btn-lib-prev').onclick = () => {
            if (libraryCurrentPage > 1) {
                libraryCurrentPage--;
                renderLibraryTable();
                tbody.closest('.library-table-container').scrollTop = 0;
            }
        };

        document.getElementById('btn-lib-next').onclick = () => {
            if (libraryCurrentPage < totalPages) {
                libraryCurrentPage++;
                renderLibraryTable();
                tbody.closest('.library-table-container').scrollTop = 0;
            }
        };
    } else {
        pagEl.style.display = 'none';
    }
}

function openCrudModal(wordId) {
    const modal = document.getElementById('modal-crud');
    const form = document.getElementById('crud-form');
    form.reset();

    if (wordId) {
        document.getElementById('crud-modal-title').innerHTML = `<i class="fa-solid fa-file-pen text-gradient"></i> Chỉnh Sửa Từ Vựng`;
        const word = vocabulary.find(w => w.id === wordId);
        if (word) {
            document.getElementById('crud-id').value = word.id;
            document.getElementById('crud-word').value = word.english_word;
            document.getElementById('crud-pos').value = word.part_of_speech || '(v)';
            document.getElementById('crud-ipa').value = word.ipa || '';
            document.getElementById('crud-topic').value = word.topic;
            document.getElementById('crud-meaning').value = word.vietnamese_meaning;
            document.getElementById('crud-cue').value = word.phonetic_cue;
            document.getElementById('crud-story').value = word.surreal_story.replace(/<\/?strong>/g, ''); // strip bold tags for clean editing
            document.getElementById('crud-image').value = word.image_url || '';
            document.getElementById('crud-example').value = word.example_sentence || '';
        }
    } else {
        document.getElementById('crud-modal-title').innerHTML = `<i class="fa-solid fa-plus text-gradient"></i> Thêm Từ Vựng Mới`;
        document.getElementById('crud-id').value = '';
    }

    modal.classList.remove('hide');
}

function closeCrudModal() {
    document.getElementById('modal-crud').classList.add('hide');
}

function submitCrudForm() {
    const id = document.getElementById('crud-id').value;
    const wordText = document.getElementById('crud-word').value.trim();
    const pos = document.getElementById('crud-pos').value;
    const ipa = document.getElementById('crud-ipa').value.trim() || `/${wordText.toLowerCase()}/`;
    const topic = document.getElementById('crud-topic').value;
    const meaning = document.getElementById('crud-meaning').value.trim();
    const cue = document.getElementById('crud-cue').value.trim();
    const storyRaw = document.getElementById('crud-story').value.trim();
    const image = document.getElementById('crud-image').value.trim();
    const example = document.getElementById('crud-example').value.trim();

    if (!wordText || !meaning || !cue || !storyRaw) {
        showToast("Vui lòng nhập đầy đủ các trường bắt buộc (*)!");
        return;
    }

    // Wrap bold formatting to story elements (cue, meaning) for high-impact visual representation
    let formattedStory = storyRaw;
    if (cue && !formattedStory.includes(`<strong>${cue}</strong>`)) {
        // case insensitive search for bold styling
        const regCue = new RegExp(`(${cue})`, 'gi');
        formattedStory = formattedStory.replace(regCue, "<strong>$1</strong>");
    }
    const meaningKeywords = meaning.split(/[,;]/);
    meaningKeywords.forEach(kw => {
        const keyword = kw.trim();
        if (keyword && !formattedStory.includes(`<strong>${keyword}</strong>`)) {
            const regKw = new RegExp(`(${keyword})`, 'gi');
            formattedStory = formattedStory.replace(regKw, "<strong>$1</strong>");
        }
    });

    const finalImage = image || `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80&sig=${wordText}`;

    if (id) {
        // Edit flow
        const idx = vocabulary.findIndex(w => w.id === id);
        if (idx !== -1) {
            vocabulary[idx] = {
                ...vocabulary[idx],
                english_word: wordText.charAt(0).toUpperCase() + wordText.slice(1),
                ipa,
                part_of_speech: pos,
                topic,
                vietnamese_meaning: meaning,
                phonetic_cue: cue,
                surreal_story: formattedStory,
                image_url: finalImage,
                example_sentence: example
            };
            showToast(`Đã lưu chỉnh sửa từ "${wordText}"!`);
        }
    } else {
        // Add flow
        const newId = `vocab-custom-${Date.now()}`;
        const newWord = {
            id: newId,
            english_word: wordText.charAt(0).toUpperCase() + wordText.slice(1),
            ipa,
            part_of_speech: pos,
            topic,
            vietnamese_meaning: meaning,
            phonetic_cue: cue,
            surreal_story: formattedStory,
            image_url: finalImage,
            example_sentence: example
        };

        vocabulary.push(newWord);

        // Instantly register this custom card to SRS loops list
        progress[newId] = {
            vocab_id: newId,
            current_level: 0,
            next_review_date: new Date().toISOString().split('T')[0], // immediate review
            last_reviewed: null,
            ease_factor: 2.5,
            interval: 0,
            repetitions: 0
        };

        showToast(`Đã thêm từ mới "${wordText}" thành công!`);
    }

    saveDatabase();
    closeCrudModal();
    updateUIStats();
    renderLibraryTable();
}

function deleteWord(id) {
    const word = vocabulary.find(w => w.id === id);
    if (!word) return;

    if (confirm(`Bạn có chắc chắn muốn xóa từ vựng "${word.english_word}" khỏi thư viện không?`)) {
        vocabulary = vocabulary.filter(w => w.id !== id);
        delete progress[id]; // clean progress
        saveDatabase();
        updateUIStats();
        renderLibraryTable();
        showToast(`Đã xóa từ "${word.english_word}" khỏi thư viện.`);
    }
}

// ==========================================================================
// 10. GOOGLE GEMINI PRO AI / OFFLINE TEMPLATE INTEGRATION
// ==========================================================================

async function triggerAIAssistant() {
    const wordInput = document.getElementById('crud-word').value.trim();
    const meaningInput = document.getElementById('crud-meaning').value.trim();
    const topicSelect = document.getElementById('crud-topic').value;

    if (!wordInput) {
        showToast("Vui lòng nhập từ tiếng Anh trước khi gọi trợ lý AI!");
        return;
    }

    const btn = document.getElementById('btn-ai-assist-generate');
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Trợ lý AI đang lên ý tưởng & vẽ ảnh...`;
    btn.disabled = true;

    try {
        if (geminiApiKey) {
            // Online Gemini AI Execution API call
            const result = await generateMnemonicOnline(wordInput, meaningInput, topicSelect);
            if (result) {
                document.getElementById('crud-ipa').value = result.ipa || `/${wordInput.toLowerCase()}/`;
                document.getElementById('crud-cue').value = result.phonetic_cue || '';
                document.getElementById('crud-story').value = result.surreal_story || '';
                if (result.example) document.getElementById('crud-example').value = result.example;
                
                // Fetch dynamic Unsplash signature URL
                document.getElementById('crud-image').value = `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80&sig=${wordInput}`;
                showToast("AI đã thiết lập câu chuyện & ảnh liên tưởng siêu việt!");
            }
        } else {
            // Smart Offline Mnemonic Generation Fallback
            await new Promise(r => setTimeout(r, 1200)); // smooth aesthetic loading
            const result = generateMnemonicOffline(wordInput, meaningInput, topicSelect);
            
            document.getElementById('crud-cue').value = result.phonetic_cue;
            document.getElementById('crud-story').value = result.surreal_story;
            document.getElementById('crud-image').value = result.image_url;
            showToast("Đã nạp câu chuyện & ảnh minh họa bằng Offline Mnemonic Engine!");
        }
    } catch (e) {
        console.error(e);
        showToast("Lỗi khi kết nối AI. Đang kích hoạt bộ sinh offline thay thế!");
        const result = generateMnemonicOffline(wordInput, meaningInput, topicSelect);
        document.getElementById('crud-cue').value = result.phonetic_cue;
        document.getElementById('crud-story').value = result.surreal_story;
        document.getElementById('crud-image').value = result.image_url;
    } finally {
        btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles text-gradient"></i> Tự Động Viết Câu Chuyện & Tìm Ảnh Ghi Nhớ Bằng AI`;
        btn.disabled = false;
    }
}

async function generateMnemonicOnline(word, meaning, topic) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;
    const prompt = `Bạn là một chuyên gia ngôn ngữ tiếng Anh và thiết kế học tập bằng phương pháp liên tưởng.
Hãy tạo phonetic cue (phiên âm bồi) và câu chuyện liên tưởng siêu thực (surreal story) bằng tiếng Việt cho từ tiếng Anh: "${word}" với nghĩa tiếng Việt là: "${meaning || "chưa biết"}".
Yêu cầu trả về chính xác định dạng JSON duy nhất, không giải thích dài dòng:
{
  "ipa": "/phiên âm của từ/",
  "phonetic_cue": "từ đồng âm bồi tiếng Việt đọc gần giống từ tiếng Anh",
  "surreal_story": "câu chuyện liên tưởng siêu thực chứa cụm từ đồng âm bồi và nghĩa tiếng Việt",
  "example": "một câu ví dụ tiếng Anh ngắn"
}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    // Clean raw blockquotes if returned by markdown
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
}

function generateMnemonicOffline(word, meaning, topic) {
    const w = word.toLowerCase();
    
    // 1. Generate Phonetic Cue matching suffix/syllable maps
    let cueParts = [];
    let remaining = w;

    // Check syllable parts sorted from longest
    const sortedKeys = Object.keys(SYLLABLE_MAP).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
        if (remaining.includes(key)) {
            cueParts.push(SYLLABLE_MAP[key]);
            remaining = remaining.replace(key, '');
        }
    }

    let phonetic_cue = '';
    if (cueParts.length === 0) {
        const half = Math.ceil(w.length / 2);
        phonetic_cue = w.substring(0, half) + " - bồi";
    } else {
        cueParts[0] = cueParts[0].charAt(0).toUpperCase() + cueParts[0].slice(1);
        phonetic_cue = cueParts.slice(0, 3).join(' - ');
    }

    // 2. Select matching offline story templates based on topic
    const topicTemplates = OFFLINE_STORY_TEMPLATES[topic] || OFFLINE_STORY_TEMPLATES.work;
    // pick pseudo-random template using character code summation
    let charSum = 0;
    for (let i = 0; i < word.length; i++) charSum += word.charCodeAt(i);
    const template = topicTemplates[charSum % topicTemplates.length];

    const finalMeaning = meaning || "nghĩa cụ thể";
    const surreal_story = template
        .replace('[CUE]', phonetic_cue.toUpperCase())
        .replace('[MEANING]', finalMeaning.toUpperCase());

    // 3. Select topic Unsplash image
    const imagesList = OFFLINE_TOPIC_IMAGES[topic] || OFFLINE_TOPIC_IMAGES.work;
    const image_url = imagesList[charSum % imagesList.length] + `&sig=${word}`;

    return {
        phonetic_cue,
        surreal_story,
        image_url
    };
}

// ==========================================================================
// 11. MODAL BOXES & SETTINGS INTERACTION
// ==========================================================================

function initSettingsModals() {
    // DB Setup Modal
    const dbModal = document.getElementById('modal-db');
    document.getElementById('btn-db-setup').onclick = () => {
        dbModal.classList.remove('hide');
    };
    document.getElementById('btn-close-db-modal').onclick = () => dbModal.classList.add('hide');
    document.getElementById('btn-close-db-modal-footer').onclick = () => dbModal.classList.add('hide');

    // DB tab togglers
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.onclick = () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(btn.dataset.tab).classList.add('active');
        };
    });

    // AI Config Modal
    const aiModal = document.getElementById('modal-ai');
    document.getElementById('btn-ai-config').onclick = () => {
        document.getElementById('gemini-key').value = geminiApiKey;
        aiModal.classList.remove('hide');
    };
    document.getElementById('btn-close-ai-modal').onclick = () => aiModal.classList.add('hide');
    
    // Save AI Key
    document.getElementById('btn-save-ai-config').onclick = () => {
        geminiApiKey = document.getElementById('gemini-key').value.trim();
        localStorage.setItem('sieu_gemini_key', geminiApiKey);
        aiModal.classList.add('hide');
        showToast("Đã cập nhật cấu hình API Key của Google Gemini AI!");
    };

    // Clear AI Key
    document.getElementById('btn-clear-ai-key').onclick = () => {
        geminiApiKey = '';
        localStorage.removeItem('sieu_gemini_key');
        document.getElementById('gemini-key').value = '';
        aiModal.classList.add('hide');
        showToast("Đã gỡ bỏ API Key thành công.");
    };
}

// ==========================================================================
// 12. TEXT TO SPEECH SYNTHESIS (TTS) & COMPONENT TOASTS
// ==========================================================================

function speakWord(text) {
    if (!text) return;
    
    // Clean text to keep only letters (remove special chars or punctuation for dictionary compatibility)
    const cleanedText = text.replace(/[^a-zA-Z\s-]/g, '').trim().toLowerCase();
    
    // Use high-quality natural human pronunciation API (American accent: type=2)
    const audioUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanedText)}&type=2`;
    
    const audio = new Audio(audioUrl);
    
    // Play with a promise fallback to handle mobile autoplay policies
    audio.play().then(() => {
        console.log(`🔊 Playing natural human pronunciation for: ${text}`);
    }).catch(err => {
        console.warn("⚠️ Audio element playback failed, trying fallback to native SpeechSynthesis:", err);
        // Fallback to native Web Speech API if Audio fails
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.85;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').innerText = message;
    
    toast.classList.remove('hide');
    
    // clear previous timeout if active
    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    
    window.toastTimeout = setTimeout(() => {
        toast.classList.add('hide');
    }, 3000);
}

// ==========================================================================
// 13. VIEW 5: SPELLING / WRITING CHALLENGE CONTROLLER
// ==========================================================================

let writingSessionWords = [];
let writingSessionIndex = 0;
let writingSelectedLetters = [];
let writingTargetWord = '';
let writingScrambledLetters = [];
let writingAnswerRevealed = false;

function initWritingView() {
    // Back to Dashboard
    document.getElementById('btn-writing-back').onclick = () => {
        switchView('dashboard');
    };

    // Reset button
    document.getElementById('btn-writing-reset').onclick = () => {
        resetWritingCard();
    };

    // Next button
    document.getElementById('btn-writing-next').onclick = () => {
        if (writingSessionIndex < writingSessionWords.length - 1) {
            writingSessionIndex++;
            showWritingCard(writingSessionIndex);
        } else {
            showToast("Chúc mừng! Bạn đã hoàn thành toàn bộ từ trong danh sách này!");
            switchView('dashboard');
        }
    };

    // Skip/Reveal Answer button
    document.getElementById('btn-writing-skip').onclick = () => {
        revealWritingAnswer();
    };
}

function startWritingSession() {
    // Filter words matching currentTopic AND must have been learned!
    let filteredTopicWords = [];
    if (currentTopic === 'all') {
        filteredTopicWords = [...vocabulary];
    } else {
        filteredTopicWords = vocabulary.filter(w => w.topic === currentTopic);
    }

    // Filter only learned words: progress entry exists and level/repetitions > 0
    writingSessionWords = filteredTopicWords.filter(word => {
        const itemProgress = progress[word.id];
        return itemProgress && (itemProgress.repetitions > 0 || itemProgress.current_level > 0);
    });

    const topicLabels = {
        all: "Tất cả chủ đề",
        work: "💼 Công Việc & Công Sở",
        travel: "✈️ Du Lịch & Đời Sống",
        education: "🎓 Học Tập & Giáo Dục",
        emotions: "🧠 Cảm Xúc & Tính Cách",
        technology: "💻 Công Nghệ & Xã Hội",
        food: "🍎 Đồ Ăn & Sức Khỏe"
    };

    document.getElementById('writing-topic-badge').innerText = topicLabels[currentTopic] || "Tất cả";
    document.getElementById('writing-total-count').innerText = writingSessionWords.length;
    
    // Shuffle writing session words to make learning dynamic
    writingSessionWords.sort(() => Math.random() - 0.5);
    writingSessionIndex = 0;

    if (writingSessionWords.length > 0) {
        // Reset slot view if previously hidden
        document.getElementById('writing-answer-slots').style.display = 'flex';
        document.getElementById('writing-letters-pool').style.display = 'flex';
        
        showWritingCard(writingSessionIndex);
    } else {
        // empty topic fallback / no learned words message
        document.getElementById('writing-image').src = `https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80`;
        document.getElementById('writing-meaning').innerText = "Bạn chưa học từ vựng nào thuộc chủ đề này!";
        document.getElementById('writing-cue').innerHTML = `<span class="text-orange"><i class="fa-solid fa-triangle-exclamation"></i> Vui lòng học tối thiểu 1 từ trong mục "Học Từ Mới" để kích hoạt thử thách Ghép Chữ Luyện Viết!</span>`;
        document.getElementById('writing-answer-slots').style.display = 'none';
        document.getElementById('writing-letters-pool').style.display = 'none';
        document.getElementById('writing-total-count').innerText = "0";
        document.getElementById('writing-current-index').innerText = "0";
        
        document.getElementById('btn-writing-skip').classList.add('hide');
        document.getElementById('btn-writing-reset').disabled = true;
    }
}

function showWritingCard(index) {
    const card = writingSessionWords[index];
    if (!card) return;

    writingTargetWord = card.english_word.trim().toLowerCase();
    writingSelectedLetters = [];
    writingAnswerRevealed = false;

    // Reset controls
    document.getElementById('btn-writing-next').classList.add('hide');
    document.getElementById('btn-writing-skip').classList.remove('hide');
    document.getElementById('btn-writing-reset').disabled = false;

    const feedbackEl = document.getElementById('writing-feedback');
    feedbackEl.className = 'hide';
    feedbackEl.innerText = '';

    // Fill Details
    document.getElementById('writing-meaning').innerText = card.vietnamese_meaning;
    document.getElementById('writing-cue').innerHTML = `Đọc gần giống: <strong>${card.phonetic_cue}</strong>`;
    document.getElementById('writing-image').src = card.image_url || `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80`;

    // Process characters for scrambling (skip spaces or hyphens)
    const chars = writingTargetWord.split('');
    
    // Scramble letters
    writingScrambledLetters = chars.map((char, originalIndex) => ({ char, originalIndex }));
    
    // Fisher-Yates Shuffle
    for (let i = writingScrambledLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [writingScrambledLetters[i], writingScrambledLetters[j]] = [writingScrambledLetters[j], writingScrambledLetters[i]];
    }

    // Render Answer Slots (Empty)
    const slotsContainer = document.getElementById('writing-answer-slots');
    slotsContainer.innerHTML = '';
    chars.forEach((char, idx) => {
        const slot = document.createElement('div');
        slot.className = 'writing-slot';
        slot.dataset.index = idx;
        
        // If it's a space or special char, fill it automatically
        if (char === ' ' || char === '-') {
            slot.innerText = char;
            slot.classList.add('filled');
            slot.style.border = 'none';
            slot.style.boxShadow = 'none';
        }
        slotsContainer.appendChild(slot);
    });

    // Render Letter Pool Bubbles
    renderLettersPool();

    // Update Progress
    document.getElementById('writing-current-index').innerText = index + 1;
    const progressPercent = Math.round(((index + 1) / writingSessionWords.length) * 100);
    document.getElementById('writing-progress-bar').style.width = `${progressPercent}%`;
}

function renderLettersPool() {
    const poolContainer = document.getElementById('writing-letters-pool');
    poolContainer.innerHTML = '';

    writingScrambledLetters.forEach((item) => {
        // Skip spaces and hyphens from the letters pool
        if (item.char === ' ' || item.char === '-') return;

        const bubble = document.createElement('button');
        bubble.className = 'letter-bubble';
        bubble.innerText = item.char;
        bubble.dataset.originalIndex = item.originalIndex;

        // Check if this specific letter has already been selected by user
        const isUsed = writingSelectedLetters.some(sel => sel.originalIndex === item.originalIndex);
        if (isUsed) {
            bubble.classList.add('used');
        }

        bubble.onclick = () => {
            selectLetter(item);
        };

        poolContainer.appendChild(bubble);
    });
}

function selectLetter(item) {
    if (writingAnswerRevealed) return;

    // Check if letter already used
    if (writingSelectedLetters.some(sel => sel.originalIndex === item.originalIndex)) return;

    // Add to selected list
    writingSelectedLetters.push(item);

    // Update Answer Slots
    updateAnswerSlots();

    // Re-render pool to grey out used letters
    renderLettersPool();

    // Check if answer is complete
    checkWritingAnswer();
}

function updateAnswerSlots() {
    const slots = document.querySelectorAll('#writing-answer-slots .writing-slot');
    
    // Clear slots first (except spaces/hyphens)
    slots.forEach(slot => {
        const char = writingTargetWord[parseInt(slot.dataset.index, 10)];
        if (char !== ' ' && char !== '-') {
            slot.innerText = '';
            slot.classList.remove('filled');
        }
    });

    // Fill selected letters in order
    let selectedIdx = 0;
    slots.forEach(slot => {
        const char = writingTargetWord[parseInt(slot.dataset.index, 10)];
        if (char !== ' ' && char !== '-') {
            if (selectedIdx < writingSelectedLetters.length) {
                slot.innerText = writingSelectedLetters[selectedIdx].char;
                slot.classList.add('filled');
                selectedIdx++;
            }
        }
    });
}

function resetWritingCard() {
    writingSelectedLetters = [];
    updateAnswerSlots();
    renderLettersPool();
    
    const feedbackEl = document.getElementById('writing-feedback');
    feedbackEl.className = 'hide';
    feedbackEl.innerText = '';
}

function checkWritingAnswer() {
    // Count alphabet characters (excluding spaces/hyphens)
    const expectedLength = writingTargetWord.replace(/[\s-]/g, '').length;
    
    if (writingSelectedLetters.length < expectedLength) return;

    // Rebuild answer string
    let userAnswer = '';
    const slots = document.querySelectorAll('#writing-answer-slots .writing-slot');
    slots.forEach(slot => {
        userAnswer += slot.innerText;
    });

    const feedbackEl = document.getElementById('writing-feedback');
    feedbackEl.classList.remove('hide');

    if (userAnswer.trim().toLowerCase() === writingTargetWord) {
        // Correct Answer
        feedbackEl.className = 'feedback-success';
        feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Rất chính xác! Cực kỳ xuất sắc!`;
        
        writingAnswerRevealed = true;
        document.getElementById('btn-writing-next').classList.remove('hide');
        document.getElementById('btn-writing-skip').classList.add('hide');
        document.getElementById('btn-writing-reset').disabled = true;

        // Pronounce the word
        speakWord(writingTargetWord);
    } else {
        // Wrong Answer
        feedbackEl.className = 'feedback-error';
        feedbackEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Chưa đúng rồi! Hãy thử sắp xếp lại chữ cái nhé.`;
        
        // Pulse shake on elements
        const slotsContainer = document.getElementById('writing-answer-slots');
        slotsContainer.style.animation = 'none';
        setTimeout(() => {
            slotsContainer.style.animation = 'shakeAnim 0.4s ease';
        }, 10);
    }
}

function revealWritingAnswer() {
    writingAnswerRevealed = true;
    
    // Fill all slots with correct answer
    const slots = document.querySelectorAll('#writing-answer-slots .writing-slot');
    slots.forEach(slot => {
        const idx = parseInt(slot.dataset.index, 10);
        slot.innerText = writingTargetWord[idx];
        slot.classList.add('filled');
    });

    // Disable pool
    const bubbles = document.querySelectorAll('#writing-letters-pool .letter-bubble');
    bubbles.forEach(b => b.classList.add('used'));

    // Feedback
    const feedbackEl = document.getElementById('writing-feedback');
    feedbackEl.className = 'feedback-success';
    feedbackEl.innerHTML = `<i class="fa-solid fa-eye"></i> Đáp án đúng là: <strong style="text-transform: uppercase;">${writingTargetWord}</strong>`;
    feedbackEl.classList.remove('hide');

    document.getElementById('btn-writing-next').classList.remove('hide');
    document.getElementById('btn-writing-skip').classList.add('hide');
    document.getElementById('btn-writing-reset').disabled = true;

    speakWord(writingTargetWord);
}

// ==========================================================================
// SUPABASE CLOUD SYNC MODULE
// ==========================================================================

const SUPABASE_URL = 'https://ekmdmpfjhhwtsaatkthi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrbWRtcGZqaGh3dHNhYXRrdGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzc4OTksImV4cCI6MjA5NDc1Mzg5OX0.Rebyyt9z5qyhbvW_YzcAt6JPXUQF7F-04qOigHG0_xE';

let supabaseClient = null;
let syncCode = '';

function initSupabase() {
    try {
        if (typeof supabase !== 'undefined' && supabase.createClient) {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase client initialized');
        }
    } catch (e) {
        console.warn('Supabase init error:', e);
    }

    // Load saved sync code/email
    syncCode = localStorage.getItem('sieu_sync_code') || '';
    updateSyncUI();

    // Check active Supabase session on boot
    const loginScreen = document.getElementById('login-screen');
    if (supabaseClient) {
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            if (session && session.user) {
                syncCode = session.user.email;
                localStorage.setItem('sieu_sync_code', syncCode);
                updateSyncUI();
                showLoggedInView(session.user.email);
                
                // Hide gatekeeper screen instantly
                if (loginScreen) loginScreen.classList.add('hide');
                
                // Trigger auto-sync
                handleAutoSync();
            } else {
                // Not logged in: Ensure gatekeeper screen is visible
                if (loginScreen) loginScreen.classList.remove('hide');
                
                if (syncCode && syncCode.includes('@')) {
                    showLoggedOutView();
                } else {
                    // Legacy code sync active
                    showLoggedOutView();
                    document.getElementById('sync-code-input').value = syncCode;
                }
            }
        });
    } else {
        // Fallback if Supabase fails to initialize
        if (loginScreen) loginScreen.classList.add('hide');
    }

    // Sync modal click handler
    document.getElementById('btn-sync').addEventListener('click', () => {
        document.getElementById('modal-sync').classList.remove('hide');
        document.getElementById('sync-feedback').classList.add('hide');
        
        if (syncCode && syncCode.includes('@')) {
            showLoggedInView(syncCode);
        } else {
            showLoggedOutView();
            document.getElementById('sync-code-input').value = syncCode;
        }
    });

    // Close modal
    document.getElementById('btn-close-sync-modal').addEventListener('click', () => {
        document.getElementById('modal-sync').classList.add('hide');
    });

    // ==========================================
    // AUTH TABS INTERACTIVE TOGGLE
    // ==========================================
    const tabAccount = document.getElementById('tab-auth-account');
    const tabQuick = document.getElementById('tab-auth-quick');
    const areaAccount = document.getElementById('area-auth-account');
    const areaQuick = document.getElementById('area-auth-quick');

    tabAccount.addEventListener('click', () => {
        tabAccount.style.background = 'rgba(255,255,255,0.02)';
        tabAccount.style.borderColor = 'rgba(255,255,255,0.05)';
        tabAccount.style.color = '#fff';
        
        tabQuick.style.background = 'transparent';
        tabQuick.style.borderColor = 'transparent';
        tabQuick.style.color = 'var(--color-text-secondary)';

        areaAccount.classList.remove('hide');
        areaQuick.classList.add('hide');
    });

    tabQuick.addEventListener('click', () => {
        tabQuick.style.background = 'rgba(255,255,255,0.02)';
        tabQuick.style.borderColor = 'rgba(255,255,255,0.05)';
        tabQuick.style.color = '#fff';
        
        tabAccount.style.background = 'transparent';
        tabAccount.style.borderColor = 'transparent';
        tabAccount.style.color = 'var(--color-text-secondary)';

        areaQuick.classList.remove('hide');
        areaAccount.classList.add('hide');
    });

    // ==========================================
    // SUPABASE AUTHENTICATION EVENT LISTENERS
    // ==========================================
    
    // Helper to generate virtual email from username with full Vietnamese accent support
    function getVirtualEmail(username) {
        const clean = username.normalize('NFD')
                              .replace(/[\u0300-\u036f]/g, '')
                              .replace(/[đĐ]/g, 'd')
                              .toLowerCase()
                              .replace(/[^a-z0-9]/g, '');
                              
        if (clean === 'truclinh' || clean === 'linh' || clean === 'buithitruclinh') {
            return 'buithitruclinh@hocsieunhanh.com';
        }
        if (clean === 'tankha' || clean === 'kha' || clean === 'tramtankha') {
            return 'tramtankha@hocsieunhanh.com';
        }
        
        return `${clean}@hocsieunhanh.com`;
    }

    // Pad password transparently to pass Supabase's strict 6-character auth minimum
    function getVirtualPassword(password) {
        if (!password) return '';
        if (password.length < 6) {
            return password.padEnd(6, 'x'); // E.g. "123" -> "123xxx"
        }
        return password;
    }

    // Helper for login screen status text
    function showLoginScreenFeedback(msg, isSuccess) {
        const feedbackEl = document.getElementById('login-screen-feedback');
        const textEl = document.getElementById('login-feedback-text');
        const iconEl = document.getElementById('login-feedback-icon');
        
        if (!feedbackEl) return;
        feedbackEl.classList.remove('hide');
        textEl.textContent = msg;

        if (isSuccess) {
            feedbackEl.style.background = 'rgba(16, 185, 129, 0.1)';
            feedbackEl.style.borderColor = 'rgba(16, 185, 129, 0.2)';
            textEl.style.color = '#10b981';
            iconEl.className = 'fa-solid fa-circle-check text-green';
        } else {
            feedbackEl.style.background = 'rgba(239, 68, 68, 0.1)';
            feedbackEl.style.borderColor = 'rgba(239, 68, 68, 0.2)';
            textEl.style.color = '#ef4444';
            iconEl.className = 'fa-solid fa-circle-exclamation text-red';
        }
    }

    // Cryptographically secure, browser-native SHA-256 hashing
    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    // ==========================================
    // GATEKEEPER LOGIN SCREEN SUBMITS
    // ==========================================

    // 1. Submit Login from Gatekeeper screen
    document.getElementById('btn-login-screen-submit').addEventListener('click', async () => {
        const btnSubmit = document.getElementById('btn-login-screen-submit');
        const usernameSelect = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');

        if (!usernameSelect || !passwordInput) return;

        const username = usernameSelect.value;
        const password = passwordInput.value.trim();

        if (!password) {
            showLoginScreenFeedback('❌ Vui lòng nhập Mật khẩu truy cập!', false);
            return;
        }

        showLoginScreenFeedback('⏳ Đang xác thực mật khẩu...', true);
        btnSubmit.disabled = true;

        try {
            const passwordHash = await sha256(password);
            
            let loginSuccess = false;
            let email = '';
            
            if (username === 'buithitruclinh') {
                // Password: 123 (a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3)
                // Password: truclinh123 (034e3fb356886e5804470d0746014e66779836336585141e976db5fa957f1857)
                if (passwordHash === 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3' || 
                    passwordHash === '034e3fb356886e5804470d0746014e66779836336585141e976db5fa957f1857' ||
                    password === '123' || password === 'truclinh123') {
                    loginSuccess = true;
                    email = 'buithitruclinh@hocsieunhanh.com';
                }
            } else if (username === 'tramtankha') {
                // Password: 123 (a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3)
                // Password: tankha123 (93540a026e6ef12f6c91a03db054e60155b40cfb1e05a8f4c2e6462725178652)
                if (passwordHash === 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3' || 
                    passwordHash === '93540a026e6ef12f6c91a03db054e60155b40cfb1e05a8f4c2e6462725178652' ||
                    password === '123' || password === 'tankha123') {
                    loginSuccess = true;
                    email = 'tramtankha@hocsieunhanh.com';
                }
            }

            if (loginSuccess) {
                syncCode = email;
                localStorage.setItem('sieu_sync_code', syncCode);
                updateSyncUI();
                initDatabase(); // Reload user data
                updateUIStats();
                checkDailyStreak();
                showLoggedInView(email);
                
                // Hide gatekeeper screen with beautiful transition
                if (loginScreen) loginScreen.classList.add('hide');
                
                showToast('Đăng nhập thành công! Chào mừng trở lại.');
                
                // Pull progress from database
                await handleCloudMerge();
            } else {
                showLoginScreenFeedback('❌ Mật khẩu truy cập không chính xác!', false);
            }
        } catch (err) {
            showLoginScreenFeedback('❌ Lỗi xác thực hệ thống!', false);
            console.error(err);
        } finally {
            btnSubmit.disabled = false;
        }
    });

    // ==========================================
    // SIDEBAR/MODAL MODAL AUTH LISTENERS (FOR PROFILE VIEW BACKWARD COMPATIBILITY)
    // ==========================================

    // 1. Sign Up (Modal Form)
    document.getElementById('btn-auth-signup').addEventListener('click', async () => {
        const username = document.getElementById('auth-username').value.trim();
        const password = document.getElementById('auth-password').value.trim();

        if (!username || !password) {
            showSyncFeedback('❌ Hãy nhập đầy đủ Tên đăng nhập và Mật khẩu!', false);
            return;
        }

        const email = getVirtualEmail(username);
        const finalPassword = getVirtualPassword(password);
        showSyncFeedback('⏳ Đang đăng ký tài khoản...', true);

        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: finalPassword
            });

            if (error) {
                let friendlyMsg = error.message;
                if (friendlyMsg.toLowerCase().includes('already registered') || friendlyMsg.toLowerCase().includes('already exists')) {
                    friendlyMsg = 'Tên đăng nhập này đã có người sử dụng. Vui lòng chọn tên khác!';
                }
                showSyncFeedback(`❌ Lỗi đăng ký: ${friendlyMsg}`, false);
                return;
            }

            if (data.user) {
                syncCode = data.user.email;
                localStorage.setItem('sieu_sync_code', syncCode);
                updateSyncUI();
                initDatabase(); // Reload newly created user's data
                updateUIStats();
                checkDailyStreak();
                showLoggedInView(data.user.email);
                if (loginScreen) loginScreen.classList.add('hide');
                showSyncFeedback('✅ Khởi tạo tài khoản thành công!', true);
                showToast('Khởi tạo tài khoản thành công!');
                
                // Background sync
                setTimeout(() => {
                    handleCloudMerge().catch(console.error);
                }, 100);
            }
        } catch (err) {
            showSyncFeedback('❌ Lỗi kết nối tài khoản!', false);
            console.error(err);
        }
    });

    // 2. Log In (Modal Form)
    document.getElementById('btn-auth-login').addEventListener('click', async () => {
        const username = document.getElementById('auth-username').value.trim();
        const password = document.getElementById('auth-password').value.trim();

        if (!username || !password) {
            showSyncFeedback('❌ Hãy nhập đầy đủ Tên đăng nhập và Mật khẩu!', false);
            return;
        }

        const email = getVirtualEmail(username);
        const finalPassword = getVirtualPassword(password);
        showSyncFeedback('⏳ Đang đăng nhập...', true);

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: finalPassword
            });

            if (error) {
                showSyncFeedback(`❌ Đăng nhập thất bại: Tài khoản hoặc Mật khẩu không đúng!`, false);
                return;
            }

            if (data.user) {
                syncCode = data.user.email;
                localStorage.setItem('sieu_sync_code', syncCode);
                updateSyncUI();
                initDatabase(); // Reload signed in user's data
                updateUIStats();
                checkDailyStreak();
                showLoggedInView(data.user.email);
                if (loginScreen) loginScreen.classList.add('hide');
                showSyncFeedback('⏳ Đang đồng bộ tiến trình học tập...', true);
                await handleCloudMerge();
                showToast('Đã đăng nhập thành công!');
            }
        } catch (err) {
            showSyncFeedback('❌ Lỗi kết nối tài khoản!', false);
            console.error(err);
        }
    });

    // 3. Log Out (Force show login screen again)
    document.getElementById('btn-auth-logout').addEventListener('click', async () => {
        try {
            showSyncFeedback('⏳ Đang đăng xuất...', true);
            await supabaseClient.auth.signOut();
            syncCode = '';
            localStorage.removeItem('sieu_sync_code');
            updateSyncUI();
            initDatabase(); // Reload guest database
            updateUIStats();
            checkDailyStreak();
            showLoggedOutView();
            
            // Clear inputs on gatekeeper screen
            document.getElementById('login-username').value = '';
            document.getElementById('login-password').value = '';
            const feedbackEl = document.getElementById('login-screen-feedback');
            if (feedbackEl) feedbackEl.classList.add('hide');
            
            // Force show gatekeeper screen
            if (loginScreen) loginScreen.classList.remove('hide');
            
            document.getElementById('modal-sync').classList.add('hide');
            showSyncFeedback('✅ Đã đăng xuất thành công!', true);
            showToast('Đã đăng xuất tài khoản.');
        } catch (err) {
            console.error('Logout error:', err);
        }
    });

    // 4. Reset All Progress (Local & Supabase Cloud)
    document.getElementById('btn-auth-reset').addEventListener('click', async () => {
        const confirmed = confirm("⚠️ CẢNH BÁO QUAN TRỌNG:\nHành động này sẽ XÓA VĨNH VIỄN toàn bộ tiến trình học tập, lịch ôn tập SRS và số ngày Streak (Chuỗi học) của bạn trên máy này và trên máy chủ đám mây!\n\nBạn có chắc chắn muốn thực hiện reset không?");
        if (!confirmed) return;

        const doubleConfirmed = confirm("Bạn có chắc chắn 100% không? Thao tác này không thể khôi phục!");
        if (!doubleConfirmed) return;

        showSyncFeedback('⏳ Đang xóa sạch tiến trình học tập...', true);
        
        try {
            // 1. Delete from Supabase Cloud if synced
            if (syncCode && supabaseClient) {
                const { error } = await supabaseClient
                    .from('user_progress')
                    .delete()
                    .eq('sync_code', syncCode);
                if (error) {
                    console.error('Cloud reset error:', error);
                }
            }

            // 2. Clear Local Storage variables
            userStreak = 0;
            lastStudyDate = '';
            
            // Reset local progress object to defaults
            vocabulary.forEach(word => {
                progress[word.id] = {
                    vocab_id: word.id,
                    current_level: 0,
                    interval: 0,
                    ease_factor: 2.5,
                    repetitions: 0,
                    next_review_date: null,
                    last_reviewed: null,
                    date_learned: null
                };
            });

            // Save blank databases locally
            saveDatabase();
            
            // Force update UI stats and streaks
            updateUIStats();
            checkDailyStreak();
            
            showSyncFeedback('✅ Đã xóa sạch tiến trình học tập thành công!', true);
            showToast('🚀 Đã reset toàn bộ tiến trình tài khoản về 0!');
            
            // Close sync modal
            document.getElementById('modal-sync').classList.add('hide');
        } catch (err) {
            console.error('Reset error:', err);
            showSyncFeedback('❌ Lỗi trong quá trình reset tiến trình!', false);
        }
    });

    // ==========================================
    // LEGACY QUICK CODE SYNC HANDLERS
    // ==========================================

    // Connect & Sync (Quick Code)
    document.getElementById('btn-sync-connect').addEventListener('click', async () => {
        const code = document.getElementById('sync-code-input').value.trim().toLowerCase();
        if (!code || code.length < 3) {
            showSyncFeedback('❌ Mã đồng bộ phải có ít nhất 3 ký tự!', false);
            return;
        }
        syncCode = code;
        localStorage.setItem('sieu_sync_code', syncCode);
        updateSyncUI();

        showSyncFeedback('⏳ Đang đồng bộ tiến trình...', true);
        await handleCloudMerge();
    });

    // Disconnect (Quick Code / Guest Mode)
    document.getElementById('btn-sync-disconnect').addEventListener('click', () => {
        syncCode = '';
        localStorage.removeItem('sieu_sync_code');
        updateSyncUI();
        initDatabase(); // Reload guest database
        updateUIStats();
        checkDailyStreak();
        showLoggedOutView();
        document.getElementById('sync-feedback').classList.add('hide');
        showToast('Đã ngắt kết nối đồng bộ.');
    });

    // Auto-sync wrapper if already connected on start
    handleAutoSync();
}

// Helpers for Auth views toggling
function showLoggedInView(email) {
    document.getElementById('account-logged-out-view').classList.add('hide');
    document.getElementById('account-logged-in-view').classList.remove('hide');
    // Display the clean username instead of virtual email
    const username = email.includes('@') ? email.split('@')[0] : email;
    document.getElementById('logged-in-email-text').textContent = username;
}

function showLoggedOutView() {
    document.getElementById('account-logged-out-view').classList.remove('hide');
    document.getElementById('account-logged-in-view').classList.add('hide');
    document.getElementById('auth-username').value = '';
    document.getElementById('auth-password').value = '';
}

// Core merge function for both Auth and Quick Sync
async function handleCloudMerge() {
    const cloudData = await loadFromCloud();
    if (cloudData && cloudData.length > 0) {
        let merged = 0;
        cloudData.forEach(row => {
            if (progress[row.vocab_id]) {
                const local = progress[row.vocab_id];
                const cloudDate = row.last_reviewed || '';
                const localDate = local.last_reviewed || '';
                if (cloudDate >= localDate) {
                    progress[row.vocab_id] = {
                        vocab_id: row.vocab_id,
                        current_level: row.current_level,
                        interval: row.interval,
                        ease_factor: parseFloat(row.ease_factor),
                        repetitions: row.repetitions,
                        next_review_date: row.next_review_date,
                        last_reviewed: row.last_reviewed,
                        date_learned: progress[row.vocab_id]?.date_learned || (row.repetitions > 0 ? (row.last_reviewed || '') : null)
                    };
                    merged++;
                }
            }
        });
        saveDatabase();
        updateUIStats();
        showSyncFeedback(`✅ Đã tải ${cloudData.length} bản ghi và đồng bộ thành công!`, true);
    } else {
        await saveToCloud();
        showSyncFeedback('✅ Đã tải lên tiến trình mới thành công!', true);
    }
}

function handleAutoSync() {
    if (syncCode && supabaseClient) {
        setTimeout(() => loadFromCloud().then(data => {
            if (data && data.length > 0) {
                let merged = 0;
                data.forEach(row => {
                    if (progress[row.vocab_id]) {
                        const local = progress[row.vocab_id];
                        if ((row.last_reviewed || '') >= (local.last_reviewed || '')) {
                            progress[row.vocab_id] = {
                                vocab_id: row.vocab_id,
                                current_level: row.current_level,
                                interval: row.interval,
                                ease_factor: parseFloat(row.ease_factor),
                                repetitions: row.repetitions,
                                next_review_date: row.next_review_date,
                                last_reviewed: row.last_reviewed,
                                date_learned: progress[row.vocab_id]?.date_learned || (row.repetitions > 0 ? (row.last_reviewed || '') : null)
                            };
                            merged++;
                        }
                    }
                });
                if (merged > 0) {
                    saveDatabase();
                    updateUIStats();
                    console.log(`☁️ Auto-synced ${merged} words from cloud`);
                }
            }
        }), 2000);
    }
}

function updateSyncUI() {
    const statusEl = document.getElementById('sync-status-text');
    const btnSync = document.getElementById('btn-sync');
    if (syncCode) {
        const displayName = syncCode.includes('@') ? syncCode.split('@')[0] : syncCode;
        statusEl.innerHTML = `☁️ ${displayName}`;
        btnSync.classList.remove('btn-gradient');
        btnSync.classList.add('btn-secondary');
        btnSync.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        btnSync.style.color = '#10b981';
    } else {
        statusEl.textContent = 'Đồng bộ dữ liệu';
        btnSync.classList.add('btn-gradient');
        btnSync.classList.remove('btn-secondary');
        btnSync.style.borderColor = '';
        btnSync.style.color = '';
    }
}

function showSyncFeedback(msg, show) {
    const el = document.getElementById('sync-feedback');
    const textEl = document.getElementById('sync-feedback-text');
    if (show) {
        el.classList.remove('hide');
        textEl.textContent = msg;
    } else {
        el.classList.remove('hide');
        textEl.textContent = msg;
    }
}

async function loadFromCloud() {
    if (!supabaseClient || !syncCode) return null;
    try {
        const { data, error } = await supabaseClient
            .from('user_progress')
            .select('*')
            .eq('sync_code', syncCode);
        if (error) { console.error('Cloud load error:', error); return null; }
        return data;
    } catch (e) {
        console.error('Cloud load exception:', e);
        return null;
    }
}

async function saveToCloud() {
    if (!supabaseClient || !syncCode) return;
    try {
        const rows = Object.values(progress).filter(p => p.last_reviewed).map(p => ({
            sync_code: syncCode,
            vocab_id: p.vocab_id,
            current_level: p.current_level,
            interval: p.interval,
            ease_factor: p.ease_factor,
            repetitions: p.repetitions,
            next_review_date: p.next_review_date,
            last_reviewed: p.last_reviewed,
            updated_at: new Date().toISOString()
        }));

        if (rows.length === 0) return;

        // Upsert in batches of 100
        for (let i = 0; i < rows.length; i += 100) {
            const batch = rows.slice(i, i + 100);
            const { error } = await supabaseClient
                .from('user_progress')
                .upsert(batch, { onConflict: 'sync_code,vocab_id' });
            if (error) console.error('Cloud save batch error:', error);
        }
        console.log(`☁️ Saved ${rows.length} progress records to cloud`);
    } catch (e) {
        console.error('Cloud save exception:', e);
    }
}

// Auto-sync after SRS review
const _originalSaveDatabase = saveDatabase;
saveDatabase = function() {
    _originalSaveDatabase();
    // Debounced cloud save
    if (syncCode && supabaseClient) {
        clearTimeout(window._cloudSaveTimer);
        window._cloudSaveTimer = setTimeout(() => saveToCloud(), 3000);
    }
};


// ==========================================================================
// ONLINE CHAT / DIRECT MESSAGING ENGINE
// ==========================================================================

let chatPartnerEmail = 'buithitruclinh@hocsieunhanh.com';
let chatPartnerName = 'Bùi Thị Trúc Linh';

// Populate initial mock messages if cloud table isn't created yet
if (!window._mockMessages) {
    window._mockMessages = [
        { sender: 'tramtankha@hocsieunhanh.com', receiver: 'buithitruclinh@hocsieunhanh.com', text: 'Chào Linh nhé! Cậu ôn tập được bao nhiêu từ vựng hôm nay rồi? 😄', created_at: new Date(Date.now() - 3600000).toISOString() },
        { sender: 'buithitruclinh@hocsieunhanh.com', receiver: 'tramtankha@hocsieunhanh.com', text: 'Chào Khá! Tớ đang ôn tập 10 từ vựng chủ đề Travel bằng phương pháp Spaced Repetition nè, hiệu quả cực kỳ!', created_at: new Date(Date.now() - 1800000).toISOString() }
    ];
}

function initChatView() {
    console.log('Initializing Chat View...');
    const currentUserEmail = syncCode || 'guest@hocsieunhanh.com';
    
    // Auto-detect role to set default partner
    if (currentUserEmail.includes('tramtankha')) {
        chatPartnerEmail = 'buithitruclinh@hocsieunhanh.com';
        chatPartnerName = 'Bùi Thị Trúc Linh';
    } else {
        chatPartnerEmail = 'tramtankha@hocsieunhanh.com';
        chatPartnerName = 'Trầm Tấn Khá';
    }

    renderChatPartners();
    renderChatHeader();
    
    // Perform initial fetch
    fetchMessages();

    // Start 2.5s Polling for real-time experience
    if (window._chatPollTimer) clearInterval(window._chatPollTimer);
    window._chatPollTimer = setInterval(() => {
        fetchMessages(true); // silent update
    }, 2500);

    // Setup send form listener (remove old one to prevent duplicates)
    const sendForm = document.getElementById('chat-send-form');
    sendForm.onsubmit = async (e) => {
        e.preventDefault();
        const inputEl = document.getElementById('chat-message-input');
        const text = inputEl.value.trim();
        if (!text) return;

        // Optimistic UI Update (instant rendering)
        const optimisticMsg = {
            id: 'temp-' + Date.now(),
            sender: currentUserEmail,
            receiver: chatPartnerEmail,
            text: text,
            created_at: new Date().toISOString(),
            isSending: true
        };

        appendSingleMessage(optimisticMsg);
        inputEl.value = '';
        inputEl.focus();

        let sentSuccess = false;

        // Try writing to cloud Supabase messages table
        if (supabaseClient && syncCode) {
            try {
                const { error } = await supabaseClient
                    .from('messages')
                    .insert([{
                        sender: currentUserEmail,
                        receiver: chatPartnerEmail,
                        text: text
                    }]);

                if (!error) {
                    sentSuccess = true;
                } else {
                    console.warn('Supabase message insert error:', error);
                }
            } catch (err) {
                console.error('Supabase message insert exception:', err);
            }
        }

        if (!sentSuccess) {
            // Fallback to local interactive mock sandbox
            window._mockMessages.push({
                sender: currentUserEmail,
                receiver: chatPartnerEmail,
                text: text,
                created_at: new Date().toISOString()
            });
            // Show SQL script guidance alert
            const sqlTip = document.getElementById('chat-sql-tip');
            if (sqlTip) sqlTip.classList.remove('hide');
        }

        // Re-fetch to update state
        fetchMessages();
    };
}

function renderChatPartners() {
    const listEl = document.getElementById('chat-partners-list');
    if (!listEl) return;
    
    const currentUserEmail = syncCode || 'guest@hocsieunhanh.com';
    
    // We display Bùi Thị Trúc Linh & Trầm Tấn Khá in the contact list
    const partners = [
        { email: 'buithitruclinh@hocsieunhanh.com', name: 'Bùi Thị Trúc Linh', avatar: 'L' },
        { email: 'tramtankha@hocsieunhanh.com', name: 'Trầm Tấn Khá', avatar: 'K' }
    ].filter(p => p.email !== currentUserEmail); // Don't show myself

    // If current user is not one of them, show both
    const renderList = partners.length === 0 ? [
        { email: 'buithitruclinh@hocsieunhanh.com', name: 'Bùi Thị Trúc Linh', avatar: 'L' },
        { email: 'tramtankha@hocsieunhanh.com', name: 'Trầm Tấn Khá', avatar: 'K' }
    ] : partners;

    listEl.innerHTML = '';
    renderList.forEach(p => {
        const isActive = p.email === chatPartnerEmail;
        const activeStyle = isActive ? 'background: rgba(255,255,255,0.06); border-color: var(--purple);' : 'background: rgba(255,255,255,0.02);';
        
        const row = document.createElement('div');
        row.className = `partner-item ${isActive ? 'active' : ''}`;
        row.style = `display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); cursor: pointer; transition: all 0.3s ease; ${activeStyle}`;
        row.innerHTML = `
            <div class="partner-avatar" style="width: 40px; height: 40px; border-radius: 50%; background: ${isActive ? 'linear-gradient(135deg, var(--purple), var(--pink))' : 'rgba(255,255,255,0.1)'}; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff;">
                ${p.avatar}
            </div>
            <div style="display: flex; flex-direction: column;">
                <span style="font-weight: 600; font-size: 0.9rem; color: #fff;">${p.name}</span>
                <span style="font-size: 0.75rem; color: #10b981;">● Đang hoạt động</span>
            </div>
        `;

        row.addEventListener('click', () => {
            chatPartnerEmail = p.email;
            chatPartnerName = p.name;
            renderChatPartners();
            renderChatHeader();
            fetchMessages();
        });

        listEl.appendChild(row);
    });
}

function renderChatHeader() {
    const titleEl = document.getElementById('chat-header-title');
    if (titleEl) {
        titleEl.textContent = `Trò chuyện với ${chatPartnerName}`;
    }
}

async function fetchMessages(isSilent = false) {
    const chatBox = document.getElementById('chat-messages-box');
    if (!chatBox) return;

    const currentUserEmail = syncCode || 'guest@hocsieunhanh.com';
    let messages = [];
    let isCloud = false;

    if (supabaseClient && syncCode) {
        try {
            const { data, error } = await supabaseClient
                .from('messages')
                .select('*')
                .or(`and(sender.eq.${currentUserEmail},receiver.eq.${chatPartnerEmail}),and(sender.eq.${chatPartnerEmail},receiver.eq.${currentUserEmail})`)
                .order('created_at', { ascending: true });

            if (!error && data) {
                messages = data;
                isCloud = true;
                const sqlTip = document.getElementById('chat-sql-tip');
                if (sqlTip) sqlTip.classList.add('hide'); // Hide table alert on success
            }
        } catch (err) {
            // Table doesn't exist or fetch error
        }
    }

    if (!isCloud) {
        // Use Mock data filter
        messages = window._mockMessages.filter(m => 
            (m.sender === currentUserEmail && m.receiver === chatPartnerEmail) ||
            (m.sender === chatPartnerEmail && m.receiver === currentUserEmail)
        );
        // Show cloud guidance tips
        const sqlTip = document.getElementById('chat-sql-tip');
        if (sqlTip) sqlTip.classList.remove('hide');
    }

    // Sort by time
    messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    // Update sync indicator UI
    const indicator = document.getElementById('chat-sync-indicator');
    if (indicator) {
        indicator.innerHTML = isCloud 
            ? `<i class="fa-solid fa-cloud" style="color: #10b981;"></i> <span style="color: #10b981;">Đồng bộ Cloud</span>`
            : `<i class="fa-solid fa-cloud-slash" style="color: #fbbf24;"></i> <span style="color: #fbbf24;">Lưu Nội Bộ (Mock)</span>`;
    }

    // Render message list
    const wasAtBottom = chatBox.scrollHeight - chatBox.scrollTop <= chatBox.clientHeight + 60;
    
    chatBox.innerHTML = '';
    
    if (messages.length === 0) {
        chatBox.innerHTML = `
            <div style="margin: auto; text-align: center; color: var(--color-text-muted); padding: 40px;">
                <i class="fa-solid fa-comments" style="font-size: 3rem; margin-bottom: 12px; opacity: 0.3;"></i>
                <p style="font-size: 0.9rem;">Chưa có tin nhắn nào. Hãy gửi tin nhắn đầu tiên!</p>
            </div>
        `;
        return;
    }

    messages.forEach(m => {
        const isMe = m.sender === currentUserEmail;
        const msgRow = document.createElement('div');
        msgRow.style = `display: flex; flex-direction: column; align-items: ${isMe ? 'flex-end' : 'flex-start'}; width: 100%;`;
        
        const senderLabel = isMe ? 'Bạn' : chatPartnerName;
        const timeStr = new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const bubbleStyle = isMe
            ? 'background: rgba(139, 92, 246, 0.25); border: 1px solid rgba(139, 92, 246, 0.4); color: #fff; border-bottom-right-radius: 4px;'
            : 'background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.3); color: #fff; border-bottom-left-radius: 4px;';

        msgRow.innerHTML = `
            <span style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 4px; font-weight: 500; margin-left: ${isMe ? '0' : '4px'}; margin-right: ${isMe ? '4px' : '0'};">${senderLabel}</span>
            <div style="padding: 10px 16px; border-radius: 16px; max-width: 70%; line-height: 1.4; font-size: 0.9rem; word-break: break-word; box-shadow: 0 4px 12px rgba(0,0,0,0.15); ${bubbleStyle}">
                ${m.text}
                ${m.isSending ? ' <i class="fa-solid fa-spinner fa-spin" style="font-size: 0.75rem; margin-left: 6px; opacity: 0.6;"></i>' : ''}
            </div>
            <span style="font-size: 0.65rem; color: var(--color-text-muted); margin-top: 4px; margin-left: ${isMe ? '0' : '4px'}; margin-right: ${isMe ? '4px' : '0'}; opacity: 0.7;">${timeStr}</span>
        `;
        chatBox.appendChild(msgRow);
    });

    if (wasAtBottom || !isSilent) {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function appendSingleMessage(m) {
    const chatBox = document.getElementById('chat-messages-box');
    if (!chatBox) return;

    // Remove empty state placeholder if present
    if (chatBox.innerHTML.includes('Chưa có tin nhắn nào')) {
        chatBox.innerHTML = '';
    }

    const currentUserEmail = syncCode || 'guest@hocsieunhanh.com';
    const isMe = m.sender === currentUserEmail;
    
    const msgRow = document.createElement('div');
    msgRow.style = `display: flex; flex-direction: column; align-items: ${isMe ? 'flex-end' : 'flex-start'}; width: 100%;`;
    
    const senderLabel = isMe ? 'Bạn' : chatPartnerName;
    const timeStr = new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const bubbleStyle = isMe
        ? 'background: rgba(139, 92, 246, 0.25); border: 1px solid rgba(139, 92, 246, 0.4); color: #fff; border-bottom-right-radius: 4px;'
        : 'background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.3); color: #fff; border-bottom-left-radius: 4px;';

    msgRow.innerHTML = `
        <span style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 4px; font-weight: 500; margin-left: ${isMe ? '0' : '4px'}; margin-right: ${isMe ? '4px' : '0'};">${senderLabel}</span>
        <div style="padding: 10px 16px; border-radius: 16px; max-width: 70%; line-height: 1.4; font-size: 0.9rem; word-break: break-word; box-shadow: 0 4px 12px rgba(0,0,0,0.15); ${bubbleStyle}">
            ${m.text}
            ${m.isSending ? ' <i class="fa-solid fa-spinner fa-spin" style="font-size: 0.75rem; margin-left: 6px; opacity: 0.6;"></i>' : ''}
        </div>
        <span style="font-size: 0.65rem; color: var(--color-text-muted); margin-top: 4px; margin-left: ${isMe ? '0' : '4px'}; margin-right: ${isMe ? '4px' : '0'}; opacity: 0.7;">${timeStr}</span>
    `;
    chatBox.appendChild(msgRow);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Init on load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initSupabase, 500);
});
