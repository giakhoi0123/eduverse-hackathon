/**
 * Generated dataset of 100 historical Vietnamese figures.
 * Each entry includes core metadata used by the EduVerse app.
 */

export const CATEGORY_TEMPLATES = {
  military: {
    traits: [
      'Dũng cảm, kiên cường trước thử thách',
      'Quyết đoán trong giờ phút sinh tử',
      'Đặt lợi ích dân tộc lên trên hết'
    ],
    speech: [
      'Giọng điệu hào hùng, khích lệ chiến đấu',
      'Ưa dùng hình ảnh sông núi và binh pháp',
      'Luôn nhắc giữ kỷ luật và đoàn kết'
    ],
    knowledge: [
      'Chiến thuật và chiến lược quân sự Việt Nam',
      'Tinh thần yêu nước và đoàn kết toàn dân'
    ]
  },
  leader: {
    traits: [
      'Hiền minh, đặt dân làm gốc',
      'Bình tĩnh trước biến động',
      'Tôn trọng hiền tài và pháp luật'
    ],
    speech: [
      'Ngôn từ điềm tĩnh, giàu tầm nhìn',
      'Nhấn mạnh đạo lý trị quốc, an dân',
      'Khuyến khích đoàn kết và giáo hóa'
    ],
    knowledge: [
      'Chính sách trị quốc, an dân của các triều đại Việt Nam',
      'Giữ gìn văn hiến, mở mang bờ cõi'
    ]
  },
  scholar: {
    traits: [
      'Uyên bác, khiêm nhường',
      'Đam mê học hỏi và truyền bá tri thức',
      'Giữ gìn đạo đức và nhân cách'
    ],
    speech: [
      'Ngôn ngữ chuẩn mực, giàu hình ảnh văn chương',
      'Ưa dẫn chứng lịch sử, thi ca',
      'Khuyến khích học tập, tu dưỡng'
    ],
    knowledge: [
      'Văn học, triết học và sử học Việt Nam',
      'Giáo dục, đạo lý làm người'
    ]
  },
  revolutionary: {
    traits: [
      'Kiên trung, tận tụy với lý tưởng',
      'Sẵn sàng hi sinh vì độc lập tự do',
      'Gần gũi quần chúng, tôn trọng đồng đội'
    ],
    speech: [
      'Chân thành, truyền cảm hứng đấu tranh',
      'Nhấn mạnh tinh thần đoàn kết toàn dân',
      'Lạc quan, tin tưởng vào tương lai'
    ],
    knowledge: [
      'Phong trào giải phóng dân tộc Việt Nam',
      'Bài học tổ chức, vận động quần chúng'
    ]
  }
};

export const COLOR_BY_CATEGORY = {
  military: '#DC2626',
  leader: '#2563EB',
  scholar: '#10B981',
  revolutionary: '#EF4444'
};

export const AVATARS_BY_CATEGORY = {
  military: ['⚔️', '🛡️', '🏹', '⚡'],
  leader: ['👑', '🏯', '📯', '🛕'],
  scholar: ['📜', '📚', '🖋️', '🎓'],
  revolutionary: ['🚩', '🔥', '🌟', '💪']
};

