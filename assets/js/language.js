// Language Translation System - Bestasv International Trade
// Stable and complete implementation for multi-language support

// Translation data structure
const translations = {
    'zh-TW': {
        'brand-name': '貝達國際貿易',
        'nav-home': '首頁',
        'nav-about': '關於我們',
        'nav-services': '產品與服務',
        'nav-process': '合作流程',
        'nav-news': '最新消息',
        'nav-faq': '常見問題',
        'nav-contact': '聯絡我們',
        
        'hero-title': '連接全球商機<br>創造無限可能',
        'hero-subtitle': '貝達國際貿易有限公司 - 您專業的進出口服務夥伴，提供採購代理、供應商媒合、訂單協調等全方位國際貿易解決方案',
        'btn-contact': '立即聯絡',
        'btn-services': '了解服務',
        
        'services-title': '核心服務',
        'services-subtitle': '提供專業、高效、可靠的國際貿易服務',
        'service-sourcing-title': '採購代理',
        'service-sourcing-desc': '專業採購團隊為您尋找最優質的供應商和產品',
        'service-trade-title': '進出口服務',
        'service-trade-desc': '完整的進出口流程管理，確保貨物順利通關',
        'service-matching-title': '供應商媒合',
        'service-matching-desc': '精準匹配供應商需求，建立長期合作關係',
        'service-logistics-title': '物流協調',
        'service-logistics-desc': '從報價到出貨的全程物流追蹤與協調',
        
        'advantages-title': '為什麼選擇貝達',
        'advantages-subtitle': '專業、可靠、高效的國際貿易夥伴',
        'advantage-exp-title': '年行業經驗',
        'advantage-exp-desc': '深耕國際貿易領域，累積豐富實戰經驗',
        'advantage-suppliers-title': '合作供應商',
        'advantage-suppliers-desc': '遍布全球的優質供應商網絡',
        'advantage-satisfaction-title': '客戶滿意度',
        'advantage-satisfaction-desc': '以專業服務贏得客戶信賴',
        'advantage-support-title': '客戶支援',
        'advantage-support-desc': '全天候客戶服務，即時回應需求',
        
        'categories-title': '產業分類',
        'categories-subtitle': '多元化產品線，滿足各種採購需求',
        'category-industrial-title': '工業五金',
        'category-industrial-desc': '各類工業用五金零件、工具及配件',
        'category-machinery-title': '機械零件',
        'category-machinery-desc': '精密機械零件、軸承、齒輪等',
        'category-construction-title': '建材工程',
        'category-construction-desc': '建築材料、工程配件、裝潢用品',
        'category-custom-title': '客製採購品',
        'category-custom-desc': '根據客戶需求定制專屬產品',
        'category-link': '了解更多',
        
        'process-preview-title': '合作流程',
        'process-preview-subtitle': '簡化流程，高效合作',
        'step-1-title': '需求確認',
        'step-1-desc': '深入了解客戶需求與規格要求',
        'step-2-title': '供應商開發',
        'step-2-desc': '尋找並篩選最適合的供應商',
        'step-3-title': '報價與樣品',
        'step-3-desc': '提供詳細報價與產品樣品',
        'step-4-title': '下單與出貨',
        'step-4-desc': '處理訂單並安排出貨追蹤',
        'btn-process-detail': '查看詳細流程',
        
        'news-preview-title': '最新消息',
        'news-preview-subtitle': '掌握產業動態，了解市場趨勢',
        'news-category-company': '公司消息',
        'news-category-industry': '產業資訊',
        'news-category-market': '市場趨勢',
        'news-1-title': '貝達國際貿易正式成立',
        'news-1-excerpt': '我們很高興宣布貝達國際貿易有限公司正式成立，致力於提供專業的進出口服務...',
        'news-2-title': '2024年全球貿易趨勢分析',
        'news-2-excerpt': '探討當前全球貿易環境的變化與未來發展機遇...',
        'news-3-title': '亞洲供應鏈轉型新機遇',
        'news-3-excerpt': '分析亞洲地區供應鏈重組帶來的商機與挑戰...',
        'news-read-more': '閱讀更多',
        'btn-all-news': '查看所有消息',
        
        'cta-title': '準備開始合作？',
        'cta-subtitle': '聯絡我們，讓我們為您提供專業的國際貿易解決方案',
        'btn-contact-us': '立即聯絡我們',
        'cta-phone': '電話: +886-2-1234-5678',
        'cta-email': 'Email: info@bestasv.com',
        
        'footer-desc': '專業的進出口服務夥伴，連接全球商機，創造無限可能',
        'footer-quick-links': '快速連結',
        'footer-services': '服務項目',
        'footer-contact': '聯絡資訊',
        'footer-service-sourcing': '採購代理',
        'footer-service-trade': '進出口服務',
        'footer-service-matching': '供應商媒合',
        'footer-service-logistics': '物流協調',
        'footer-address': '地址:',
        'footer-address-value': '台灣台北市信義區信義路五段7號',
        'footer-phone': '電話:',
        'footer-email': 'Email:',
        'footer-hours': '營業時間:',
        'footer-hours-value': '週一至週五 9:00-18:00',
        'footer-rights': '版權所有.'
    },
    'en': {
        'brand-name': 'Bestasv International Trade',
        'nav-home': 'Home',
        'nav-about': 'About Us',
        'nav-services': 'Products & Services',
        'nav-process': 'Cooperation Process',
        'nav-news': 'Latest News',
        'nav-faq': 'FAQ',
        'nav-contact': 'Contact Us',
        
        'hero-title': 'Connecting Global Opportunities<br>Creating Infinite Possibilities',
        'hero-subtitle': 'Bestasv International Trade Co., Ltd. - Your professional import/export service partner, providing comprehensive international trade solutions including sourcing, supplier matching, and order coordination',
        'btn-contact': 'Contact Now',
        'btn-services': 'Learn More',
        
        'services-title': 'Core Services',
        'services-subtitle': 'Providing professional, efficient, and reliable international trade services',
        'service-sourcing-title': 'Sourcing Agent',
        'service-sourcing-desc': 'Professional sourcing team to find the best suppliers and products for you',
        'service-trade-title': 'Import/Export Services',
        'service-trade-desc': 'Complete import/export process management ensuring smooth customs clearance',
        'service-matching-title': 'Supplier Matching',
        'service-matching-desc': 'Precise supplier-demand matching to establish long-term partnerships',
        'service-logistics-title': 'Logistics Coordination',
        'service-logistics-desc': 'End-to-end logistics tracking and coordination from quotation to delivery',
        
        'advantages-title': 'Why Choose Bestasv',
        'advantages-subtitle': 'Professional, reliable, and efficient international trade partner',
        'advantage-exp-title': 'Years Experience',
        'advantage-exp-desc': 'Deep expertise in international trade with extensive practical experience',
        'advantage-suppliers-title': 'Partner Suppliers',
        'advantage-suppliers-desc': 'Global network of high-quality suppliers',
        'advantage-satisfaction-title': 'Customer Satisfaction',
        'advantage-satisfaction-desc': 'Earning customer trust with professional service',
        'advantage-support-title': 'Customer Support',
        'advantage-support-desc': '24/7 customer service with instant response',
        
        'categories-title': 'Industry Categories',
        'categories-subtitle': 'Diversified product lines to meet various procurement needs',
        'category-industrial-title': 'Industrial Hardware',
        'category-industrial-desc': 'Various industrial hardware parts, tools, and accessories',
        'category-machinery-title': 'Machinery Parts',
        'category-machinery-desc': 'Precision machinery parts, bearings, gears, etc.',
        'category-construction-title': 'Building Materials',
        'category-construction-desc': 'Construction materials, engineering accessories, decorative supplies',
        'category-custom-title': 'Custom Procurement',
        'category-custom-desc': 'Customized products based on customer requirements',
        'category-link': 'Learn More',
        
        'process-preview-title': 'Cooperation Process',
        'process-preview-subtitle': 'Simplified process, efficient cooperation',
        'step-1-title': 'Requirement Confirmation',
        'step-1-desc': 'Deep understanding of customer needs and specification requirements',
        'step-2-title': 'Supplier Development',
        'step-2-desc': 'Find and screen the most suitable suppliers',
        'step-3-title': 'Quotation & Samples',
        'step-3-desc': 'Provide detailed quotations and product samples',
        'step-4-title': 'Order & Delivery',
        'step-4-desc': 'Process orders and arrange delivery tracking',
        'btn-process-detail': 'View Detailed Process',
        
        'news-preview-title': 'Latest News',
        'news-preview-subtitle': 'Stay updated with industry trends and market insights',
        'news-category-company': 'Company News',
        'news-category-industry': 'Industry Info',
        'news-category-market': 'Market Trends',
        'news-1-title': 'Bestasv International Trade Officially Established',
        'news-1-excerpt': 'We are pleased to announce the official establishment of Bestasv International Trade Co., Ltd., dedicated to providing professional import/export services...',
        'news-2-title': '2024 Global Trade Trends Analysis',
        'news-2-excerpt': 'Exploring the changes in the current global trade environment and future development opportunities...',
        'news-3-title': 'New Opportunities in Asian Supply Chain Transformation',
        'news-3-excerpt': 'Analyzing the business opportunities and challenges brought by Asian supply chain restructuring...',
        'news-read-more': 'Read More',
        'btn-all-news': 'View All News',
        
        'cta-title': 'Ready to Start Cooperation?',
        'cta-subtitle': 'Contact us and let us provide professional international trade solutions for you',
        'btn-contact-us': 'Contact Us Now',
        'cta-phone': 'Phone: +886-2-1234-5678',
        'cta-email': 'Email: info@bestasv.com',
        
        'footer-desc': 'Professional import/export service partner, connecting global opportunities, creating infinite possibilities',
        'footer-quick-links': 'Quick Links',
        'footer-services': 'Services',
        'footer-contact': 'Contact Info',
        'footer-service-sourcing': 'Sourcing Agent',
        'footer-service-trade': 'Import/Export',
        'footer-service-matching': 'Supplier Matching',
        'footer-service-logistics': 'Logistics Coordination',
        'footer-address': 'Address:',
        'footer-address-value': 'No. 7, Section 5, Xinyi Road, Xinyi District, Taipei, Taiwan',
        'footer-phone': 'Phone:',
        'footer-email': 'Email:',
        'footer-hours': 'Business Hours:',
        'footer-hours-value': 'Monday to Friday 9:00-18:00',
        'footer-rights': 'All rights reserved.'
    },
    'ja': {
        'brand-name': 'ベスタ国際貿易',
        'nav-home': 'ホーム',
        'nav-about': '会社について',
        'nav-services': '製品・サービス',
        'nav-process': '協力プロセス',
        'nav-news': '最新ニュース',
        'nav-faq': 'よくある質問',
        'nav-contact': 'お問い合わせ',
        
        'hero-title': 'グローバル機会を繋ぐ<br>無限の可能性を創造',
        'hero-subtitle': 'ベスタ国際貿易有限公司 - あなたの専門的な輸出入サービスパートナー、調達代理店、サプライヤーマッチング、注文調整など包括的な国際貿易ソリューションを提供',
        'btn-contact': '今すぐ連絡',
        'btn-services': '詳細を見る',
        
        'services-title': 'コアサービス',
        'services-subtitle': '専門的、効率的、信頼性の高い国際貿易サービスを提供',
        'service-sourcing-title': '調達代理店',
        'service-sourcing-desc': '最高のサプライヤーと製品を見つける専門調達チーム',
        'service-trade-title': '輸出入サービス',
        'service-trade-desc': '円滑な通関を確保する完全な輸出入プロセス管理',
        'service-matching-title': 'サプライヤーマッチング',
        'service-matching-desc': '長期的なパートナーシップを確立する精密なサプライヤー需要マッチング',
        'service-logistics-title': '物流調整',
        'service-logistics-desc': '見積もりから配送までの完全な物流追跡と調整',
        
        'advantages-title': 'なぜベスタを選ぶのか',
        'advantages-subtitle': '専門的、信頼性、効率的な国際貿易パートナー',
        'advantage-exp-title': '年の経験',
        'advantage-exp-desc': '国際貿易分野での深い専門知識と豊富な実務経験',
        'advantage-suppliers-title': '協力サプライヤー',
        'advantage-suppliers-desc': '世界中に広がる高品質なサプライヤーネットワーク',
        'advantage-satisfaction-title': '顧客満足度',
        'advantage-satisfaction-desc': '専門的なサービスで顧客の信頼を獲得',
        'advantage-support-title': '顧客サポート',
        'advantage-support-desc': '24時間365日の顧客サービス、即時対応',
        
        'categories-title': '産業分類',
        'categories-subtitle': '多様な製品ライン、様々な採購ニーズに対応',
        'category-industrial-title': '工業金物',
        'category-industrial-desc': '各種工業用金物部品、工具及びアクセサリー',
        'category-machinery-title': '機械部品',
        'category-machinery-desc': '精密機械部品、ベアリング、歯車など',
        'category-construction-title': '建材・エンジニアリング',
        'category-construction-desc': '建築材料、エンジニアリングアクセサリー、内装用品',
        'category-custom-title': 'カスタム採購品',
        'category-custom-desc': '顧客の要件に基づいたカスタマイズ製品',
        'category-link': '詳細を見る',
        
        'process-preview-title': '協力プロセス',
        'process-preview-subtitle': '簡素化されたプロセス、効率的な協力',
        'step-1-title': '要件確認',
        'step-1-desc': '顧客のニーズと仕様要件の深い理解',
        'step-2-title': 'サプライヤー開発',
        'step-2-desc': '最適なサプライヤーの探索と選定',
        'step-3-title': '見積もりとサンプル',
        'step-3-desc': '詳細な見積もりと製品サンプルの提供',
        'step-4-title': '注文と配送',
        'step-4-desc': '注文処理と配送追跡の手配',
        'btn-process-detail': '詳細プロセスを見る',
        
        'news-preview-title': '最新ニュース',
        'news-preview-subtitle': '業界動向を把握し、市場トレンドを理解',
        'news-category-company': '会社ニュース',
        'news-category-industry': '業界情報',
        'news-category-market': '市場トレンド',
        'news-1-title': 'ベスタ国際貿易が正式に設立',
        'news-1-excerpt': 'ベスタ国際貿易有限公司の正式設立を発表できることを嬉しく思います。専門的な輸出入サービスの提供に専念...',
        'news-2-title': '2024年世界貿易トレンド分析',
        'news-2-excerpt': '現在の世界貿易環境の変化と将来の発展機会の探討...',
        'news-3-title': 'アジアサプライチェーン変革の新機会',
        'news-3-excerpt': 'アジア地域のサプライチェーン再編がもたらすビジネスチャンスと課題の分析...',
        'news-read-more': '続きを読む',
        'btn-all-news': 'すべてのニュースを見る',
        
        'cta-title': '協力を始める準備はできましたか？',
        'cta-subtitle': '私たちに連絡して、専門的な国際貿易ソリューションを提供させてください',
        'btn-contact-us': '今すぐお問い合わせ',
        'cta-phone': '電話: +886-2-1234-5678',
        'cta-email': 'Email: info@bestasv.com',
        
        'footer-desc': '専門的な輸出入サービスパートナー、グローバル機会を繋ぎ、無限の可能性を創造',
        'footer-quick-links': 'クイックリンク',
        'footer-services': 'サービス項目',
        'footer-contact': '連絡先',
        'footer-service-sourcing': '調達代理店',
        'footer-service-trade': '輸出入サービス',
        'footer-service-matching': 'サプライヤーマッチング',
        'footer-service-logistics': '物流調整',
        'footer-address': '住所:',
        'footer-address-value': '台湾台北市信義区信義路五段7号',
        'footer-phone': '電話:',
        'footer-email': 'Email:',
        'footer-hours': '営業時間:',
        'footer-hours-value': '月曜日から金曜日 9:00-18:00',
        'footer-rights': '全著作権所有.'
    },
    'vi': {
        'brand-name': 'Bestasv Thương mại Quốc tế',
        'nav-home': 'Trang chủ',
        'nav-about': 'Về chúng tôi',
        'nav-services': 'Sản phẩm & Dịch vụ',
        'nav-process': 'Quy trình hợp tác',
        'nav-news': 'Tin tức mới nhất',
        'nav-faq': 'Câu hỏi thường gặp',
        'nav-contact': 'Liên hệ chúng tôi',
        
        'hero-title': 'Kết nối cơ hội toàn cầu<br>Tạo ra khả năng vô hạn',
        'hero-subtitle': 'Công ty TNHH Thương mại Quốc tế Bestasv - Đối tác dịch vụ xuất nhập khẩu chuyên nghiệp của bạn, cung cấp các giải pháp thương mại quốc tế toàn diện như đại lý mua hàng, kết nối nhà cung cấp, điều phối đơn hàng',
        'btn-contact': 'Liên hệ ngay',
        'btn-services': 'Tìm hiểu dịch vụ',
        
        'services-title': 'Dịch vụ cốt lõi',
        'services-subtitle': 'Cung cấp dịch vụ thương mại quốc tế chuyên nghiệp, hiệu quả và đáng tin cậy',
        'service-sourcing-title': 'Đại lý mua hàng',
        'service-sourcing-desc': 'Đội ngũ mua hàng chuyên nghiệp tìm kiếm nhà cung cấp và sản phẩm chất lượng nhất cho bạn',
        'service-trade-title': 'Dịch vụ xuất nhập khẩu',
        'service-trade-desc': 'Quản lý quy trình xuất nhập khẩu hoàn chỉnh, đảm bảo hàng hóa thông quan suôn sẻ',
        'service-matching-title': 'Kết nối nhà cung cấp',
        'service-matching-desc': 'Kết nối chính xác nhu cầu nhà cung cấp, xây dựng mối quan hệ hợp tác lâu dài',
        'service-logistics-title': 'Điều phối logistics',
        'service-logistics-desc': 'Theo dõi và điều phối logistics toàn diện từ báo giá đến giao hàng',
        
        'advantages-title': 'Tại sao chọn Bestasv',
        'advantages-subtitle': 'Đối tác thương mại quốc tế chuyên nghiệp, đáng tin cậy và hiệu quả',
        'advantage-exp-title': 'Năm kinh nghiệm',
        'advantage-exp-desc': 'Sâu sắc trong lĩnh vực thương mại quốc tế, tích lũy kinh nghiệm thực tiễn phong phú',
        'advantage-suppliers-title': 'Nhà cung cấp đối tác',
        'advantage-suppliers-desc': 'Mạng lưới nhà cung cấp chất lượng cao trên toàn cầu',
        'advantage-satisfaction-title': 'Sự hài lòng của khách hàng',
        'advantage-satisfaction-desc': 'Chiến thắng sự tin cậy của khách hàng bằng dịch vụ chuyên nghiệp',
        'advantage-support-title': 'Hỗ trợ khách hàng',
        'advantage-support-desc': 'Dịch vụ khách hàng 24/7, phản hồi tức thời nhu cầu',
        
        'categories-title': 'Phân loại ngành',
        'categories-subtitle': 'Danh mục sản phẩm đa dạng, đáp ứng mọi nhu cầu mua hàng',
        'category-industrial-title': 'Phụ kiện công nghiệp',
        'category-industrial-desc': 'Các loại phụ kiện, dụng cụ và thiết bị công nghiệp',
        'category-machinery-title': 'Linh kiện máy móc',
        'category-machinery-desc': 'Linh kiện máy móc chính xác, vòng bi, bánh răng, v.v.',
        'category-construction-title': 'Vật liệu xây dựng',
        'category-construction-desc': 'Vật liệu xây dựng, phụ kiện kỹ thuật, đồ trang trí',
        'category-custom-title': 'Sản phẩm đặt hàng',
        'category-custom-desc': 'Sản phẩm tùy chỉnh theo yêu cầu khách hàng',
        'category-link': 'Tìm hiểu thêm',
        
        'process-preview-title': 'Quy trình hợp tác',
        'process-preview-subtitle': 'Quy trình đơn giản, hợp tác hiệu quả',
        'step-1-title': 'Xác nhận nhu cầu',
        'step-1-desc': 'Hiểu sâu nhu cầu và yêu cầu kỹ thuật của khách hàng',
        'step-2-title': 'Phát triển nhà cung cấp',
        'step-2-desc': 'Tìm kiếm và sàng lọc nhà cung cấp phù hợp nhất',
        'step-3-title': 'Báo giá và mẫu',
        'step-3-desc': 'Cung cấp báo giá chi tiết và sản phẩm mẫu',
        'step-4-title': 'Đặt hàng và giao hàng',
        'step-4-desc': 'Xử lý đơn hàng và sắp xếp theo dõi giao hàng',
        'btn-process-detail': 'Xem quy trình chi tiết',
        
        'news-preview-title': 'Tin tức mới nhất',
        'news-preview-subtitle': 'Nắm bắt xu hướng ngành, hiểu rõ thị trường',
        'news-category-company': 'Tin công ty',
        'news-category-industry': 'Thông tin ngành',
        'news-category-market': 'Xu hướng thị trường',
        'news-1-title': 'Bestasv Thương mại Quốc tế chính thức thành lập',
        'news-1-excerpt': 'Chúng tôi rất vui mừng thông báo Công ty TNHH Thương mại Quốc tế Bestasv chính thức thành lập, chuyên cung cấp dịch vụ xuất nhập khẩu chuyên nghiệp...',
        'news-2-title': 'Phân tích xu hướng thương mại toàn cầu 2024',
        'news-2-excerpt': 'Khám phá những thay đổi trong môi trường thương mại toàn cầu hiện tại và cơ hội phát triển trong tương lai...',
        'news-3-title': 'Cơ hội mới trong chuyển đổi chuỗi cung ứng châu Á',
        'news-3-excerpt': 'Phân tích cơ hội kinh doanh và thách thức từ việc tái cấu trúc chuỗi cung ứng khu vực châu Á...',
        'news-read-more': 'Đọc thêm',
        'btn-all-news': 'Xem tất cả tin tức',
        
        'cta-title': 'Sẵn sàng bắt đầu hợp tác?',
        'cta-subtitle': 'Liên hệ chúng tôi, để chúng tôi cung cấp giải pháp thương mại quốc tế chuyên nghiệp cho bạn',
        'btn-contact-us': 'Liên hệ chúng tôi ngay',
        'cta-phone': 'Điện thoại: +886-2-1234-5678',
        'cta-email': 'Email: info@bestasv.com',
        
        'footer-desc': 'Đối tác dịch vụ xuất nhập khẩu chuyên nghiệp, kết nối cơ hội toàn cầu, tạo ra khả năng vô hạn',
        'footer-quick-links': 'Liên kết nhanh',
        'footer-services': 'Dịch vụ',
        'footer-contact': 'Thông tin liên hệ',
        'footer-service-sourcing': 'Đại lý mua hàng',
        'footer-service-trade': 'Dịch vụ xuất nhập khẩu',
        'footer-service-matching': 'Kết nối nhà cung cấp',
        'footer-service-logistics': 'Điều phối logistics',
        'footer-address': 'Địa chỉ:',
        'footer-address-value': 'Số 7, Đường 5, Tín Nghĩa, Quận Tín Nghĩa, Đài Bắc, Đài Loan',
        'footer-phone': 'Điện thoại:',
        'footer-email': 'Email:',
        'footer-hours': 'Giờ làm việc:',
        'footer-hours-value': 'Thứ Hai đến Thứ Sáu 9:00-18:00',
        'footer-rights': 'Bản quyền mọi.'
    }
};

