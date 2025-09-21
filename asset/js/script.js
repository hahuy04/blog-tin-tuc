// Biến toàn cục
let currentPage = 1;
const articlesPerPage = 6;
let allArticles = [];
let filteredArticles = [];

// Dữ liệu tin tức mẫu
const newsData = [
    {
        id: 1,
        title: "GDP Việt Nam tăng trưởng mạnh 7.8% trong quý III",
        summary: "Nền kinh tế Việt Nam đang có những dấu hiệu phục hồi tích cực với mức tăng trưởng vượt kỳ vọng.",
        category: "Kinh tế",
        image: "../asset/img/pexels-photo-518543.webp",
        date: "15/01/2025",
        author: "Nguyễn Văn An",
        views: 1250,
        featured: true,
        detailUrl: "detail.html"
    },
    {
        id: 2,
        title: "Cuộc cách mạng trí tuệ nhân tạo tại Việt Nam",
        summary: "Các doanh nghiệp Việt Nam đang tích cực ứng dụng AI vào hoạt động sản xuất kinh doanh.",
        category: "Công nghệ",
        image: "../asset/img/pexels-photo-2115257.jpeg",
        date: "14/01/2025",
        author: "Trần Thị Lan",
        views: 980,
        featured: true,
        detailUrl: "detail.html"
    },
    {
        id: 3,
        title: "Đội tuyển Việt Nam chuẩn bị cho vòng loại World Cup",
        summary: "HLV Park Hang-seo công bố danh sách cầu thủ cho các trận đấu quan trọng sắp tới.",
        category: "Thể thao",
        image: "../asset/img/pexels-photo-69432.webp",
        date: "13/01/2025",
        author: "Lê Minh Tú",
        views: 2150,
        featured: true,
        detailUrl: "detail.html"
    },
    {
        id: 4,
        title: "Giá vàng tăng mạnh, đạt đỉnh 5 năm",
        summary: "Thị trường vàng trong nước tiếp tục có những biến động mạnh trong tuần qua.",
        category: "Kinh tế",
        image: "../asset/img/pexels-photo-844124.webp",
        date: "12/01/2025",
        author: "Phạm Văn Bình",
        views: 1680,
        featured: false,
        detailUrl: "detail.html"
    },
    {
        id: 5,
        title: "Khám phá công nghệ 5G tại các thành phố lớn",
        summary: "Mạng 5G đang được triển khai rộng rãi tại Hà Nội, TP.HCM và các thành phố lớn.",
        category: "Công nghệ",
        image: "../asset/img/play-stone-network-networked-interactive-163064.webp",
        date: "11/01/2025",
        author: "Nguyễn Thu Hà",
        views: 750,
        featured: false,
        detailUrl: "detail.html"
    },
    {
        id: 6,
        title: "Xu hướng du lịch sinh thái đang lên ngôi",
        summary: "Du lịch sinh thái trở thành lựa chọn hàng đầu của du khách trong và ngoài nước.",
        category: "Du lịch",
        image: "../asset/img/play-stone-network-networked-interactive-163064.webp",
        date: "10/01/2025",
        author: "Vũ Thị Mai",
        views: 920,
        featured: false,
        detailUrl: "detail.html"
    },
    {
        id: 7,
        title: "Chính sách hỗ trợ doanh nghiệp nhỏ và vừa",
        summary: "Chính phủ ra mắt gói hỗ trợ 50.000 tỷ đồng cho các doanh nghiệp SME.",
        category: "Kinh tế",
        image: "../asset/img/pexels-photo-3184291.jpeg",
        date: "09/01/2025",
        author: "Hoàng Văn Đức",
        views: 1420,
        featured: false,
        detailUrl: "detail.html"
    },
    {
        id: 8,
        title: "Breakthrough trong nghiên cứu y học tại Việt Nam",
        summary: "Các nhà khoa học Việt Nam có những phát hiện đáng chú ý trong điều trị ung thư.",
        category: "Sức khỏe",
        image: "../asset/img/pexels-photo-356040.webp",
        date: "08/01/2025",
        author: "TS. Lê Thị Hoa",
        views: 2300,
        featured: false,
        detailUrl: "detail.html"
    },
    {
        id: 9,
        title: "Sơn Đoòng được vinh danh là hang động đẹp nhất thế giới",
        summary: "Tạp chí du lịch Anh quốc Wanderlust vừa công bố danh sách các hang động kỳ vĩ nhất, trong đó Sơn Đoòng của Việt Nam chiếm vị trí đầu tiên.",
        category: "Du lịch",
        image: "../asset/img/son-doong.jpg",
        date: "16/01/2025",
        author: "Trần Hùng",
        views: 1850,
        featured: true,
        detailUrl: "detail-sondoong.html"
    },
];

