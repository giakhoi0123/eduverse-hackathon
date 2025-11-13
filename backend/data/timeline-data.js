/**
 * Sample timeline data for Vietnamese history
 */

export const PERIODS = [
  // ========== CỔ ĐẠI (2879 TCN - 938) ==========
  {
    id: 'hong_bang',
    label: '🏛️ Thời Hồng Bàng',
    start: -2879,
    end: -258,
    description: 'Thời kỳ truyền thuyết Vua Hùng dựng nước',
    color: '#8B4513',
    era: 'Cổ đại'
  },
  {
    id: 'bac_thuoc',
    label: '⛓️ Bắc thuộc',
    start: -111,
    end: 938,
    description: 'Hơn 1000 năm Bắc thuộc và các cuộc khởi nghĩa (Hai Bà Trưng, Bà Triệu, Lý Bí, Mai Thúc Loan, Phùng Hưng...)',
    color: '#DC2626',
    era: 'Cổ đại'
  },

  // ========== TRUNG ĐẠI (938 - 1858) ==========
  {
    id: 'ngo',
    label: '🎖️ Nhà Ngô',
    start: 939,
    end: 965,
    description: 'Ngô Quyền giành độc lập sau 1000 năm Bắc thuộc',
    color: '#3B82F6',
    era: 'Trung đại'
  },
  {
    id: 'dinh_le',
    label: '👑 Nhà Đinh - Tiền Lê',
    start: 968,
    end: 1009,
    description: 'Đinh Bộ Lĩnh thống nhất 12 sứ quân',
    color: '#8B5CF6',
    era: 'Trung đại'
  },
  {
    id: 'ly',
    label: '🏛️ Nhà Lý',
    start: 1009,
    end: 1225,
    description: 'Thời kỳ phát triển văn hóa Phật giáo',
    color: '#EC4899',
    era: 'Trung đại'
  },
  {
    id: 'tran',
    label: '⚔️ Nhà Trần',
    start: 1225,
    end: 1400,
    description: 'Ba lần đánh thắng quân Nguyên-Mông',
    color: '#F59E0B',
    era: 'Trung đại'
  },
  {
    id: 'ho',
    label: '🔄 Nhà Hồ',
    start: 1400,
    end: 1407,
    description: 'Hồ Quý Ly cải cách táo bạo',
    color: '#10B981',
    era: 'Trung đại'
  },
  {
    id: 'bac_thuoc_4',
    label: '⛓️ Bắc thuộc lần 4',
    start: 1407,
    end: 1428,
    description: 'Quân Minh xâm lược 20 năm',
    color: '#DC2626',
    era: 'Trung đại'
  },
  {
    id: 'le_so',
    label: '🎖️ Nhà Lê Sơ',
    start: 1428,
    end: 1527,
    description: 'Lê Lợi khởi nghĩa Lam Sơn thành công',
    color: '#EF4444',
    era: 'Trung đại'
  },
  {
    id: 'mac',
    label: '👑 Nhà Mạc',
    start: 1527,
    end: 1592,
    description: 'Mạc Đăng Dung soán ngôi',
    color: '#6366F1',
    era: 'Trung đại'
  },
  {
    id: 'le_trung_hung',
    label: '🏛️ Nhà Lê Trung흥',
    start: 1533,
    end: 1789,
    description: 'Lê Trung Hưng và thời kỳ phân tranh',
    color: '#F43F5E',
    era: 'Trung đại'
  },
  {
    id: 'tay_son',
    label: '⚔️ Nhà Tây Sơn',
    start: 1778,
    end: 1802,
    description: 'Ba anh em Tây Sơn dẹp loạn',
    color: '#FB923C',
    era: 'Trung đại'
  },
  {
    id: 'nguyen',
    label: '👑 Nhà Nguyễn',
    start: 1802,
    end: 1945,
    description: 'Triều đại phong kiến cuối cùng',
    color: '#FBBF24',
    era: 'Trung đại → Cận đại'
  },

  // ========== CẬN ĐẠI (1858 - 1945) ==========
  // (Các sự kiện kháng chiến chống Pháp được phân bổ vào thời kỳ Nhà Nguyễn)

  // ========== HIỆN ĐẠI (1945 - nay) ==========
  {
    id: 'doc_lap',
    label: '🎉 Độc lập',
    start: 1945,
    end: 1954,
    description: 'Cách mạng Tháng Tám và Tuyên ngôn độc lập',
    color: '#EF4444',
    era: 'Hiện đại'
  },
  {
    id: 'chong_my',
    label: '🇺🇸 Kháng chiến chống Mỹ',
    start: 1954,
    end: 1975,
    description: 'Chiến tranh Việt Nam và thống nhất đất nước',
    color: '#DC2626',
    era: 'Hiện đại'
  },
  {
    id: 'doi_moi',
    label: '🌟 Đổi mới',
    start: 1986,
    end: 2025,
    description: 'Công cuộc Đổi mới và phát triển',
    color: '#10B981',
    era: 'Hiện đại'
  }
];