// Language Manager Class - Stable Implementation
class LanguageManager {
    constructor() {
        this.currentLang = this.getStoredLanguage() || 'zh-TW';
        this.translations = translations;
        this.init();
    }

    init() {
        this.setLanguage(this.currentLang);
        this.bindEvents();
    }

    getStoredLanguage() {
        try {
            return localStorage.getItem('bestasv-language');
        } catch (e) {
            return null;
        }
    }

    setStoredLanguage(lang) {
        try {
            localStorage.setItem('bestasv-language', lang);
        } catch (e) {
            console.warn('Could not store language preference');
        }
    }

    setLanguage(lang) {
        // Validate language exists
        if (!this.translations[lang]) {
            console.warn(`Language ${lang} not supported, falling back to zh-TW`);
            lang = 'zh-TW';
        }

        this.currentLang = lang;
        this.setStoredLanguage(lang);
        this.updateLanguageSelector();
        this.translatePage();
        this.updateHTMLLangAttribute();
    }

    updateHTMLLangAttribute() {
        if (document.documentElement) {
            document.documentElement.lang = this.currentLang;
        }
    }

    updateLanguageSelector() {
        const selector = document.getElementById('language-select');
        if (selector) {
            selector.value = this.currentLang;
        }
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
    }

    getTranslation(key) {
        if (!this.translations[this.currentLang]) {
            return null;
        }
        
        const keys = key.split('.');
        let translation = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }

    bindEvents() {
        const selector = document.getElementById('language-select');
        if (selector) {
            selector.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }

    addTranslation(key, translations) {
        for (const [lang, text] of Object.entries(translations)) {
            if (!this.translations[lang]) {
                this.translations[lang] = {};
            }
            this.translations[lang][key] = text;
        }
    }

    getCurrentLanguage() {
        return this.currentLang;
    }

    getAvailableLanguages() {
        return Object.keys(this.translations);
    }

    // Method to add new language easily
    addLanguage(langCode, translations) {
        this.translations[langCode] = translations;
        
        // Update language selector if it exists
        const selector = document.getElementById('language-select');
        if (selector) {
            const option = document.createElement('option');
            option.value = langCode;
            option.textContent = this.getLanguageDisplayName(langCode);
            selector.appendChild(option);
        }
    }

    getLanguageDisplayName(langCode) {
        const displayNames = {
            'zh-TW': '中文',
            'en': 'English',
            'ja': '日本語',
            'vi': 'Tiếng Việt'
        };
        return displayNames[langCode] || langCode;
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LanguageManager, translations };
}

// Global access for debugging
window.BestasvTranslations = translations;
