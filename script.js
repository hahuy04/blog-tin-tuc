class VietNewsBlog {
    constructor() {
        this.articles = [];
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.currentCategory = 'all';
        this.currentSort = 'newest';
        this.searchQuery = '';
        
        this.init();
    }

    init() {
        this.generateSampleData();
        this.bindEvents();
        this.initializeTheme();
        this.renderInitialContent();
        this.setupIntersectionObserver();
    }

    generateSampleData() {
        const categories = [
            { id: 'thoi-su', name: 'Thời sự', class: 'category-thoi-su' },
            { id: 'kinh-te', name: 'Kinh tế', class: 'category-kinh-te' },
            { id: 'the-thao', name: 'Thể thao', class: 'category-the-thao' },
            { id: 'cong-nghe', name: 'Công nghệ', class: 'category-cong-nghe' },
            { id: 'giai-tri', name: 'Giải trí', class: 'category-giai-tri' }
        ];

        const sampleTitles = [
            'Chính phủ công bố gói hỗ trợ kinh tế mới trị giá 120.000 tỷ đồng',
            'Công nghệ AI đang thay đổi cách chúng ta làm việc',
            'Đội tuyển Việt Nam chuẩn bị cho trận đấu quan trọng',
            'Thị trường chứng khoán Việt Nam tăng trưởng mạnh',
            'Lễ hội âm nhạc quốc tế sắp diễn ra tại Hà Nội',
            'Khởi nghiệp công nghệ: Xu hướng mới của giới trẻ',
            'Giáo dục số hóa - Tương lai của ngành giáo dục',
            'Du lịch Việt Nam hồi phục sau đại dịch',
            'Năng lượng tái tạo: Giải pháp cho tương lai xanh',
            'Văn hóa ẩm thực Việt Nam được UNESCO công nhận',
            'Blockchain và tiền điện tử: Cơ hội hay thách thức?',
            'Thể thao điện tử phát triển mạnh tại Việt Nam',
            'Startup Việt gọi vốn thành công 50 triệu USD',
            'Chuyển đổi số trong doanh nghiệp nhỏ và vừa',
            'Xu hướng làm việc từ xa sau đại dịch'
        ];

        const images = [
            'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800'
        ];

        const authors = ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Hoàng Cường', 'Phạm Thị Dung', 'Hoàng Văn Em'];

        for (let i = 0; i < 30; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const title = sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
            const image = images[Math.floor(Math.random() * images.length)];
            const author = authors[Math.floor(Math.random() * authors.length)];
            
            this.articles.push({
                id: i + 1,
                title: title,
                content: `Đây là nội dung chi tiết của bài viết "${title}". Bài viết cung cấp thông tin đầy đủ và chính xác về chủ đề này, được biên tập bởi đội ngũ phóng viên chuyên nghiệp.`,
                excerpt: `Tóm tắt ngắn gọn về "${title}". Thông tin quan trọng và cập nhật nhất về chủ đề này.`,
                image: image,
                category: category.id,
                categoryName: category.name,
                categoryClass: category.class,
                author: author,
                date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                views: Math.floor(Math.random() * 10000) + 100,
                likes: Math.floor(Math.random() * 500) + 10,
                readTime: Math.floor(Math.random() * 10) + 2,
                comments: []
            });
        }

        this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    bindEvents() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        searchBtn.addEventListener('click', () => this.handleSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        document.querySelectorAll('[data-category]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByCategory(e.target.dataset.category);
            });
        });

        document.querySelectorAll('[data-sort]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleSort(e.currentTarget.dataset.sort);
            });
        });

        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        document.getElementById('newsletterForm').addEventListener('submit', (e) => {
            this.handleNewsletter(e);
        });

        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.getElementById('paginationContainer').addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.closest('[data-page]');
            if (target) {
                const page = target.dataset.page;
                this.changePage(page);
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    renderInitialContent() {
        this.renderArticles();
        this.renderSidebar();
    }

    renderArticles() {
        const container = document.getElementById('articlesContainer');
        const filteredArticles = this.getFilteredArticles();

        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
        
        container.innerHTML = paginatedArticles.map(article => `
            <article class="article-card">
                <div class="article-image">
                    <img src="${article.image}" alt="${article.title}" loading="lazy">
                </div>
                <div class="card-body d-flex flex-column">
                    <div>
                        <a href="#" class="category-badge ${article.categoryClass}" onclick="event.preventDefault(); vietnewsBlog.filterByCategory('${article.category}')">${article.categoryName}</a>
                        <h3 class="card-title">
                            <a href="#" onclick="event.preventDefault(); vietnewsBlog.showArticle(${article.id})" class="text-decoration-none text-dark">${article.title}</a>
                        </h3>
                        <p class="card-text">${article.excerpt}</p>
                    </div>
                    <div class="article-meta mt-auto">
                        <div class="meta-left">
                            <span><i class="bi bi-person"></i> ${article.author}</span>
                            <span><i class="bi bi-calendar3"></i> ${this.formatDate(article.date)}</span>
                        </div>
                        <div class="meta-right">
                            <span class="badge bg-light text-dark-emphasis border">
                                <i class="bi bi-eye"></i> ${this.formatNumber(article.views)}
                            </span>
                            <button class="btn btn-sm btn-outline-primary" onclick="vietnewsBlog.likeArticle(${article.id})">
                                <i class="bi bi-heart"></i> ${article.likes}
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');

        this.renderPagination();
        this.triggerAnimations();
    }
    
    renderPagination() {
        const container = document.getElementById('paginationContainer');
        const filteredArticles = this.getFilteredArticles();
        const totalPages = Math.ceil(filteredArticles.length / this.articlesPerPage);

        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        let paginationHTML = '<ul class="pagination">';
        
        // Previous button
        paginationHTML += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage - 1}">Trước</a>
            </li>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        // Next button
        paginationHTML += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage + 1}">Sau</a>
            </li>
        `;

        paginationHTML += '</ul>';
        container.innerHTML = paginationHTML;
    }

    changePage(newPage) {
        const pageNumber = parseInt(newPage);
        const totalPages = Math.ceil(this.getFilteredArticles().length / this.articlesPerPage);

        if (pageNumber >= 1 && pageNumber <= totalPages) {
            this.currentPage = pageNumber;
            this.renderArticles();
            document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
        }
    }

    renderSidebar() {
        this.renderTrendingTopics();
        this.renderRecentPosts();
        this.renderCategories();
    }

    renderTrendingTopics() {
        const trending = [...this.articles]
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);
        
        const container = document.getElementById('trendingTopics');
        container.innerHTML = trending.map((article, index) => `
            <div class="trending-item">
                <div class="trending-number">${index + 1}</div>
                <div class="trending-title">
                    <a href="#" onclick="event.preventDefault(); vietnewsBlog.showArticle(${article.id})" class="text-decoration-none text-dark">
                        ${article.title.substring(0, 80)}${article.title.length > 80 ? '...' : ''}
                    </a>
                </div>
            </div>
        `).join('');
    }

    renderRecentPosts() {
        const recent = [...this.articles]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        const container = document.getElementById('recentPosts');
        container.innerHTML = recent.map(article => `
            <div class="recent-post">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <div class="recent-post-content">
                    <h6>
                        <a href="#" onclick="event.preventDefault(); vietnewsBlog.showArticle(${article.id})" class="text-decoration-none">
                            ${article.title.substring(0, 60)}${article.title.length > 60 ? '...' : ''}
                        </a>
                    </h6>
                    <small><i class="bi bi-calendar3"></i> ${this.formatDate(article.date)}</small>
                </div>
            </div>
        `).join('');
    }

    renderCategories() {
        const categories = [
            { id: 'all', name: 'Tất cả tin tức', count: this.articles.length },
            { id: 'thoi-su', name: 'Thời sự', count: this.articles.filter(a => a.category === 'thoi-su').length },
            { id: 'kinh-te', name: 'Kinh tế', count: this.articles.filter(a => a.category === 'kinh-te').length },
            { id: 'the-thao', name: 'Thể thao', count: this.articles.filter(a => a.category === 'the-thao').length },
            { id: 'cong-nghe', name: 'Công nghệ', count: this.articles.filter(a => a.category === 'cong-nghe').length },
            { id: 'giai-tri', name: 'Giải trí', count: this.articles.filter(a => a.category === 'giai-tri').length }
        ];

        const container = document.getElementById('categoriesList');
        container.innerHTML = categories.map(cat => `
            <a href="#" class="category-item" onclick="event.preventDefault(); vietnewsBlog.filterByCategory('${cat.id}')">
                <span>${cat.name}</span>
                <span class="category-count">${cat.count}</span>
            </a>
        `).join('');
    }

    getFilteredArticles() {
        let filtered = [...this.articles];

        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(article => article.category === this.currentCategory);
        }

        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(article => 
                article.title.toLowerCase().includes(query) ||
                article.content.toLowerCase().includes(query) ||
                article.author.toLowerCase().includes(query)
            );
        }

        if (this.currentSort === 'newest') {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (this.currentSort === 'popular') {
            filtered.sort((a, b) => b.views - a.views);
        }

        return filtered;
    }

    handleSearch() {
        const searchInput = document.getElementById('searchInput');
        this.searchQuery = searchInput.value.trim();
        this.currentPage = 1;
        this.renderArticles();
        
        if (this.searchQuery) {
            this.showToast(`Tìm thấy ${this.getFilteredArticles().length} kết quả cho "${this.searchQuery}"`, 'info');
        }
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1;
        this.renderArticles();
        
        document.querySelectorAll('[data-category]').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`[data-category="${category}"]`);
        if(activeLink) activeLink.classList.add('active');
        
        const categoryName = category === 'all' ? 'Tất cả tin tức' : 
            activeLink.textContent;
        this.showToast(`Đang hiển thị: ${categoryName}`, 'info');
    }

    handleSort(sortType) {
        this.currentSort = sortType;
        this.currentPage = 1;
        this.renderArticles();
        
        document.querySelectorAll('[data-sort]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-sort="${sortType}"]`).classList.add('active');
    }

    showArticle(id) {
        const article = this.articles.find(a => a.id === id);
        if (!article) return;

        article.views++;

        const modal = new bootstrap.Modal(document.getElementById('articleModal'));
        const modalContent = document.getElementById('modalContent');
        
        modalContent.innerHTML = `
            <article class="article-detail">
                <div class="article-header mb-4">
                    <span class="category-badge ${article.categoryClass} mb-3">${article.categoryName}</span>
                    <h1 class="article-title mb-3">${article.title}</h1>
                    <div class="article-meta-detail">
                        <div class="d-flex align-items-center flex-wrap gap-3 text-muted">
                            <span><i class="bi bi-person"></i> ${article.author}</span>
                            <span><i class="bi bi-calendar3"></i> ${this.formatDate(article.date)}</span>
                            <span><i class="bi bi-clock"></i> ${article.readTime} phút đọc</span>
                            <span class="badge bg-light text-dark-emphasis border p-2 fs-6">
                                <i class="bi bi-eye"></i> ${this.formatNumber(article.views)} lượt xem
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="article-image mb-4">
                    <img src="${article.image}" class="img-fluid rounded" alt="${article.title}">
                </div>
                
                <div class="article-content">
                    <p class="lead">${article.excerpt}</p>
                    <p>${article.content}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                
                <div class="article-actions mt-4 pt-4 border-top">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="article-engagement">
                            <button class="btn btn-outline-primary me-2" onclick="vietnewsBlog.likeArticle(${article.id})">
                                <i class="bi bi-heart"></i> Thích (${article.likes})
                            </button>
                            <button class="btn btn-outline-success me-2" onclick="vietnewsBlog.shareArticle(${article.id})">
                                <i class="bi bi-share"></i> Chia sẻ
                            </button>
                        </div>
                        <div class="article-tags">
                            <span class="badge bg-light text-dark me-1">#${article.categoryName}</span>
                            <span class="badge bg-light text-dark me-1">#TinTức</span>
                        </div>
                    </div>
                </div>
            </article>

            <section class="comments-section mt-5 pt-4 border-top">
                <h4 class="mb-4">Bình luận (${article.comments.length})</h4>
                <div id="commentsList" class="mb-4">
                    </div>
                <div class="add-comment">
                    <h5>Gửi bình luận của bạn</h5>
                    <form id="commentForm" class="needs-validation" novalidate>
                        <div class="mb-3">
                            <label for="commentName" class="form-label">Tên của bạn</label>
                            <input type="text" class="form-control" id="commentName" required>
                            <div class="invalid-feedback">
                                Vui lòng nhập tên của bạn.
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="commentText" class="form-label">Bình luận</label>
                            <textarea class="form-control" id="commentText" rows="3" required></textarea>
                            <div class="invalid-feedback">
                                Vui lòng nhập nội dung bình luận.
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Gửi bình luận</button>
                    </form>
                </div>
            </section>
        `;
        
        this.renderComments(id);
        
        document.getElementById('commentForm').addEventListener('submit', (e) => {
            this.handleCommentSubmit(e, id);
        });
        
        modal.show();
        this.renderSidebar(); // Update sidebar in case views changed
    }

    renderComments(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;

        const container = document.getElementById('commentsList');
        if (article.comments.length === 0) {
            container.innerHTML = '<p class="text-muted">Chưa có bình luận nào. Hãy là người đầu tiên!</p>';
            return;
        }

        container.innerHTML = article.comments.map(comment => `
            <div class="d-flex mb-3">
                <div class="flex-shrink-0">
                    <i class="bi bi-person-circle fs-2 text-secondary"></i>
                </div>
                <div class="ms-3 flex-grow-1">
                    <div class="fw-bold">${comment.author}</div>
                    <small class="text-muted">${this.formatDate(comment.date)}</small>
                    <p class="mt-1 mb-0">${comment.text}</p>
                </div>
            </div>
        `).join('');
    }

    handleCommentSubmit(e, articleId) {
        e.preventDefault();
        const form = e.target;
        
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        const nameInput = form.querySelector('#commentName');
        const textInput = form.querySelector('#commentText');
        
        const article = this.articles.find(a => a.id === articleId);
        if (article) {
            article.comments.unshift({
                author: nameInput.value.trim(),
                text: textInput.value.trim(),
                date: new Date().toISOString()
            });

            this.renderComments(articleId);
            form.reset();
            form.classList.remove('was-validated');
            this.showToast('Bình luận của bạn đã được gửi!', 'success');
            
            // Update comment count in title
            const commentTitle = document.querySelector('.comments-section h4');
            if(commentTitle) {
                commentTitle.textContent = `Bình luận (${article.comments.length})`;
            }
        }
    }

    likeArticle(id) {
        const article = this.articles.find(a => a.id === id);
        if (article) {
            article.likes++;
            this.renderArticles();
            this.showToast('Đã thích bài viết!', 'success');
        }
    }

    shareArticle(id) {
        const article = this.articles.find(a => a.id === id);
        if (article && navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: window.location.href
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            this.showToast('Đã sao chép liên kết!', 'info');
        }
    }

    toggleTheme() {
        const body = document.body;
        const themeIcon = document.getElementById('themeIcon');
        
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            themeIcon.className = 'bi bi-moon';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'bi bi-sun';
            localStorage.setItem('theme', 'dark');
        }
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            document.getElementById('themeIcon').className = 'bi bi-sun';
        }
    }

    handleNewsletter(e) {
        e.preventDefault();
        const form = e.target;
        form.classList.add('loading');
        
        setTimeout(() => {
            form.classList.remove('loading');
            form.reset();
            this.showToast('Đăng ký nhận tin thành công!', 'success');
        }, 1500);
    }
    
    setupIntersectionObserver() {
        // Observer logic remains the same
    }

    triggerAnimations() {
        // Animation logic remains the same
    }

    showToast(message, type = 'info') {
        // Toast logic remains the same
    }

    formatDate(dateString) {
        // Date formatting logic remains the same
    }

    formatNumber(num) {
        // Number formatting logic remains the same
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.vietnewsBlog = new VietNewsBlog();
});

// Event listeners for scroll and keydown remain the same
document.addEventListener('scroll', () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (window.scrollY > 100) {
        backToTopBtn.style.opacity = '1';
    } else {
        backToTopBtn.style.opacity = '0.7';
    }
});