export const EVENTS = [
  // ========== CỔ ĐẠI ==========
  {
    id: 'hung_vuong_founding',
    title: 'Vua Hùng Vương dựng nước Văn Lang',
    year: -2879,
    summary: 'Theo truyền thuyết, Vua Hùng Vương đầu tiên lập nước Văn Lang, mở đầu lịch sử dựng nước và giữ nước của dân tộc.',
    characters_involved: ['hung-vuong'],
    tags: ['founding', 'legend', 'culture'],
    image_url: '/img/events/hung-vuong.jpg'
  },
  {
    id: 'hai_ba_trung',
    title: 'Khởi nghĩa Hai Bà Trưng',
    year: 40,
    start_date: '40-02-01',
    summary: 'Trưng Trắc và Trưng Nhị khởi nghĩa chống quân Hán, lập nên nhà nước độc lập tồn tại 3 năm. Biểu tượng tinh thần bất khuất của phụ nữ Việt Nam.',
    characters_involved: ['trung-trac', 'trung-nhi'],
    tags: ['uprising', 'independence', 'women'],
    image_url: '/img/events/hai-ba-trung.jpg'
  },
  {
    id: 'ba_trieu',
    title: 'Khởi nghĩa Bà Triệu',
    year: 248,
    summary: 'Triệu Thị Trinh (Bà Triệu) cưỡi voi dẫn đầu nghĩa quân chống quân Đông Ngô. Câu nói nổi tiếng: "Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ".',
    characters_involved: ['ba-trieu'],
    tags: ['uprising', 'women', 'culture'],
    image_url: '/img/events/ba-trieu.jpg'
  },
  {
    id: 'ly_bi_van_xuan',
    title: 'Lý Bí lập nước Vạn Xuân',
    year: 544,
    summary: 'Lý Bí khởi nghĩa đánh đuổi quân Lương, lập nước Vạn Xuân, tự xưng Lý Nam Đế. Đây là lần đầu tiên Việt Nam có quốc hiệu riêng.',
    characters_involved: ['ly-bi'],
    tags: ['independence', 'founding', 'politics'],
    image_url: '/img/events/ly-bi.jpg'
  },
  {
    id: 'trieu_quang_phuc',
    title: 'Triệu Quang Phục khởi nghĩa',
    year: 550,
    summary: 'Triệu Quang Phục tiếp tục khởi nghĩa chống quân Lương sau khi Lý Bí qua đời, duy trì độc lập gần 20 năm.',
    characters_involved: ['trieu-quang-phuc'],
    tags: ['uprising', 'resistance'],
    image_url: '/img/events/trieu-quang-phuc.jpg'
  },
  {
    id: 'mai_thuc_loan',
    title: 'Khởi nghĩa Mai Thúc Loan',
    year: 722,
    summary: 'Mai Thúc Loan tự xưng là Hắc Đế (Hoàng đế Da Đen), khởi nghĩa chống quân Đường, thể hiện tinh thần tự chủ.',
    characters_involved: ['mai-thuc-loan'],
    tags: ['uprising', 'resistance'],
    image_url: '/img/events/mai-thuc-loan.jpg'
  },
  {
    id: 'phung_hung',
    title: 'Phùng Hưng tự xưng Bố Cái Đại Vương',
    year: 791,
    summary: 'Phùng Hưng đánh đuổi quan Đường, tự xưng là Bố Cái Đại Vương (Vua cha của nhân dân), cai trị 7 năm.',
    characters_involved: ['phung-hung'],
    tags: ['uprising', 'independence'],
    image_url: '/img/events/phung-hung.jpg'
  },

  // ========== TRUNG ĐẠI - Độc lập ==========
  {
    id: 'bach_dang_938',
    title: 'Trận Bạch Đằng',
    year: 938,
    start_date: '938-10-15',
    summary: 'Ngô Quyền đánh bại quân Nam Hán trên sông Bạch Đằng bằng chiến thuật cọc ngầm, giành độc lập cho dân tộc sau 1000 năm Bắc thuộc.',
    characters_involved: ['ngo-quyen'],
    tags: ['battle', 'independence', 'naval'],
    image_url: '/img/events/bach-dang-938.jpg'
  },
  {
    id: 'ngo_quyen_coronation',
    title: 'Ngô Quyền xưng vương',
    year: 939,
    summary: 'Sau chiến thắng Bạch Đằng, Ngô Quyền lên ngôi, lập nên nhà Ngô, chấm dứt thời kỳ Bắc thuộc.',
    characters_involved: ['ngo-quyen'],
    tags: ['politics', 'coronation'],
    image_url: '/img/events/ngo-quyen-king.jpg'
  },
  {
    id: 'dinh_bo_linh_unification',
    title: 'Đinh Bộ Lĩnh thống nhất đất nước',
    year: 968,
    summary: 'Đinh Bộ Lĩnh dẹp yên loạn 12 sứ quân, thống nhất đất nước, lập quốc hiệu Đại Cồ Việt.',
    characters_involved: ['dinh-bo-linh'],
    tags: ['politics', 'unification'],
    image_url: '/img/events/dinh-unification.jpg'
  },
  {
    id: 'ly_cong_uan_emperor',
    title: 'Lý Công Uẩn lên ngôi',
    year: 1009,
    summary: 'Lý Công Uẩn (Lý Thái Tổ) lên ngôi, lập ra nhà Lý - triều đại phong kiến lâu dài đầu tiên của Việt Nam.',
    characters_involved: ['ly-cong-uan'],
    tags: ['founding', 'politics', 'dynasty'],
    image_url: '/img/events/ly-cong-uan.jpg'
  },
  {
    id: 'ly_thai_to_capital',
    title: 'Lý Thái Tổ dời đô về Thăng Long',
    year: 1010,
    start_date: '1010-07-15',
    summary: 'Lý Công Uẩn dời đô từ Hoa Lư về Đại La (Thăng Long), mở ra thời kỳ phát triển mới cho đất nước.',
    characters_involved: ['ly-thai-to'],
    tags: ['politics', 'capital', 'development'],
    image_url: '/img/events/thang-long-capital.jpg'
  },
  {
    id: 'chua_mot_cot',
    title: 'Xây dựng Chùa Một Cột',
    year: 1049,
    summary: 'Lý Thái Tông xây Chùa Một Cột theo giấc mơ thấy Bồ Tát, kiến trúc độc đáo đặc trưng của Việt Nam.',
    characters_involved: ['ly-thai-tong'],
    tags: ['culture', 'architecture', 'buddhism'],
    image_url: '/img/events/chua-mot-cot.jpg'
  },
  {
    id: 'ly_thanh_tong_reforms',
    title: 'Lý Thánh Tông cải cách',
    year: 1075,
    summary: 'Lý Thánh Tông thực hiện nhiều cải cách quan trọng, xây dựng Văn Miếu, mở khoa thi Đại Việt đầu tiên.',
    characters_involved: ['ly-thanh-tong'],
    tags: ['education', 'culture', 'reform'],
    image_url: '/img/events/van-mieu.jpg'
  },
  {
    id: 'ly_thuong_kiet_poem',
    title: '"Nam quốc sơn hà" - Lý Thường Kiệt',
    year: 1077,
    summary: 'Lý Thường Kiệt viết "Nam quốc sơn hà Nam đế cư" - tuyên ngôn độc lập, bài thơ chữ Hán cổ nhất của Việt Nam.',
    characters_involved: ['ly-thuong-kiet'],
    tags: ['culture', 'literature', 'independence'],
    image_url: '/img/events/nam-quoc-son-ha.jpg'
  },
  {
    id: 'nhu_nguyet_battle',
    title: 'Chiến thắng Như Nguyệt',
    year: 1077,
    summary: 'Lý Thường Kiệt đại thắng 30 vạn quân Tống ở Như Nguyệt (Lạng Sơn), bảo vệ biên cương phía Bắc.',
    characters_involved: ['ly-thuong-kiet'],
    tags: ['battle', 'victory', 'defense'],
    image_url: '/img/events/nhu-nguyet.jpg'
  },
  {
    id: 'tran_dynasty_founding',
    title: 'Nhà Trần thành lập',
    year: 1225,
    summary: 'Trần Thủ Độ thực hiện "cải lão hoàn đồng", đưa Trần Cảnh lên ngôi, khai sáng triều Trần.',
    characters_involved: ['tran-thu-do', 'tran-thai-tong'],
    tags: ['politics', 'dynasty'],
    image_url: '/img/events/tran-founding.jpg'
  },
  {
    id: 'mongol_invasion_1',
    title: 'Quân Nguyên Mông xâm lược lần 1',
    year: 1258,
    summary: 'Quân Nguyên Mông do Ô Lương Hợp Thai chỉ huy tấn công Đại Việt lần đầu. Nhà Trần tổ chức kháng chiến.',
    characters_involved: ['tran-thanh-tong', 'tran-quoc-tuan'],
    tags: ['war', 'invasion'],
    image_url: '/img/events/mongol-invasion-1.jpg'
  },
  {
    id: 'mongol_invasion_2',
    title: 'Quân Nguyên xâm lược lần 2',
    year: 1285,
    summary: 'Quân Nguyên do Thoát Hoan và Ô Mã Nhi chỉ huy xâm lược lần hai với quy mô lớn hơn.',
    characters_involved: ['tran-nhan-tong', 'tran-hung-dao', 'tran-quang-khai'],
    tags: ['war', 'invasion'],
    image_url: '/img/events/mongol-invasion-2.jpg'
  },
  {
    id: 'hich_tuong_si',
    title: 'Hịch tướng sĩ',
    year: 1285,
    summary: 'Trần Quốc Tuấn viết Hịch tướng sĩ: "Dẫu còn núi Tản, sông Đà... Thà chết để giữ lấy danh thơm, khá hơn sống mà chịu sỉ nhục".',
    characters_involved: ['tran-hung-dao'],
    tags: ['culture', 'military', 'literature'],
    image_url: '/img/events/hich-tuong-si.jpg'
  },
  {
    id: 'chi_lang_victory',
    title: 'Chiến thắng Chí Lăng',
    year: 1287,
    start_date: '1287-01-20',
    summary: 'Trần Quang Khải đại thắng tại Chí Lăng, tiêu diệt hầu hết quân xâm lược, bắt sống Thoát Hoan.',
    characters_involved: ['tran-quang-khai', 'tran-hung-dao'],
    tags: ['battle', 'victory'],
    image_url: '/img/events/chi-lang.jpg'
  },
  {
    id: 'bach_dang_1288',
    title: 'Trận Bạch Đằng lần 2',
    year: 1288,
    start_date: '1288-04-09',
    summary: 'Trận quyết định đánh bại hoàn toàn quân Nguyên Mông. Trần Hưng Đạo dùng cọc ngầm trên sông Bạch Đằng, quân Nguyên tan vỡ hoàn toàn.',
    characters_involved: ['tran-hung-dao', 'tran-nhan-tong', 'tran-quoc-toan'],
    tags: ['battle', 'naval', 'victory', 'decisive'],
    image_url: '/img/events/bach-dang-1288.jpg'
  },
  {
    id: 'ho_quy_ly_reforms',
    title: 'Hồ Quý Ly cải cách',
    year: 1397,
    summary: 'Hồ Quý Ly thực hiện nhiều cải cách táo bạo về kinh tế, quân sự, giáo dục và tiền tệ.',
    characters_involved: ['ho-quy-ly'],
    tags: ['reform', 'economy', 'education'],
    image_url: '/img/events/ho-reforms.jpg'
  },
  {
    id: 'ho_dynasty_founding',
    title: 'Nhà Hồ thành lập',
    year: 1400,
    summary: 'Hồ Quý Ly lên ngôi, lập nên nhà Hồ, nhưng chỉ tồn tại ngắn ngủi.',
    characters_involved: ['ho-quy-ly'],
    tags: ['politics', 'dynasty'],
    image_url: '/img/events/ho-dynasty.jpg'
  },
  {
    id: 'ming_invasion',
    title: 'Quân Minh xâm lược',
    year: 1407,
    summary: 'Quân Minh xâm lược, đánh chiếm Đại Việt, mở ra 20 năm Bắc thuộc lần thứ 4.',
    characters_involved: ['ho-quy-ly', 'ho-han-thuong'],
    tags: ['war', 'invasion', 'occupation'],
    image_url: '/img/events/ming-invasion.jpg'
  },
  {
    id: 'lam_son_uprising',
    title: 'Khởi nghĩa Lam Sơn',
    year: 1418,
    summary: 'Lê Lợi khởi nghĩa tại Lam Sơn (Thanh Hóa) chống quân Minh, mở đầu 10 năm kháng chiến anh dũng.',
    characters_involved: ['le-loi', 'nguyen-trai'],
    tags: ['uprising', 'resistance', 'independence'],
    image_url: '/img/events/lam-son.jpg'
  },
  {
    id: 'tot_dong_victory',
    title: 'Chiến thắng Tốt Động - Chúc Động',
    year: 1426,
    summary: 'Quân Lam Sơn đại thắng quân Minh tại Tốt Động và Chúc Động, tạo bước ngoặt quyết định.',
    characters_involved: ['le-loi', 'le-lai'],
    tags: ['battle', 'victory'],
    image_url: '/img/events/tot-dong.jpg'
  },
  {
    id: 'le_dynasty_founding',
    title: 'Nhà Lê Sơ thành lập',
    year: 1428,
    summary: 'Lê Lợi lên ngôi, lập nên nhà Lê (Lê Sơ), mở ra thời kỳ phát triển mới.',
    characters_involved: ['le-loi'],
    tags: ['politics', 'dynasty', 'founding'],
    image_url: '/img/events/le-founding.jpg'
  },
  {
    id: 'le_thanh_tong_code',
    title: 'Quốc triều hình luật',
    year: 1483,
    summary: 'Lê Thánh Tông ban hành bộ luật Quốc triều hình luật, hoàn thiện hệ thống pháp luật phong kiến.',
    characters_involved: ['le-thanh-tong'],
    tags: ['law', 'reform', 'governance'],
    image_url: '/img/events/hinh-luat.jpg'
  },

  // ========== TRUNG ĐẠI - Phân tranh ==========
  {
    id: 'mac_dang_dung',
    title: 'Mạc Đăng Dung soán ngôi',
    year: 1527,
    summary: 'Mạc Đăng Dung soán ngôi nhà Lê, lập ra nhà Mạc. Bắt đầu thời kỳ phân tranh Mạc - Lê kéo dài gần 100 năm.',
    characters_involved: ['mac-dang-dung'],
    tags: ['politics', 'conflict'],
    image_url: '/img/events/mac-dang-dung.jpg'
  },
  {
    id: 'nguyen_kim_phuc_quoc',
    title: 'Nguyễn Kim phục quốc nhà Lê',
    year: 1533,
    summary: 'Nguyễn Kim lập Lê Trang Tông, khởi đầu thời kỳ Lê Trung Hưng và cuộc chiến Lê - Mạc.',
    characters_involved: ['nguyen-kim'],
    tags: ['politics', 'war', 'restoration'],
    image_url: '/img/events/nguyen-kim.jpg'
  },
  {
    id: 'trinh_nguyen_phan_tranh',
    title: 'Thời kỳ Trịnh - Nguyễn phân tranh',
    year: 1627,
    summary: 'Bắt đầu cuộc phân tranh giữa Trịnh ở phía Bắc và Nguyễn ở phía Nam, chia cắt đất nước suốt 200 năm.',
    characters_involved: ['trinh-trang', 'nguyen-phuc-nguyen'],
    tags: ['conflict', 'politics', 'civil-war'],
    image_url: '/img/events/trinh-nguyen.jpg'
  },
  {
    id: 'dong_da_1789',
    title: 'Chiến thắng Ngọc Hồi - Đống Đa',
    year: 1789,
    start_date: '1789-01-30',
    summary: 'Quang Trung Nguyễn Huệ đại phá 29 vạn quân Thanh trong 7 ngày Tết, chiến thắng vĩ đại nhất lịch sử Việt Nam.',
    characters_involved: ['nguyen-hue'],
    tags: ['battle', 'victory', 'tay-son'],
    image_url: '/img/events/dong-da.jpg'
  },
  {
    id: 'gia_long_thong_nhat',
    title: 'Gia Long thống nhất đất nước',
    year: 1802,
    summary: 'Nguyễn Ánh (Gia Long) thống nhất đất nước, lập nên triều Nguyễn, quốc hiệu Việt Nam.',
    characters_involved: ['gia-long'],
    tags: ['unification', 'founding', 'politics'],
    image_url: '/img/events/gia-long.jpg'
  },

  {
    id: 'quang_trung_reforms',
    title: 'Quang Trung cải cách',
    year: 1790,
    summary: 'Quang Trung tiến hành cải cách toàn diện: dùng chữ Nôm, khoa cử bằng tiếng Việt, phát triển kinh tế.',
    characters_involved: ['nguyen-hue'],
    tags: ['reform', 'culture', 'development'],
    image_url: '/img/events/quang-trung-reform.jpg'
  },
  {
    id: 'nguyen_anh_chien_dich',
    title: 'Nguyễn Ánh chiến dịch thống nhất',
    year: 1801,
    summary: 'Nguyễn Ánh đánh bại quân Tây Sơn, chuẩn bị thống nhất đất nước sau 200 năm phân tranh.',
    characters_involved: ['gia-long'],
    tags: ['war', 'unification'],
    image_url: '/img/events/nguyen-anh.jpg'
  },
  {
    id: 'quoc_hieu_viet_nam',
    title: 'Đặt quốc hiệu Việt Nam',
    year: 1804,
    summary: 'Gia Long xin nhà Thanh công nhận quốc hiệu "Việt Nam", tên gọi chính thức của đất nước cho đến ngày nay.',
    characters_involved: ['gia-long'],
    tags: ['politics', 'culture', 'founding'],
    image_url: '/img/events/viet-nam.jpg'
  },

  // ========== CẬN ĐẠI - Pháp thuộc ==========
  {
    id: 'phap_tan_cong_da_nang',
    title: 'Pháp tấn công Đà Nẵng',
    year: 1858,
    start_date: '1858-09-01',
    summary: 'Quân Pháp tấn công Đà Nẵng, mở đầu cuộc xâm lược Việt Nam của thực dân Pháp.',
    characters_involved: [],
    tags: ['war', 'invasion', 'colonial'],
    image_url: '/img/events/phap-tan-cong.jpg'
  },
  {
    id: 'nguyen_tri_phuong',
    title: 'Nguyễn Tri Phương bảo vệ Đà Nẵng',
    year: 1858,
    summary: 'Nguyễn Tri Phương anh dũng kháng chiến bảo vệ Đà Nẵng trước quân Pháp, dù bị thương vẫn chiến đấu.',
    characters_involved: ['nguyen-tri-phuong'],
    tags: ['battle', 'resistance', 'defense'],
    image_url: '/img/events/nguyen-tri-phuong.jpg'
  },
  {
    id: 'ky_hoa_1862',
    title: 'Hiệp ước Nhâm Tuất (Saigon)',
    year: 1862,
    summary: 'Triều đình Huế ký hiệp ước Nhâm Tuất, nhượng 3 tỉnh miền Đông Nam Kỳ cho Pháp.',
    characters_involved: [],
    tags: ['treaty', 'colonial', 'politics'],
    image_url: '/img/events/hiep-uoc-1862.jpg'
  },
  {
    id: 'truong_dinh_uprising',
    title: 'Khởi nghĩa Trương Định',
    year: 1862,
    summary: 'Trương Định khởi nghĩa chống Pháp ở miền Đông Nam Kỳ, tinh thần kháng chiến không khuất phục.',
    characters_involved: ['truong-dinh'],
    tags: ['uprising', 'resistance'],
    image_url: '/img/events/truong-dinh.jpg'
  },
  {
    id: 'harmand_treaty',
    title: 'Hiệp ước Hác-măng (Harmand)',
    year: 1883,
    summary: 'Triều đình Huế ký hiệp ước công nhận Việt Nam là thuộc địa của Pháp, chấm dứt độc lập hình thức.',
    characters_involved: [],
    tags: ['treaty', 'colonial', 'politics'],
    image_url: '/img/events/harmand.jpg'
  },
  {
    id: 'can_vuong',
    title: 'Phong trào Cần Vương',
    year: 1885,
    summary: 'Tôn Thất Thuyết phát động phong trào Cần Vương hỗ trợ vua Hàm Nghi chống Pháp trên khắp cả nước.',
    characters_involved: ['ham-nghi', 'ton-that-thuyet'],
    tags: ['uprising', 'resistance', 'royalist'],
    image_url: '/img/events/can-vuong.jpg'
  },
  {
    id: 'phan_dinh_phung',
    title: 'Khởi nghĩa Phan Đình Phùng',
    year: 1885,
    summary: 'Phan Đình Phùng lãnh đạo phong trào kháng chiến ở Hà Tĩnh, chiến đấu 10 năm đến chết.',
    characters_involved: ['phan-dinh-phung'],
    tags: ['uprising', 'resistance', 'hero'],
    image_url: '/img/events/phan-dinh-phung.jpg'
  },
  {
    id: 'hoang_hoa_tham',
    title: 'Khởi nghĩa Hoàng Hoa Thám (Đề Thám)',
    year: 1887,
    summary: 'Hoàng Hoa Thám (Đề Thám) khởi nghĩa ở Yên Thế, chống Pháp suốt 26 năm.',
    characters_involved: ['hoang-hoa-tham'],
    tags: ['uprising', 'resistance', 'guerrilla'],
    image_url: '/img/events/de-tham.jpg'
  },
  {
    id: 'phan_boi_chau',
    title: 'Phong trào Đông Du',
    year: 1905,
    summary: 'Phan Bội Châu khởi xướng phong trào Đông Du, gửi thanh niên sang Nhật học tập để cứu nước.',
    characters_involved: ['phan-boi-chau'],
    tags: ['education', 'resistance', 'reform'],
    image_url: '/img/events/dong-du.jpg'
  },
  {
    id: 'phan_chu_trinh',
    title: 'Phong trào Duy Tân',
    year: 1906,
    summary: 'Phan Châu Trinh khởi xướng phong trào Duy Tân, chủ trương cải cách văn hóa, giáo dục để cứu nước.',
    characters_involved: ['phan-chu-trinh'],
    tags: ['reform', 'education', 'modernization'],
    image_url: '/img/events/duy-tan.jpg'
  },
  {
    id: 'dong_kinh_nghia_thuc',
    title: 'Trường Đông Kinh Nghĩa Thục',
    year: 1907,
    summary: 'Khai trường Đông Kinh Nghĩa Thục, trường học mới đầu tiên, phổ biến văn hóa dân tộc và kiến thức mới.',
    characters_involved: ['luong-van-can'],
    tags: ['education', 'modernization', 'culture'],
    image_url: '/img/events/dong-kinh.jpg'
  },
  {
    id: 'yen_bai_1930',
    title: 'Khởi nghĩa Yên Bái',
    year: 1930,
    start_date: '1930-02-10',
    summary: 'Việt Nam Quốc Dân Đảng khởi nghĩa vũ trang tại Yên Bái, dù thất bại nhưng gây chấn động dư luận.',
    characters_involved: ['nguyen-thai-hoc'],
    tags: ['uprising', 'resistance', 'sacrifice'],
    image_url: '/img/events/yen-bai.jpg'
  },
  {
    id: 'nghe_tinh_soviet',
    title: 'Phong trào Xô Viết Nghệ Tĩnh',
    year: 1930,
    summary: 'Phong trào cách mạng lớn của nông dân Nghệ An - Hà Tĩnh chống đế quốc Pháp và tay sai.',
    characters_involved: [],
    tags: ['uprising', 'communist', 'resistance'],
    image_url: '/img/events/nghe-tinh.jpg'
  },
  {
    id: 'dang_thanh_lap',
    title: 'Thành lập Đảng Cộng sản Việt Nam',
    year: 1930,
    start_date: '1930-02-03',
    summary: 'Hội nghị hợp nhất thành lập Đảng Cộng sản Việt Nam tại Hương Cảng do Nguyễn Ái Quốc chủ trì.',
    characters_involved: ['ho-chi-minh'],
    tags: ['politics', 'founding', 'communist'],
    image_url: '/img/events/dang-thanh-lap.jpg'
  },
  {
    id: 'mat_tran_viet_minh',
    title: 'Thành lập Mặt trận Việt Minh',
    year: 1941,
    start_date: '1941-05-19',
    summary: 'Hội nghị Trung ương 8 thành lập Mặt trận Việt Minh, chuẩn bị cho Cách mạng Tháng Tám.',
    characters_involved: ['ho-chi-minh'],
    tags: ['politics', 'founding', 'resistance'],
    image_url: '/img/events/viet-minh.jpg'
  },
  {
    id: 'doi_viet_minh',
    title: 'Đội Việt Nam Tuyên truyền Giải phóng quân',
    year: 1944,
    start_date: '1944-12-22',
    summary: 'Võ Nguyên Giáp thành lập Đội Việt Nam Tuyên truyền Giải phóng quân (tiền thân Quân đội Nhân dân Việt Nam).',
    characters_involved: ['vo-nguyen-giap'],
    tags: ['military', 'founding'],
    image_url: '/img/events/giai-phong-quan.jpg'
  },

  // ========== HIỆN ĐẠI - Độc lập ==========
  {
    id: 'cach_mang_thang_tam',
    title: 'Cách mạng Tháng Tám',
    year: 1945,
    start_date: '1945-08-19',
    summary: 'Nhân dân Việt Nam nổi dậy giành chính quyền trong cả nước, lập nên nước Việt Nam Dân chủ Cộng hòa.',
    characters_involved: ['ho-chi-minh'],
    tags: ['revolution', 'independence', 'politics'],
    image_url: '/img/events/thang-tam.jpg'
  },
  {
    id: 'doc_lap_2_9',
    title: 'Tuyên ngôn Độc lập',
    year: 1945,
    start_date: '1945-09-02',
    summary: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    characters_involved: ['ho-chi-minh'],
    tags: ['independence', 'proclamation', 'historic'],
    image_url: '/img/events/doc-lap.jpg'
  },
  {
    id: 'toan_quoc_khang_chien',
    title: 'Toàn quốc kháng chiến',
    year: 1946,
    start_date: '1946-12-19',
    summary: 'Chủ tịch Hồ Chí Minh phát động toàn quốc kháng chiến chống thực dân Pháp với lời kêu gọi "Quyết tử cho Tổ quốc quyết sinh".',
    characters_involved: ['ho-chi-minh'],
    tags: ['war', 'resistance', 'proclamation'],
    image_url: '/img/events/toan-quoc-khang-chien.jpg'
  },
  {
    id: 'chien_dich_bien_gioi',
    title: 'Chiến dịch Biên giới 1950',
    year: 1950,
    summary: 'Chiến thắng Biên giới Thu-Đông 1950, mở đầu thời kỳ quân ta chuyển sang tổng phản công.',
    characters_involved: ['vo-nguyen-giap'],
    tags: ['battle', 'victory', 'offensive'],
    image_url: '/img/events/bien-gioi-1950.jpg'
  },
  {
    id: 'hoa_binh_campaign',
    title: 'Chiến dịch Hòa Bình',
    year: 1951,
    summary: 'Chiến dịch Hòa Bình 1951-1952, đánh bại kế hoạch "đánh nhanh thắng nhanh" của Pháp.',
    characters_involved: ['vo-nguyen-giap'],
    tags: ['battle', 'strategy'],
    image_url: '/img/events/hoa-binh.jpg'
  },
  {
    id: 'dien_bien_phu',
    title: 'Chiến thắng Điện Biên Phủ',
    year: 1954,
    start_date: '1954-05-07',
    summary: 'Chiến thắng lịch sử "lừng lẫy năm châu, chấn động địa cầu", đánh bại thực dân Pháp, kết thúc 9 năm kháng chiến.',
    characters_involved: ['vo-nguyen-giap'],
    tags: ['battle', 'victory', 'historic'],
    image_url: '/img/events/dien-bien-phu.jpg'
  },
  {
    id: 'hoi_nghi_geneva',
    title: 'Hiệp định Genève',
    year: 1954,
    start_date: '1954-07-21',
    summary: 'Ký kết Hiệp định Genève về Đông Dương, công nhận độc lập, chủ quyền của Việt Nam, tạm chia đất nước ở vĩ tuyến 17.',
    characters_involved: ['pham-van-dong'],
    tags: ['treaty', 'politics', 'partition'],
    image_url: '/img/events/geneva.jpg'
  },
  {
    id: 'duong_ho_chi_minh',
    title: 'Đường Hồ Chí Minh huyền thoại',
    year: 1959,
    summary: 'Mở đường Trường Sơn (Đường Hồ Chí Minh) chi viện cho miền Nam, huyết mạch vận chuyển trong chiến tranh.',
    characters_involved: [],
    tags: ['logistics', 'war', 'strategy'],
    image_url: '/img/events/duong-hcm.jpg'
  },
  {
    id: 'tet_mau_than',
    title: 'Chiến dịch Tết Mậu Thân',
    year: 1968,
    start_date: '1968-01-30',
    summary: 'Tổng tiến công Tết Mậu Thân 1968, chiến dịch quân sự-chính trị lớn, làm thay đổi chiến lược của Mỹ.',
    characters_involved: [],
    tags: ['battle', 'offensive', 'turning-point'],
    image_url: '/img/events/tet-mau-than.jpg'
  },
  {
    id: 'paris_agreement',
    title: 'Hiệp định Paris về Việt Nam',
    year: 1973,
    start_date: '1973-01-27',
    summary: 'Ký Hiệp định Paris về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam. Mỹ cam kết rút quân.',
    characters_involved: ['le-duc-tho'],
    tags: ['treaty', 'diplomacy', 'peace'],
    image_url: '/img/events/paris-1973.jpg'
  },
  {
    id: 'giai_phong_mien_nam',
    title: 'Giải phóng miền Nam',
    year: 1975,
    start_date: '1975-04-30',
    summary: 'Chiến dịch Hồ Chí Minh kết thúc thắng lợi, giải phóng hoàn toàn miền Nam, thống nhất đất nước.',
    characters_involved: ['van-tien-dung'],
    tags: ['victory', 'liberation', 'unification'],
    image_url: '/img/events/30-4.jpg'
  },
  {
    id: 'thong_nhat_dat_nuoc',
    title: 'Thống nhất đất nước',
    year: 1976,
    start_date: '1976-07-02',
    summary: 'Quốc hội thống nhất họp, quyết định đổi tên nước thành Cộng hòa xã hội chủ nghĩa Việt Nam.',
    characters_involved: [],
    tags: ['unification', 'politics', 'historic'],
    image_url: '/img/events/thong-nhat.jpg'
  },
  {
    id: 'doi_moi_1986',
    title: 'Đại hội Đảng VI - Đổi mới',
    year: 1986,
    start_date: '1986-12-15',
    summary: 'Đại hội Đảng lần thứ VI khởi xướng công cuộc Đổi mới toàn diện đất nước, mở đường cho sự phát triển.',
    characters_involved: ['nguyen-van-linh'],
    tags: ['reform', 'politics', 'development'],
    image_url: '/img/events/doi-moi.jpg'
  },
  {
    id: 'quan_he_my_viet',
    title: 'Bình thường hóa quan hệ Việt - Mỹ',
    year: 1995,
    start_date: '1995-07-11',
    summary: 'Việt Nam và Hoa Kỳ chính thức thiết lập quan hệ ngoại giao, mở ra kỷ nguyên mới.',
    characters_involved: [],
    tags: ['diplomacy', 'politics', 'international'],
    image_url: '/img/events/my-viet.jpg'
  },
  {
    id: 'gia_nhap_wto',
    title: 'Gia nhập WTO',
    year: 2007,
    start_date: '2007-01-11',
    summary: 'Việt Nam chính thức trở thành thành viên thứ 150 của Tổ chức Thương mại Thế giới (WTO).',
    characters_involved: [],
    tags: ['economy', 'international', 'development'],
    image_url: '/img/events/wto.jpg'
  }
];

/**
 * Get sample timeline data
 */
export function getSampleTimelineData() {
  return {
    periods: PERIODS,
    events: EVENTS
  };
}

/**
 * Get events by period
 */
export function getEventsByPeriod(periodId) {
  return EVENTS.filter(event => {
    const period = PERIODS.find(p => p.id === periodId);
    if (!period) return false;
    return event.year >= period.start && event.year <= period.end;
  });
}

/**
 * Get events by character
 */
export function getEventsByCharacter(characterId) {
  return EVENTS.filter(event =>
    event.characters_involved.includes(characterId)
  );
}

/**
 * Get events by year range
 */
export function getEventsByYearRange(startYear, endYear) {
  return EVENTS.filter(event =>
    event.year >= startYear && event.year <= endYear
  );
}