export const CHARACTER_DEFINITIONS = [
  // Military leaders (25)
  {
    id: 'tran-hung-dao',
    name: 'Trần Hưng Đạo',
    title: 'Quốc Công Tiết Chế',
    era: 'Thế kỷ 13',
    dynasty: 'Trần',
    description: 'Danh tướng triều Trần, ba lần đánh bại quân Nguyên Mông.',
    previewQuote: 'Bạch Đằng dậy sóng giữ vững non sông!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chiến thắng Bạch Đằng năm 1288',
      'Soạn Hịch Tướng Sĩ khích lệ quân dân'
    ]
  },
  {
    id: 'ly-thuong-kiet',
    name: 'Lý Thường Kiệt',
    title: 'Thái Úy Quốc Công',
    era: 'Thế kỷ 11',
    dynasty: 'Lý',
    description: 'Tướng lĩnh nhà Lý, người mở cuộc tiến công phòng ngự thắng lợi chống Tống.',
    previewQuote: 'Nam Quốc Sơn Hà là lời thề sông núi!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Cuộc phản công đánh Tống 1075-1077',
      'Bài thơ Nam Quốc Sơn Hà khẳng định chủ quyền'
    ]
  },
  {
    id: 'ngo-quyen',
    name: 'Ngô Quyền',
    title: 'Người Mở Nền Tự Chủ',
    era: 'Thế kỷ 10',
    dynasty: 'Ngô',
    description: 'Anh hùng dân tộc đánh tan quân Nam Hán trên sông Bạch Đằng.',
    previewQuote: 'Đánh một trận rửa sạch thẹn nghìn năm!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chiến thắng Bạch Đằng năm 938',
      'Đặt nền móng độc lập thời Ngô'
    ]
  },
  {
    id: 'dinh-tien-hoang',
    name: 'Đinh Tiên Hoàng',
    title: 'Hoàng Đế Đại Cồ Việt',
    era: 'Thế kỷ 10',
    dynasty: 'Đinh',
    description: 'Người dẹp loạn 12 sứ quân, lập nên nhà nước Đại Cồ Việt.',
    previewQuote: 'Non sông từ đây có chủ!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Dẹp yên loạn 12 sứ quân',
      'Xây dựng quân đội và luật pháp đầu triều Đinh'
    ]
  },
  {
    id: 'quang-trung',
    name: 'Quang Trung (Nguyễn Huệ)',
    title: 'Hoàng Đế Tây Sơn',
    era: 'Thế kỷ 18',
    dynasty: 'Tây Sơn',
    description: 'Nhà quân sự thiên tài đánh tan 29 vạn quân Thanh trong xuân Kỷ Dậu.',
    previewQuote: 'Thần tốc để quyết thắng!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chiến thắng Ngọc Hồi - Đống Đa 1789',
      'Cải cách giáo dục và quân đội thời Tây Sơn'
    ]
  },
  {
    id: 'pham-ngu-lao',
    name: 'Phạm Ngũ Lão',
    title: 'Tráng Sĩ Nhà Trần',
    era: 'Thế kỷ 13',
    dynasty: 'Trần',
    description: 'Tráng sĩ nhà Trần nổi tiếng với tài dụng binh và lòng trung nghĩa.',
    previewQuote: 'Thẹn thùng vì chưa báo đền nợ nước!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Góp công trong kháng chiến chống Nguyên lần hai và ba',
      'Nêu gương chí khí Đông A'
    ]
  },
  {
    id: 'tran-binh-trong',
    name: 'Trần Bình Trọng',
    title: 'Cẩm Vệ Đại Tướng',
    era: 'Thế kỷ 13',
    dynasty: 'Trần',
    description: 'Vị tướng trẻ hi sinh khi bị bắt, để lại câu nói bất hủ về lòng trung quân.',
    previewQuote: 'Ta thà làm quỷ nước Nam!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Giữ thành Thăng Long năm 1285',
      'Biểu tượng trung trinh bất khuất'
    ]
  },
  {
    id: 'tran-quang-khai',
    name: 'Trần Quang Khải',
    title: 'Thượng Tướng Thái Sư',
    era: 'Thế kỷ 13',
    dynasty: 'Trần',
    description: 'Tướng lĩnh kiệt xuất đồng thời là nhà thơ tài danh thời Trần.',
    previewQuote: 'Hào khí Đông A muôn đời không tắt!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chỉ huy chiến thắng Hàm Tử - Chương Dương',
      'Củng cố đoàn kết nội bộ triều Trần'
    ]
  },
  {
    id: 'tran-nhat-duat',
    name: 'Trần Nhật Duật',
    title: 'Chiêu Văn Vương',
    era: 'Thế kỷ 13',
    dynasty: 'Trần',
    description: 'Nhà ngoại giao và quân sự tài ba, am hiểu nhiều ngôn ngữ dân tộc.',
    previewQuote: 'Hiểu người để giữ yên biên ải!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Dẹp loạn Ai Lao, giữ ổn định vùng biên',
      'Khéo léo ngoại giao với các tù trưởng miền núi'
    ]
  },
  {
    id: 'tran-quoc-toan',
    name: 'Trần Quốc Toản',
    title: 'Thiếu Niên Anh Hùng',
    era: 'Thế kỷ 13',
    dynasty: 'Trần',
    description: 'Thiếu niên 16 tuổi tự lập quân đánh giặc giữ nước thời Trần.',
    previewQuote: 'Tuổi trẻ không chịu đứng ngoài trận tuyến!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chiêu mộ nghĩa quân chống Nguyên',
      'Nêu gương tinh thần yêu nước của thanh thiếu niên'
    ]
  },
  {
    id: 'bui-thi-xuan',
    name: 'Bùi Thị Xuân',
    title: 'Nữ Tướng Tây Sơn',
    era: 'Thế kỷ 18',
    dynasty: 'Tây Sơn',
    description: 'Nữ tướng nổi danh với đội tượng binh thiện chiến của phong trào Tây Sơn.',
    previewQuote: 'Đội tượng binh xung phong phá trận!',
    category: 'military',
    gender: 'female',
    highlights: [
      'Chỉ huy đội tượng binh Tây Sơn',
      'Tinh thần quả cảm bảo vệ kinh đô Phú Xuân'
    ]
  },
  {
    id: 'dang-dung',
    name: 'Đặng Dung',
    title: 'Anh Hùng Hậu Trần',
    era: 'Thế kỷ 15',
    dynasty: 'Hậu Trần',
    description: 'Danh tướng nghĩa quân Hậu Trần với chí lớn khôi phục quốc thống.',
    previewQuote: 'Nợ tang bồng quyết trả!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Lãnh đạo nghĩa quân chống Minh',
      'Bài thơ Thuật Hoài thể hiện tiết khí nhà Trần'
    ]
  },
  {
    id: 'nguyen-tri-phuong',
    name: 'Nguyễn Tri Phương',
    title: 'Danh Tướng Triều Nguyễn',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Tổng đốc thành Hà Nội ba lần chống Pháp, biểu tượng khí tiết trung quân.',
    previewQuote: 'Lấy thân mình chống giữ thành trì!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chỉ huy phòng thủ Gia Định, Đà Nẵng, Hà Nội',
      'Tinh thần bất khuất trước vũ khí hiện đại'
    ]
  },
  {
    id: 'hoang-hoa-tham',
    name: 'Hoàng Hoa Thám',
    title: 'Thủ Lĩnh Yên Thế',
    era: 'Thế kỷ 19-20',
    dynasty: 'Hiện đại',
    description: 'Lãnh tụ nghĩa quân Yên Thế, chiến đấu bền bỉ suốt 25 năm chống Pháp.',
    previewQuote: 'Rừng Yên Thế là thành lũy nghĩa quân!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Lãnh đạo khởi nghĩa Yên Thế 1885-1913',
      'Chiến tranh du kích bảo vệ nông dân trung du'
    ]
  },
  {
    id: 'nguyen-huynh-duc',
    name: 'Nguyễn Huỳnh Đức',
    title: 'Danh Tướng Gia Định',
    era: 'Thế kỷ 18-19',
    dynasty: 'Nguyễn',
    description: 'Tướng trung thành giúp Nguyễn Ánh tái lập vương triều Nguyễn ở Nam Bộ.',
    previewQuote: 'Trung nghĩa dựng nên cơ nghiệp phương Nam!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Hộ giá Nguyễn Ánh lấy lại Gia Định',
      'Kiến thiết vùng đất phương Nam thời Gia Long'
    ]
  },
  {
    id: 'vo-nguyen-giap',
    name: 'Võ Nguyên Giáp',
    title: 'Tổng Tư Lệnh',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Đại tướng huyền thoại, chỉ huy chiến thắng Điện Biên Phủ và đại thắng 1975.',
    previewQuote: 'Chiến tranh nhân dân là sức mạnh vô địch!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chiến thắng Điện Biên Phủ 1954',
      'Tổng tiến công và nổi dậy mùa xuân 1975'
    ]
  },
  {
    id: 'le-trong-tan',
    name: 'Lê Trọng Tấn',
    title: 'Tư Lệnh Mũi Tây Nam',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Vị tướng chiến lược của Quân đội Nhân dân Việt Nam trong nhiều chiến dịch lớn.',
    previewQuote: 'Đánh chắc, tiến chắc để giữ vững thành quả!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chỉ huy chiến dịch Điện Biên Phủ và Hồ Chí Minh',
      'Phát triển học thuyết tác chiến hợp đồng binh chủng'
    ]
  },
  {
    id: 'vuong-thua-vu',
    name: 'Vương Thừa Vũ',
    title: 'Tư Lệnh Bộ Đội Chuẩn',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Tướng lĩnh đầu tiên của Quân đội Nhân dân Việt Nam, nổi bật trong chiến dịch Biên Giới.',
    previewQuote: 'Từ nhân dân mà ra, vì nhân dân mà chiến đấu!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chỉ huy chiến dịch Biên Giới 1950',
      'Đặt nền móng cho bộ đội chủ lực'
    ]
  },
  {
    id: 'hoang-van-thai',
    name: 'Hoàng Văn Thái',
    title: 'Tổng Tham Mưu Trưởng Đầu Tiên',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Người giữ vai trò tham mưu chiến lược ngay từ những ngày đầu kháng chiến.',
    previewQuote: 'Tham mưu sắc bén để chiến thắng!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Tổng tham mưu trưởng đầu tiên của Quân đội Nhân dân Việt Nam',
      'Xây dựng phương thức tác chiến cách mạng'
    ]
  },
  {
    id: 'dong-sy-nguyen',
    name: 'Đồng Sỹ Nguyên',
    title: 'Tư Lệnh Trường Sơn',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Tư lệnh đường Trường Sơn, đảm bảo huyết mạch chi viện miền Nam.',
    previewQuote: 'Trường Sơn nối dài ý chí thống nhất!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chỉ huy Bộ đội Trường Sơn trong kháng chiến chống Mỹ',
      'Tổ chức mạng lưới hậu cần chiến lược Đông Dương'
    ]
  },
  {
    id: 'be-van-dan',
    name: 'Bế Văn Đàn',
    title: 'Anh Hùng Điện Biên',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Chiến sĩ quả cảm lấy thân mình làm giá súng tại Điện Biên Phủ.',
    previewQuote: 'Sống bám cầu, chết bám súng!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Anh hùng liệt sĩ chiến dịch Điện Biên Phủ',
      'Biểu tượng tinh thần xung phong không ngại hy sinh'
    ]
  },
  {
    id: 'nguyen-huu-canh',
    name: 'Nguyễn Hữu Cảnh',
    title: 'Khai Quốc Nam Bộ',
    era: 'Thế kỷ 17',
    dynasty: 'Nguyễn',
    description: 'Danh tướng mở mang đất phương Nam và lập phủ Gia Định.',
    previewQuote: 'Mở cõi phương Nam, giữ vững cõi bờ!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Thiết lập phủ Gia Định năm 1698',
      'Tổ chức hành chính vùng đất Nam Bộ'
    ]
  },
  {
    id: 'tran-khanh-du',
    name: 'Trần Khánh Dư',
    title: 'Phó Đô Tướng Nhà Trần',
    era: 'Thế kỷ 13',
    dynasty: 'Trần',
    description: 'Vị tướng hải quân góp công lớn trong chiến thắng Vân Đồn.',
    previewQuote: 'Đánh chặn lương thảo, bẻ gãy quân thù!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chặn đánh đoàn thuyền lương Trương Văn Hổ',
      'Tinh thông thủy chiến giữ tuyến Vân Đồn'
    ]
  },
  {
    id: 'dinh-nup',
    name: 'Đinh Núp (Anh hùng Núp)',
    title: 'Anh Hùng Tây Nguyên',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Già làng Tây Nguyên lãnh đạo đồng bào chống Pháp bền bỉ.',
    previewQuote: 'Rừng Tây Nguyên là chiến khu của chúng ta!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Lãnh đạo chiến khu Đak Tơ - Tân Cảnh',
      'Biểu tượng đoàn kết các dân tộc Tây Nguyên'
    ]
  },
  {
    id: 'huynh-van-nghe',
    name: 'Huỳnh Văn Nghệ',
    title: 'Kỳ Tài Miền Đông',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà thơ - tướng lĩnh, chỉ huy Chiến khu 7 thời kháng Pháp.',
    previewQuote: 'Từ thơ ca đến trận địa đều vì nước!',
    category: 'military',
    gender: 'male',
    highlights: [
      'Chỉ huy Chiến khu 7 miền Đông Nam Bộ',
      'Kết hợp văn chương khích lệ tinh thần kháng chiến'
    ]
  },

  // Leaders (25)
  {
    id: 'ly-thai-to',
    name: 'Lý Thái Tổ',
    title: 'Khai Quốc Nhà Lý',
    era: 'Thế kỷ 11',
    dynasty: 'Lý',
    description: 'Vị vua dời đô về Thăng Long, mở ra thời kỳ phồn vinh lâu dài.',
    previewQuote: 'Thăng Long hội tụ linh khí trời đất!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Ban Chiếu dời đô về thành Thăng Long',
      'Đặt nền tảng hành chính và quân sự triều Lý'
    ]
  },
  {
    id: 'ly-thanh-tong',
    name: 'Lý Thánh Tông',
    title: 'Hoàng Đế Đại Việt',
    era: 'Thế kỷ 11',
    dynasty: 'Lý',
    description: 'Nhà vua đặt quốc hiệu Đại Việt và mở mang giáo dục Nho học.',
    previewQuote: 'Lấy nhân nghĩa làm gốc trị quốc!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Đặt quốc hiệu Đại Việt năm 1054',
      'Khuyến khích học tập, dựng Văn Miếu Thăng Long'
    ]
  },
  {
    id: 'ly-nhan-tong',
    name: 'Lý Nhân Tông',
    title: 'Anh Minh Hoàng Đế',
    era: 'Thế kỷ 11-12',
    dynasty: 'Lý',
    description: 'Nhà vua trị vì lâu nhất triều Lý, chú trọng giáo dục và nhân ái.',
    previewQuote: 'Lấy đức để quy tụ lòng dân!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Mở khoa thi đầu tiên của Đại Việt',
      'Xây dựng Quốc Tử Giám đào tạo hiền tài'
    ]
  },
  {
    id: 'ly-chieu-hoang',
    name: 'Lý Chiêu Hoàng',
    title: 'Nữ Hoàng Đế Duy Nhất',
    era: 'Thế kỷ 13',
    dynasty: 'Lý',
    description: 'Nữ hoàng đầu tiên và duy nhất của Đại Việt, chuyển giao hòa bình cho triều Trần.',
    previewQuote: 'Gánh nặng ngai vàng ở tuổi thiếu niên!',
    category: 'leader',
    gender: 'female',
    highlights: [
      'Chuyển giao quyền lực từ Lý sang Trần',
      'Biểu tượng bản lĩnh phụ nữ thời trung đại'
    ]
  },
  {
    id: 'tran-thai-tong',
    name: 'Trần Thái Tông',
    title: 'Khai Quốc Nhà Trần',
    era: 'Thế kỷ 13',
    dynasty: 'Trần',
    description: 'Vị vua đầu triều Trần, vừa là nhà tư tưởng vừa là tướng lĩnh.',
    previewQuote: 'Lấy dân làm gốc để dựng nghiệp lâu bền!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Đặt nền móng cho nhà Trần',
      'Tác phẩm Khóa Hư Lục về đạo lý trị quốc'
    ]
  },
  {
    id: 'tran-nhan-tong',
    name: 'Trần Nhân Tông',
    title: 'Vua Phật Hoàng',
    era: 'Thế kỷ 13-14',
    dynasty: 'Trần',
    description: 'Hoàng đế hai lần đánh bại quân Nguyên rồi xuất gia sáng lập Thiền phái Trúc Lâm.',
    previewQuote: 'Tâm an thì nước an!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Hai lần đại phá quân Nguyên',
      'Sáng lập Thiền phái Trúc Lâm Yên Tử'
    ]
  },
  {
    id: 'tran-anh-tong',
    name: 'Trần Anh Tông',
    title: 'Hoàng Đế An Hòa',
    era: 'Thế kỷ 14',
    dynasty: 'Trần',
    description: 'Nhà vua tiếp nối thịnh trị, củng cố quốc phòng và ngoại giao.',
    previewQuote: 'Giữ yên biên cương để dân an nghiệp!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Củng cố triều chính sau kháng chiến',
      'Khuyến khích khai thác biển và thương mại'
    ]
  },
  {
    id: 'tran-minh-tong',
    name: 'Trần Minh Tông',
    title: 'Quân Vương Khoan Hòa',
    era: 'Thế kỷ 14',
    dynasty: 'Trần',
    description: 'Nhà vua tài năng, giữ ổn định đất nước và trọng dụng hiền tài.',
    previewQuote: 'Lấy đức rộng mà thu nhân tâm!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Giữ vững biên cương phía bắc',
      'Trọng dụng danh sĩ như Chu Văn An'
    ]
  },
  {
    id: 'le-loi',
    name: 'Lê Lợi',
    title: 'Anh Hùng Lam Sơn',
    era: 'Thế kỷ 15',
    dynasty: 'Lê',
    description: 'Vị lãnh tụ nghĩa quân Lam Sơn, sáng lập nhà Lê sơ.',
    previewQuote: 'Thuận thiên thì dân mới theo!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Khởi nghĩa Lam Sơn giành độc lập',
      'Đặt nền móng nhà Lê sơ'
    ]
  },
  {
    id: 'le-thai-tong',
    name: 'Lê Thái Tông',
    title: 'Hoàng Đế Anh Minh',
    era: 'Thế kỷ 15',
    dynasty: 'Lê',
    description: 'Nhà vua trẻ phát triển triều chính sau thắng lợi Lam Sơn.',
    previewQuote: 'Vững triều chính, yên lòng muôn dân!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Củng cố nhà nước Lê sơ',
      'Trấn áp vụ Lệ Chi Viên để giữ kỷ cương'
    ]
  },
  {
    id: 'le-thanh-tong',
    name: 'Lê Thánh Tông',
    title: 'Minh Quân Hồng Đức',
    era: 'Thế kỷ 15',
    dynasty: 'Lê',
    description: 'Nhà vua đưa Đại Việt vào thời kỳ hưng thịnh Hồng Đức.',
    previewQuote: 'Hiền tài là nguyên khí của quốc gia!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Ban hành Bộ luật Hồng Đức',
      'Mở rộng lãnh thổ đến miền Trung và Nam Bộ'
    ]
  },
  {
    id: 'le-hien-tong',
    name: 'Lê Hiến Tông',
    title: 'Hoàng Đế Trọng Nho',
    era: 'Thế kỷ 15',
    dynasty: 'Lê',
    description: 'Nhà vua tiếp nối thời Hồng Đức, chú trọng giáo hóa và văn trị.',
    previewQuote: 'Giữ đạo Nho để nước vững bền!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Duy trì thời kỳ hưng thịnh Hồng Đức',
      'Khuyến khích biên soạn sử sách'
    ]
  },
  {
    id: 'le-kinh-tong',
    name: 'Lê Kính Tông',
    title: 'Hoàng Đế Trung Hưng',
    era: 'Thế kỷ 17',
    dynasty: 'Lê Trung Hưng',
    description: 'Vua nhà Lê Trung Hưng cố gắng giữ thế cân bằng thế kỷ 17.',
    previewQuote: 'Giữ vững triều chính giữa thời phân tranh!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Cải tổ quân đội nhà Lê Trung Hưng',
      'Thúc đẩy giao thương với Nhật Bản và phương Tây'
    ]
  },
  {
    id: 'mac-dang-dung',
    name: 'Mạc Đăng Dung',
    title: 'Thái Tổ Nhà Mạc',
    era: 'Thế kỷ 16',
    dynasty: 'Mạc',
    description: 'Người sáng lập triều Mạc, chú trọng ổn định vùng ven biển.',
    previewQuote: 'Lấy thực lực để bảo vệ cơ đồ!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Thiết lập triều Mạc năm 1527',
      'Cải tổ quân đội và kinh tế vùng Đông Bắc'
    ]
  },
  {
    id: 'nguyen-hoang',
    name: 'Nguyễn Hoàng',
    title: 'Chúa Tiên Đàng Trong',
    era: 'Thế kỷ 16-17',
    dynasty: 'Nguyễn',
    description: 'Vị chúa đầu tiên của Đàng Trong, mở mang Thuận Hóa - Quảng Nam.',
    previewQuote: 'Mở cõi phía Nam bằng sự khoan hòa!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Khai phá vùng Thuận Quảng',
      'Đặt nền cai quản Đàng Trong'
    ]
  },
  {
    id: 'nguyen-phuc-chu',
    name: 'Nguyễn Phúc Chu',
    title: 'Quốc Chúa Hiền',
    era: 'Thế kỷ 18',
    dynasty: 'Nguyễn',
    description: 'Chúa Nguyễn có công củng cố chính quyền Đàng Trong và mở rộng thương mại.',
    previewQuote: 'Ngoại giao mềm dẻo để giữ yên bờ cõi!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Củng cố chính quyền Đàng Trong',
      'Mở rộng giao thương với thương nhân phương Tây'
    ]
  },
  {
    id: 'gia-long',
    name: 'Gia Long (Nguyễn Ánh)',
    title: 'Hoàng Đế Nhà Nguyễn',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Vị vua thống nhất đất nước sau thời Tây Sơn, xây dựng kinh thành Huế.',
    previewQuote: 'Thống nhất giang sơn từ Bắc chí Nam!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Thống nhất đất nước năm 1802',
      'Xây dựng kinh thành Huế và bộ máy triều Nguyễn'
    ]
  },
  {
    id: 'minh-mang',
    name: 'Minh Mạng',
    title: 'Hoàng Đế Cải Cách',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Nhà vua nổi tiếng với cải cách hành chính và giáo dục.',
    previewQuote: 'Nghiêm minh để nước mạnh!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Cải cách hành chính năm 1831-1832',
      'Phát triển giáo dục, y tế triều Nguyễn'
    ]
  },
  {
    id: 'thieu-tri',
    name: 'Thiệu Trị',
    title: 'Hoàng Đế Văn Hiến',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Vua chú trọng bảo tồn văn hóa truyền thống và Phật giáo.',
    previewQuote: 'Giữ nề nếp để nước yên bình!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Bảo tồn văn hóa cung đình Huế',
      'Xây dựng Văn Miếu Huế'
    ]
  },
  {
    id: 'tu-duc',
    name: 'Tự Đức',
    title: 'Hoàng Đế Thi Hương',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Vị vua yêu thơ phú, đối mặt với thử thách ngoại xâm.',
    previewQuote: 'Văn chương để khơi dậy lòng người!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Khuyến khích thi ca, dịch thuật',
      'Đối diện với áp lực Pháp xâm lược'
    ]
  },
  {
    id: 'ham-nghi',
    name: 'Hàm Nghi',
    title: 'Hoàng Đế Cần Vương',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Nhà vua trẻ khởi xướng phong trào Cần Vương chống Pháp.',
    previewQuote: 'Cần vương dựng lại cơ đồ nước Nam!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Ban chiếu Cần Vương 1885',
      'Giữ tinh thần kháng chiến khi bị lưu đày'
    ]
  },
  {
    id: 'duy-tan',
    name: 'Duy Tân',
    title: 'Hoàng Đế Yêu Nước',
    era: 'Thế kỷ 20',
    dynasty: 'Nguyễn',
    description: 'Vị vua trẻ tham gia phong trào chống Pháp, biểu tượng thanh niên yêu nước.',
    previewQuote: 'Tuổi trẻ phải biết lo cho nước!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Tham gia phong trào chống Pháp năm 1916',
      'Khích lệ phong trào Duy Tân ở Trung Kỳ'
    ]
  },
  {
    id: 'bao-dai',
    name: 'Bảo Đại',
    title: 'Hoàng Đế Cuối Cùng',
    era: 'Thế kỷ 20',
    dynasty: 'Nguyễn',
    description: 'Vị vua cuối cùng của triều Nguyễn, thoái vị năm 1945.',
    previewQuote: 'Trao ấn kiếm để dân tộc tự quyết tương lai!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Thoái vị ngày 30/8/1945',
      'Kết thúc chế độ quân chủ ở Việt Nam'
    ]
  },
  {
    id: 'ho-quy-ly',
    name: 'Hồ Quý Ly',
    title: 'Nhà Cải Cách Cuối Trần',
    era: 'Thế kỷ 14-15',
    dynasty: 'Hồ',
    description: 'Nhà cải cách gây tranh cãi với nhiều biện pháp táo bạo cuối triều Trần.',
    previewQuote: 'Cải cách để cứu nước khỏi suy vong!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Cải cách tiền tệ, thi cử cuối thời Trần',
      'Đưa chữ Nôm vào giáo dục và thi cử'
    ]
  },
  {
    id: 'nguyen-nhac',
    name: 'Nguyễn Nhạc',
    title: 'Tây Sơn Thái Đức Đế',
    era: 'Thế kỷ 18',
    dynasty: 'Tây Sơn',
    description: 'Anh cả phong trào Tây Sơn, dựng chính quyền ở Quy Nhơn.',
    previewQuote: 'Đem công bằng cho dân nghèo!',
    category: 'leader',
    gender: 'male',
    highlights: [
      'Lãnh đạo khởi nghĩa Tây Sơn giai đoạn đầu',
      'Xây dựng chính quyền tại Quy Nhơn'
    ]
  },

  // Scholars (25)
  {
    id: 'nguyen-trai-scholar',
    refId: 'nguyen-trai',
    name: 'Nguyễn Trãi',
    title: 'Danh Nho Toàn Tài',
    era: 'Thế kỷ 15',
    dynasty: 'Lê',
    description: 'Mưu sĩ Lam Sơn, tác giả Bình Ngô Đại Cáo – áng thiên cổ hùng văn.',
    previewQuote: 'Lấy đại nghĩa thắng hung tàn!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Bình Ngô Đại Cáo khẳng định độc lập dân tộc',
      'Tư tưởng nhân nghĩa trị quốc an dân'
    ]
  },
  {
    id: 'le-quy-don-scholar',
    refId: 'le-quy-don',
    name: 'Lê Quý Đôn',
    title: 'Bác Học Thời Lê',
    era: 'Thế kỷ 18',
    dynasty: 'Lê',
    description: 'Nhà bác học uyên thâm, để lại kho tàng sách sử đồ sộ.',
    previewQuote: 'Học rộng, biết sâu để giúp đời!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Tác phẩm Vân Đài Loại Ngữ và Kiến Văn Tiểu Lục',
      'Nghiên cứu địa lý, lịch sử, văn hóa Việt Nam'
    ]
  },
  {
    id: 'chu-van-an-scholar',
    refId: 'chu-van-an',
    name: 'Chu Văn An',
    title: 'Tôn Sư Đạo Học',
    era: 'Thế kỷ 14',
    dynasty: 'Trần',
    description: 'Nhà giáo mẫu mực, dâng Thất trảm sớ nêu cao khí tiết sĩ tử.',
    previewQuote: 'Tiên học lễ, hậu học văn!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Dâng Thất trảm sớ can gián vua Trần Dụ Tông',
      'Đào tạo nhiều nhân tài tại Quốc Tử Giám'
    ]
  },
  {
    id: 'nguyen-du-scholar',
    refId: 'nguyen-du',
    name: 'Nguyễn Du',
    title: 'Đại Thi Hào Dân Tộc',
    era: 'Thế kỷ 18-19',
    dynasty: 'Nguyễn',
    description: 'Tác giả Truyện Kiều, đưa tiếng Việt văn học đạt đỉnh cao.',
    previewQuote: 'Trăm năm trong cõi người ta...',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Truyện Kiều phản ánh thân phận con người',
      'Thơ chữ Hán giàu triết lý nhân sinh'
    ]
  },
  {
    id: 'nguyen-dinh-chieu-scholar',
    refId: 'nguyen-dinh-chieu',
    name: 'Nguyễn Đình Chiểu',
    title: 'Nhà Thơ Yêu Nước',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Tác giả Lục Vân Tiên, nhà thơ mù với tấm lòng sáng.',
    previewQuote: 'Sống làm người nghĩa hiệp, thác hóa thần trung can.',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Lục Vân Tiên đề cao nghĩa hiệp',
      'Khích lệ tinh thần kháng Pháp ở Nam Bộ'
    ]
  },
  {
    id: 'nguyen-binh-khiem',
    name: 'Nguyễn Bỉnh Khiêm',
    title: 'Trạng Trình',
    era: 'Thế kỷ 16',
    dynasty: 'Mạc',
    description: 'Nhà tiên tri - hiền sĩ, đặt nền cho nhiều lời sấm ký.',
    previewQuote: 'Một lời để lại ngàn năm ngẫm nghĩ!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Sấm ký Trạng Trình lưu truyền dân gian',
      'Khuyên bảo vua quan giữ đạo trị nước'
    ]
  },
  {
    id: 'nguyen-thiep',
    name: 'Nguyễn Thiếp (La Sơn Phu Tử)',
    title: 'Danh Sĩ Nghệ An',
    era: 'Thế kỷ 18',
    dynasty: 'Lê - Tây Sơn',
    description: 'Bậc hiền sĩ được Quang Trung trọng dụng để cải cách giáo dục.',
    previewQuote: 'Trí tuệ khai dân trí, đạo đức dưỡng dân tâm!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Tham mưu cải cách giáo dục cho Quang Trung',
      'Mở trường dạy học ở núi Thiên Nhẫn'
    ]
  },
  {
    id: 'phan-huy-chu',
    name: 'Phan Huy Chú',
    title: 'Nhà Bách Khoa Sử Học',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Quan sử học triều Nguyễn, tác giả Lịch Triều Hiến Chương Loại Chí.',
    previewQuote: 'Chép sử để hiểu đạo thịnh suy!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Biên soạn Lịch Triều Hiến Chương Loại Chí',
      'Khảo cứu kinh tế, văn hóa, pháp luật các triều'
    ]
  },
  {
    id: 'phan-huy-ich',
    name: 'Phan Huy Ích',
    title: 'Danh Sĩ Tây Sơn',
    era: 'Thế kỷ 18',
    dynasty: 'Lê - Tây Sơn',
    description: 'Nhà ngoại giao, nhà thơ phục vụ triều Tây Sơn.',
    previewQuote: 'Văn chương gắn liền vận nước!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Tham gia đoàn ngoại giao sang Trung Hoa',
      'Tác phẩm Dụ Am Ngâm Lục'
    ]
  },
  {
    id: 'mac-dinh-chi',
    name: 'Mạc Đĩnh Chi',
    title: 'Lưỡng Quốc Trạng Nguyên',
    era: 'Thế kỷ 14',
    dynasty: 'Trần',
    description: 'Trạng nguyên nổi tiếng thông minh, làm rạng danh Đại Việt ở Trung Hoa.',
    previewQuote: 'Cần học và liêm chính để đứng giữa triều đình!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Đỗ đầu kỳ thi Đại Việt và nhà Nguyên',
      'Biểu tượng trí tuệ và liêm khiết'
    ]
  },
  {
    id: 'luong-the-vinh',
    name: 'Lương Thế Vinh',
    title: 'Trạng Lường',
    era: 'Thế kỷ 15',
    dynasty: 'Lê',
    description: 'Nhà toán học đầu tiên của Việt Nam với tác phẩm Đại Thành Toán Pháp.',
    previewQuote: 'Toán học là nền tảng của trị nước!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Tác phẩm Đại Thành Toán Pháp',
      'Đóng góp cho giáo dục khoa học thời Hồng Đức'
    ]
  },
  {
    id: 'doan-thi-diem',
    name: 'Đoàn Thị Điểm',
    title: 'Nữ Sĩ Chinh Phụ Ngâm',
    era: 'Thế kỷ 18',
    dynasty: 'Lê',
    description: 'Nữ sĩ nổi tiếng với bản dịch Chinh Phụ Ngâm.',
    previewQuote: 'Tâm tình người ở người đi chan chứa!',
    category: 'scholar',
    gender: 'female',
    highlights: [
      'Dịch Chinh Phụ Ngâm xuất sắc',
      'Biểu tượng tài hoa của phụ nữ đương thời'
    ]
  },
  {
    id: 'ba-huyen-thanh-quan',
    name: 'Bà Huyện Thanh Quan',
    title: 'Nữ Thi Sĩ Cổ Điển',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Nhà thơ nổi tiếng với phong vị hoài cổ và thanh nhã.',
    previewQuote: 'Bóng chiều tà gợi nhớ nước non xưa!',
    category: 'scholar',
    gender: 'female',
    highlights: [
      'Tập thơ gợi nhớ Thăng Long Hà Nội',
      'Ngôn từ cổ điển, tinh tế'
    ]
  },
  {
    id: 'ho-xuan-huong',
    name: 'Hồ Xuân Hương',
    title: 'Bà Chúa Thơ Nôm',
    era: 'Thế kỷ 18-19',
    dynasty: 'Nguyễn',
    description: 'Nữ sĩ nổi tiếng với thơ Nôm đầy cá tính và nhân văn.',
    previewQuote: 'Thơ Nôm cất tiếng thay lời phụ nữ!',
    category: 'scholar',
    gender: 'female',
    highlights: [
      'Sáng tạo thơ Nôm độc đáo',
      'Phản ánh thân phận phụ nữ trong xã hội phong kiến'
    ]
  },
  {
    id: 'cao-ba-quat',
    name: 'Cao Bá Quát',
    title: 'Thần Siêu Thánh Quát',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Nhà thơ tài hoa và chí sĩ yêu nước thời Nguyễn.',
    previewQuote: 'Văn chương phải đi cùng chí khí!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Phong trào Mỹ Lương chống triều đình',
      'Thơ văn phóng khoáng, phản kháng'
    ]
  },
  {
    id: 'nguyen-cong-tru',
    name: 'Nguyễn Công Trứ',
    title: 'Ông Nghè Hà Tĩnh',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Quan lại, nhà thơ nổi tiếng với nhân sinh quan phóng khoáng.',
    previewQuote: 'Đã mang tiếng ở trong trời đất!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Khai khẩn ruộng đất Tiền Hải, Kim Sơn',
      'Thơ văn nói lên chí làm trai'
    ]
  },
  {
    id: 'phung-khac-khoan',
    name: 'Phùng Khắc Khoan',
    title: 'Trạng Bùng',
    era: 'Thế kỷ 16',
    dynasty: 'Lê Trung Hưng',
    description: 'Nhà ngoại giao và thơ văn nổi tiếng thời Lê Trung Hưng.',
    previewQuote: 'Ngoại giao mềm dẻo để giữ hòa!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Sứ thần sang Trung Hoa',
      'Đóng góp cho thơ Nôm trung đại'
    ]
  },
  {
    id: 'nguyen-quang-bich',
    name: 'Nguyễn Quang Bích',
    title: 'Nhà Thơ Cần Vương',
    era: 'Thế kỷ 19',
    dynasty: 'Nguyễn',
    description: 'Lãnh tụ Cần Vương kiêm thi sĩ với nhiều tác phẩm yêu nước.',
    previewQuote: 'Thơ ca để thắp lửa kháng chiến!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Lãnh đạo nghĩa quân Cần Vương Nghệ Tĩnh',
      'Sáng tác thơ cổ động phong trào yêu nước'
    ]
  },
  {
    id: 'truong-vinh-ky',
    name: 'Trương Vĩnh Ký (Pétrus Ký)',
    title: 'Học Giả Đa Ngữ',
    era: 'Thế kỷ 19',
    dynasty: 'Hiện đại',
    description: 'Học giả am tường nhiều ngoại ngữ, góp phần phát triển chữ Quốc ngữ.',
    previewQuote: 'Ngôn ngữ là cầu nối văn hóa!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Biên soạn từ điển và sách Quốc ngữ đầu tiên',
      'Góp công phổ biến chữ Quốc ngữ'
    ]
  },
  {
    id: 'phan-khoi',
    name: 'Phan Khôi',
    title: 'Nhà Báo Khai Phóng',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà báo, học giả tiên phong cho phong trào Thơ mới.',
    previewQuote: 'Tự do tư tưởng để văn chương đổi mới!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Khởi xướng phong trào Thơ mới năm 1932',
      'Bài báo Sương rơi – Lối thơ mới'
    ]
  },
  {
    id: 'tan-da',
    name: 'Tản Đà (Nguyễn Khắc Hiếu)',
    title: 'Thi Sĩ Lãng Tử',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Thi sĩ chuyển giao giữa thơ cũ và thơ mới với phong cách phóng khoáng.',
    previewQuote: 'Say thơ như say ánh trăng xưa!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Phong cách thơ lãng tử đầu thế kỷ 20',
      'Góp phần cách tân văn học hiện đại'
    ]
  },
  {
    id: 'xuan-dieu',
    name: 'Xuân Diệu',
    title: 'Ông Hoàng Thơ Tình',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà thơ trữ tình nổi bật của phong trào Thơ mới.',
    previewQuote: 'Yêu cuồng nhiệt để sống trọn từng khoảnh khắc!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Tác phẩm Thơ Thơ, Gửi Hương Cho Gió',
      'Đóng góp cho phê bình văn học hiện đại'
    ]
  },
  {
    id: 'han-mac-tu',
    name: 'Hàn Mặc Tử',
    title: 'Thi Sĩ Trăng Sao',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Thi sĩ tài hoa bạc mệnh, đại diện cho trường phái tượng trưng.',
    previewQuote: 'Trăng ghen cùng ánh mắt!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Tác phẩm Gái Quê, Đau Thương',
      'Phong cách thơ tượng trưng, siêu thực'
    ]
  },
  {
    id: 'vu-trong-phung',
    name: 'Vũ Trọng Phụng',
    title: 'Ông Vua Phóng Sự',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà văn hiện thực phê phán với nhiều tác phẩm sắc sảo.',
    previewQuote: 'Viết để phơi bày sự thật xã hội!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Tác phẩm Số Đỏ, Giông Tố',
      'Phóng sự điều tra sắc bén về xã hội thuộc địa'
    ]
  },
  {
    id: 'to-hoai',
    name: 'Tô Hoài',
    title: 'Nhà Văn Miền Núi',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà văn nổi tiếng với Dế Mèn Phiêu Lưu Ký và tác phẩm về miền núi.',
    previewQuote: 'Dế mèn đi mãi để kể chuyện đời!',
    category: 'scholar',
    gender: 'male',
    highlights: [
      'Tác phẩm Dế Mèn Phiêu Lưu Ký',
      'Ghi chép sinh động về văn hóa miền núi'
    ]
  },

  // Revolutionaries (25)
  {
    id: 'ho-chi-minh-rev',
    refId: 'ho-chi-minh',
    name: 'Hồ Chí Minh',
    title: 'Chủ Tịch Nước Việt Nam Dân Chủ Cộng Hòa',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Người sáng lập Đảng Cộng sản Việt Nam, lãnh đạo cách mạng giành độc lập.',
    previewQuote: 'Không có gì quý hơn độc lập tự do!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Cách mạng Tháng Tám 1945',
      'Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa'
    ]
  },
  {
    id: 'phan-boi-chau',
    name: 'Phan Bội Châu',
    title: 'Nhà Cách Mạng Đông Du',
    era: 'Thế kỷ 19-20',
    dynasty: 'Hiện đại',
    description: 'Người khởi xướng phong trào Đông Du, thức tỉnh lòng yêu nước.',
    previewQuote: 'Người Việt phải tự đứng lên cứu nước!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Phong trào Đông Du đưa thanh niên sang Nhật',
      'Tác phẩm Việt Nam Vong Quốc Sử'
    ]
  },
  {
    id: 'phan-chau-trinh',
    name: 'Phan Châu Trinh',
    title: 'Nhà Khai Dân Trí',
    era: 'Thế kỷ 19-20',
    dynasty: 'Hiện đại',
    description: 'Nhà cải cách ôn hòa chủ trương khai dân trí, chấn dân khí.',
    previewQuote: 'Khai dân trí, chấn dân khí, hậu dân sinh!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Phong trào Duy Tân và Đông Kinh Nghĩa Thục',
      'Diễn thuyết cổ vũ giáo dục và dân chủ'
    ]
  },
  {
    id: 'vo-thi-sau',
    name: 'Võ Thị Sáu',
    title: 'Nữ Liệt Sĩ Đất Đỏ',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Biểu tượng tuổi trẻ anh dũng trong kháng chiến chống Pháp.',
    previewQuote: 'Sống làm người, chết hóa linh thiêng giữ nước!',
    category: 'revolutionary',
    gender: 'female',
    highlights: [
      'Tham gia đội du kích Đất Đỏ từ tuổi thiếu niên',
      'Hi sinh tại Côn Đảo năm 1952'
    ]
  },
  {
    id: 'nguyen-thi-minh-khai',
    name: 'Nguyễn Thị Minh Khai',
    title: 'Nữ Lãnh Đạo Cách Mạng',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Lãnh đạo cách mạng kiên trung, tham gia nhiều hội nghị quốc tế.',
    previewQuote: 'Phụ nữ cũng đủ sức gánh vác giang sơn!',
    category: 'revolutionary',
    gender: 'female',
    highlights: [
      'Ủy viên Trung ương Đảng Cộng sản Đông Dương',
      'Tham dự Đại hội Quốc tế Cộng sản năm 1935'
    ]
  },
  {
    id: 'tran-phu',
    name: 'Trần Phú',
    title: 'Tổng Bí Thư Đầu Tiên',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Tổng Bí thư đầu tiên của Đảng Cộng sản Đông Dương.',
    previewQuote: 'Hỡi đồng chí, hãy giữ vững chí khí chiến đấu!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Soạn thảo Luận cương chính trị 1930',
      'Gương hi sinh khi mới 27 tuổi'
    ]
  },
  {
    id: 'le-hong-phong',
    name: 'Lê Hồng Phong',
    title: 'Lãnh Đạo Quốc Tế',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà lãnh đạo phong trào cộng sản quốc tế, Tổng Bí thư thứ hai.',
    previewQuote: 'Kiên định đường lối cách mạng vô sản!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Tổng Bí thư Đảng Cộng sản Đông Dương 1935-1936',
      'Lãnh đạo phong trào Mặt trận Dân chủ Đông Dương'
    ]
  },
  {
    id: 'nguyen-van-cu',
    name: 'Nguyễn Văn Cừ',
    title: 'Tổng Bí Thư Liêm Chính',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Tổng Bí thư kiên quyết, tác giả tác phẩm Tự chỉ trích nổi tiếng.',
    previewQuote: 'Tự phê bình để mạnh mẽ tiến lên!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Tổng Bí thư Đảng giai đoạn 1938-1940',
      'Tác phẩm Tự chỉ trích nêu cao tinh thần xây dựng Đảng'
    ]
  },
  {
    id: 'ha-huy-tap',
    name: 'Hà Huy Tập',
    title: 'Nhà Lý Luận Cách Mạng',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Tổng Bí thư thứ ba, chú trọng công tác tổ chức và lý luận.',
    previewQuote: 'Kỷ luật là sức mạnh của Đảng!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Lãnh đạo Đảng 1936-1938',
      'Củng cố tổ chức cơ sở đến tận quần chúng'
    ]
  },
  {
    id: 'ly-tu-trong',
    name: 'Lý Tự Trọng',
    title: 'Tuổi Trẻ Anh Hùng',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Thanh niên tiêu biểu của phong trào cách mạng, hi sinh khi 17 tuổi.',
    previewQuote: 'Con đường của thanh niên chỉ có thể là con đường cách mạng!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Tham gia hoạt động cách mạng từ nhỏ',
      'Hi sinh tại Sài Gòn năm 1931'
    ]
  },
  {
    id: 'nguyen-van-troi',
    name: 'Nguyễn Văn Trỗi',
    title: 'Anh Hùng Điện Lực',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Chiến sĩ biệt động dũng cảm hy sinh trên pháp trường Chợ Lớn.',
    previewQuote: 'Hãy hướng về Miền Nam anh hùng!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Mưu sát Bộ trưởng McNamara năm 1963',
      'Tinh thần bất khuất trước pháp trường'
    ]
  },
  {
    id: 'vo-van-kiet',
    name: 'Võ Văn Kiệt',
    title: 'Nhà Lãnh Đạo Đổi Mới',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Thủ tướng thời kỳ đầu đổi mới, người đề xướng nhiều chính sách cởi mở.',
    previewQuote: 'Dám nghĩ, dám làm vì dân!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Thủ tướng Việt Nam 1991-1997',
      'Thúc đẩy chính sách đổi mới kinh tế'
    ]
  },
  {
    id: 'nguyen-van-linh',
    name: 'Nguyễn Văn Linh',
    title: 'Tổng Bí Thư Đổi Mới',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Tổng Bí thư khởi xướng đường lối đổi mới năm 1986.',
    previewQuote: 'Hãy tự cứu mình trước khi trời cứu!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Khởi xướng đường lối đổi mới 1986',
      'Phong trào Gặp nhau cuối tuần trên báo Nhân Dân'
    ]
  },
  {
    id: 'ton-duc-thang',
    name: 'Tôn Đức Thắng',
    title: 'Chủ Tịch Nước',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà lãnh đạo công nhân, Chủ tịch nước sau Hồ Chí Minh.',
    previewQuote: 'Người công nhân luôn đặt lợi ích tập thể lên trên!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Tham gia phong trào công nhân Sài Gòn',
      'Chủ tịch nước 1969-1980'
    ]
  },
  {
    id: 'pham-van-dong',
    name: 'Phạm Văn Đồng',
    title: 'Thủ Tướng Ngoại Giao',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Thủ tướng lâu năm, nổi bật với đường lối ngoại giao mềm dẻo.',
    previewQuote: 'Đối ngoại khôn khéo giữ vững hòa bình!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Thủ tướng Chính phủ 1955-1987',
      'Ký Tuyên bố về chủ quyền Hoàng Sa - Trường Sa'
    ]
  },
  {
    id: 'truong-chinh',
    name: 'Trường Chinh',
    title: 'Nhà Lý Luận Xuất Sắc',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà lý luận chủ chốt, Tổng Bí thư nhiều nhiệm kỳ.',
    previewQuote: 'Kiên định đường lối cách mạng khoa học!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Soạn thảo Đề cương văn hóa 1943',
      'Tổng Bí thư giai đoạn 1941-1956, 1986'
    ]
  },
  {
    id: 'vo-chi-cong',
    name: 'Võ Chí Công',
    title: 'Chủ Tịch Hội Đồng Nhà Nước',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà lãnh đạo miền Trung, góp phần thống nhất đất nước.',
    previewQuote: 'Đại đoàn kết là sức mạnh vô tận!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Lãnh đạo phong trào cách mạng miền Trung',
      'Chủ tịch Hội đồng Nhà nước 1987-1992'
    ]
  },
  {
    id: 'nguyen-thi-dinh',
    name: 'Nguyễn Thị Định',
    title: 'Nữ Tướng Đồng Khởi',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nữ lãnh đạo phong trào Đồng Khởi Bến Tre, Phó Tư lệnh Quân Giải phóng.',
    previewQuote: 'Phụ nữ Nam Bộ đâu chịu ngồi yên!',
    category: 'revolutionary',
    gender: 'female',
    highlights: [
      'Lãnh đạo phong trào Đồng Khởi 1960',
      'Phó Tư lệnh Quân Giải phóng miền Nam'
    ]
  },
  {
    id: 'nguyen-an-ninh',
    name: 'Nguyễn An Ninh',
    title: 'Nhà Báo Cách Mạng',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà báo trí thức, cổ vũ thanh niên Sài Gòn dấn thân cứu nước.',
    previewQuote: 'Thanh niên phải bừng tỉnh trước vận nước!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Sáng lập báo La Cloche fêlée',
      'Vận động thanh niên trí thức Nam Kỳ'
    ]
  },
  {
    id: 'nguyen-binh',
    name: 'Nguyễn Bình',
    title: 'Tư Lệnh Nam Bộ',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Tư lệnh chi đạo chiến khu miền Nam những năm đầu kháng chiến chống Pháp.',
    previewQuote: 'Biến Sài Gòn thành vùng khởi nghĩa!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Tư lệnh Chiến khu 7, 8, 9',
      'Xây dựng lực lượng vũ trang Nam Bộ'
    ]
  },
  {
    id: 'pham-ngoc-thach',
    name: 'Phạm Ngọc Thạch',
    title: 'Bác Sĩ Cách Mạng',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Bác sĩ, lãnh đạo y tế trong kháng chiến và hòa bình.',
    previewQuote: 'Y tế cũng là chiến tuyến bảo vệ nhân dân!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Bộ trưởng Y tế đầu tiên của nước Việt Nam thống nhất',
      'Tổ chức công tác cứu thương kháng chiến'
    ]
  },
  {
    id: 'tran-dai-nghia',
    name: 'Trần Đại Nghĩa',
    title: 'Nhà Khoa Học Quân Sự',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà khoa học, tướng lĩnh góp công chế tạo vũ khí cho kháng chiến.',
    previewQuote: 'Khoa học phục vụ chiến trường!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Chế tạo súng SKZ và vũ khí kháng chiến',
      'Bộ trưởng Công nghiệp nặng đầu tiên'
    ]
  },
  {
    id: 'hoang-van-thu',
    name: 'Hoàng Văn Thụ',
    title: 'Nhà Lãnh Đạo Bắc Kỳ',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Lãnh đạo phong trào cách mạng vùng trung du và Hà Nội.',
    previewQuote: 'Sắc son trước máy chém!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Ủy viên Thường vụ Trung ương Đảng 1940',
      'Tinh thần bất khuất trước pháp trường'
    ]
  },
  {
    id: 'nguyen-chi-thanh',
    name: 'Nguyễn Chí Thanh',
    title: 'Ủy Viên Bộ Chính Trị',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Uỷ viên Bộ Chính trị phụ trách chiến trường miền Nam.',
    previewQuote: 'Thắng lợi thuộc về nhân dân!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Bí thư Trung ương Cục miền Nam',
      'Động viên phong trào thi đua giết giặc lập công'
    ]
  },
  {
    id: 'pham-hung',
    name: 'Phạm Hùng',
    title: 'Thủ Tướng Kiên Trung',
    era: 'Thế kỷ 20',
    dynasty: 'Hiện đại',
    description: 'Nhà lãnh đạo Nam Bộ, Thủ tướng thời kỳ đầu đổi mới.',
    previewQuote: 'Trọn đời tận tụy với cách mạng!',
    category: 'revolutionary',
    gender: 'male',
    highlights: [
      'Bí thư Trung ương Cục miền Nam',
      'Thủ tướng Chính phủ 1987-1988'
    ]
  }
];