// Nội dung DOM đã được tải
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Khởi tạo ứng dụng
function initializeApp() {
    showPageLoader();

    // Khởi tạo dữ liệu
    allArticles = [...newsData];
    filteredArticles = [...allArticles];

    // Tải nội dung cụ thể của trang
    if (document.getElementById('newsContainer')) {
        loadNewsArticles();
        loadPopularNews();
        setupNewsletterForm();
    }

    if (document.getElementById('contactForm')) {
        setupContactForm();
        setupMessageCounter();
    }

    if (document.getElementById('relatedArticles')) {
        loadRelatedArticles();
        loadMostReadArticles();
        setupReadingProgress();
    }

    // Khởi tạo các tính năng chung
    setupProgressBar();
    setupSearch();

    // Ẩn trình tải sau khi nội dung được tải
    setTimeout(hidePageLoader, 1000);
}

// Chức năng tải trang
function showPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.display = 'flex';
    }
}

function hidePageLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
}

// Thiết lập thanh tiến trình
function setupProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Tải bài viết tin tức
function loadNewsArticles() {
    const container = document.getElementById('newsContainer');
    if (!container) return;

    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"></div></div>';

    setTimeout(() => {
        displayArticles();
        setupPagination();
    }, 500);
}

// Hiển thị bài viết
function displayArticles() {
    const container = document.getElementById('newsContainer');
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);

    container.innerHTML = '';

    articlesToShow.forEach((article, index) => {
        const articleHtml = `
            <div class="col-md-6 col-lg-4 mb-4 fade-in-up" style="animation-delay: ${index * 0.1}s">
                <div class="card news-card h-100 shadow-sm">
                    <div class="position-relative overflow-hidden">
                        <img src="${article.image}" class="card-img-top" alt="${article.title}">
                        <div class="position-absolute top-0 start-0 m-2">
                            <span class="badge bg-primary">${article.category}</span>
                        </div>
                        ${article.featured ? '<div class="position-absolute top-0 end-0 m-2"><span class="badge bg-danger">HOT</span></div>' : ''}
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text text-muted flex-grow-1">${article.summary}</p>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <small class="text-muted">
                                    <i class="fas fa-calendar me-1"></i>${article.date}
                                </small>
                                <small class="text-muted">
                                    <i class="fas fa-eye me-1"></i>${article.views.toLocaleString()} lượt xem
                                </small>
                            </div>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-outline-primary btn-sm" onclick="openNewsModal('${article.id}')">
                                    <i class="fas fa-eye me-1"></i>Xem nhanh
                                </button>
                                <a href="${article.detailUrl}" class="btn btn-primary btn-sm">
                                    <i class="fas fa-arrow-right me-1"></i>Đọc thêm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += articleHtml;
    });
}

// Thiết lập phân trang
function setupPagination() {
    const paginationContainer = document.getElementById('newsPagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    let paginationHtml = '';

    // Nút trước
    if (currentPage > 1) {
        paginationHtml += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">
                    <i class="fas fa-chevron-left"></i>
                </a>
            </li>
        `;
    }

    // Số trang
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        paginationHtml += `
            <li class="page-item">
                <a class="page-link" onclick="changePage(1)">1</a>
            </li>
        `;
        if (startPage > 2) {
            paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHtml += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link"  onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        paginationHtml += `
            <li class="page-item">
                <a class="page-link" onclick="changePage(${totalPages})">${totalPages}</a>
            </li>
        `;
    }

    // Nút tiếp theo
    if (currentPage < totalPages) {
        paginationHtml += `
            <li class="page-item">
                <a class="page-link" onclick="changePage(${currentPage + 1})">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </li>
        `;
    }

    paginationContainer.innerHTML = paginationHtml;
}

// Thay đổi trang
function changePage(page) {
    currentPage = page;
    displayArticles();
    setupPagination();

    // Cuộn mượt mà đến vùng chứa tin tức
    document.getElementById('newsContainer').scrollIntoView({ behavior: 'smooth' });
}

// Tải tin tức phổ biến
function loadPopularNews() {
    const container = document.getElementById('popularNews');
    if (!container) return;

    const popularArticles = allArticles
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

    let popularHtml = '';
    popularArticles.forEach((article, index) => {
        popularHtml += `
            <div class="popular-item">
                <div class="d-flex">
                    <div class="me-3">
                        <span class="badge bg-primary rounded-pill">${index + 1}</span>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-1">
                            <a href="detail.html" class="text-decoration-none text-dark">${article.title}</a>
                        </h6>
                        <small class="text-muted">
                            <i class="fas fa-eye me-1"></i>${article.views.toLocaleString()} lượt xem
                        </small>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = popularHtml;
}
function changePage(page, event) {
    if (event) event.preventDefault(); // chặn reload mặc định
    currentPage = page;
    displayArticles();
    setupPagination();

    document.getElementById('newsContainer').scrollIntoView({ behavior: 'smooth' });
}

// Open News Modal
function openNewsModal(newsId) {
    const article = allArticles.find(a => a.id == newsId);
    if (!article) return;

    const modal = document.getElementById('newsModal');
    const title = document.getElementById('newsModalTitle');
    const body = document.getElementById('newsModalBody');

    title.textContent = article.title;

    body.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${article.image}" class="img-fluid rounded" alt="${article.title}">
                <div class="mt-2">
                    <span class="badge bg-primary me-1">${article.category}</span>
                    <small class="text-muted">${article.date}</small>
                </div>
            </div>
            <div class="col-md-8">
                <p class="lead">${article.summary}</p>
                <p>Nội dung chi tiết của bài viết sẽ được hiển thị ở đây. Đây là phần tóm tắt nhanh để người đọc có thể nắm bắt được thông tin cơ bản trước khi quyết định đọc toàn bộ bài viết.</p>
                <div class="d-flex justify-content-between text-muted">
                    <small><i class="fas fa-user me-1"></i>Tác giả: ${article.author}</small>
                    <small><i class="fas fa-eye me-1"></i>${article.views.toLocaleString()} lượt xem</small>
                </div>
            </div>
        </div>
    `;

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

// Sort News
function sortNews(sortType) {
    switch (sortType) {
        case 'newest':
            filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'popular':
            filteredArticles.sort((a, b) => b.views - a.views);
            break;
        case 'trending':
            filteredArticles.sort((a, b) => b.featured - a.featured);
            break;
    }

    currentPage = 1;
    displayArticles();
    setupPagination();
}

// Setup Search
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce(performSearch, 300));
}

// Perform Search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();

    if (query === '') {
        filteredArticles = [...allArticles];
    } else {
        filteredArticles = allArticles.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.summary.toLowerCase().includes(query) ||
            article.category.toLowerCase().includes(query)
        );
    }

    currentPage = 1;
    displayArticles();
    setupPagination();
}

// Setup Newsletter Form
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;

        // Show loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="spinner-border spinner-border-sm me-1"></i>Đang xử lý...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('Cảm ơn bạn đã đăng ký nhận tin! Chúng tôi sẽ gửi những tin tức mới nhất đến email của bạn.');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Setup Contact Form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            e.stopPropagation();
            this.classList.add('was-validated');
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        const spinner = document.getElementById('submitSpinner');

        // Show loading state
        submitBtn.disabled = true;
        spinner.style.display = 'inline-block';
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang gửi...';

        // Simulate form submission
        setTimeout(() => {
            // Show success modal
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            // Reset form
            this.reset();
            this.classList.remove('was-validated');

            // Reset button
            submitBtn.disabled = false;
            spinner.style.display = 'none';
            submitBtn.innerHTML = '<i class="fas fa-paper-plane me-1"></i>Gửi tin nhắn';
        }, 2000);
    });
}

// Setup Message Counter
function setupMessageCounter() {
    const messageTextarea = document.getElementById('message');
    const messageCount = document.getElementById('messageCount');

    if (!messageTextarea || !messageCount) return;

    messageTextarea.addEventListener('input', function () {
        const currentLength = this.value.length;
        messageCount.textContent = currentLength;

        if (currentLength > 450) {
            messageCount.style.color = '#dc3545';
        } else if (currentLength > 400) {
            messageCount.style.color = '#ffc107';
        } else {
            messageCount.style.color = '#6c757d';
        }
    });
}

// Setup Reading Progress
function setupReadingProgress() {
    const progressBar = document.getElementById('readingProgressBar');
    const progressPercent = document.getElementById('readingPercent');

    if (!progressBar || !progressPercent) return;

    window.addEventListener('scroll', () => {
        const article = document.querySelector('.article-content');
        if (!article) return;

        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        const articleStart = articleTop - windowHeight / 2;
        const articleEnd = articleTop + articleHeight - windowHeight / 2;

        if (scrollTop >= articleStart && scrollTop <= articleEnd) {
            const progress = ((scrollTop - articleStart) / (articleEnd - articleStart)) * 100;
            const clampedProgress = Math.min(Math.max(progress, 0), 100);

            progressBar.style.width = clampedProgress + '%';
            progressPercent.textContent = Math.round(clampedProgress) + '%';
        }
    });
}

// Load Related Articles
function loadRelatedArticles() {
    const container = document.getElementById('relatedArticles');
    if (!container) return;

    const relatedArticles = allArticles.slice(0, 3);

    let relatedHtml = '';
    relatedArticles.forEach(article => {
        relatedHtml += `
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <img src="${article.image}" class="card-img-top" style="height: 150px; object-fit: cover;" alt="${article.title}">
                    <div class="card-body">
                        <h6 class="card-title">
                            <a href="detail.html" class="text-decoration-none">${article.title}</a>
                        </h6>
                        <small class="text-muted">${article.date}</small>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = relatedHtml;
}

// Load Most Read Articles
function loadMostReadArticles() {
    const container = document.getElementById('mostReadArticles');
    if (!container) return;

    const mostReadArticles = allArticles
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

    let mostReadHtml = '';
    mostReadArticles.forEach((article, index) => {
        mostReadHtml += `
            <div class="read-item">
                <div class="read-number">${index + 1}</div>
                <div class="flex-grow-1">
                    <h6 class="mb-1">
                        <a href="detail.html" class="text-decoration-none text-dark">${article.title}</a>
                    </h6>
                    <small class="text-muted">${article.views.toLocaleString()} lượt xem</small>
                </div>
            </div>
        `;
    });

    container.innerHTML = mostReadHtml;
}

// Social Share Functions
function shareArticle(platform) {
    const url = window.location.href;
    const title = document.querySelector('.article-title')?.textContent || 'VietNews';

    let shareUrl = '';

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Đã sao chép link bài viết!');
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// File Upload Progress (for contact form)
document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('attachment');
    if (fileInput) {
        fileInput.addEventListener('change', function () {
            if (this.files.length > 0) {
                simulateFileUpload();
            }
        });
    }
});

function simulateFileUpload() {
    const progressContainer = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('uploadProgressBar');

    if (!progressContainer || !progressBar) return;

    progressContainer.style.display = 'block';

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                progressContainer.style.display = 'none';
                progressBar.style.width = '0%';
            }, 1000);
        }
        progressBar.style.width = progress + '%';
    }, 200);
}