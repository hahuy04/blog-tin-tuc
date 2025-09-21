// Modern News Blog JavaScript

class VietNewsBlog {
    constructor() {
        this.articles = [];
        this.currentPage = 1;
        this.articlesPerPage = 9;
        this.currentCategory = 'all';
        this.currentSort = 'newest';
        this.searchQuery = '';
        this.totalPages = 1;
        this.comments = {};
        this.heroSwiper = null;
        
        this.init();
    }

    init() {
        this.generateSampleData();
        this.bindEvents();
        this.initializeTheme();
        this.renderInitialContent();
        this.setupIntersectionObserver();
        this.initializeSlider();
        this.initializeProgressBar();
    }

    initializeSlider() {
        this.heroSwiper = new Swiper('.heroSwiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            on: {
                slideChange: function () {
                    const activeSlide = this.slides[this.activeIndex];
                    const content = activeSlide.querySelector('.hero-content');
                    if (content) {
                        content.style.opacity = '0';
                        content.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            content.style.transition = 'all 0.8s ease';
                            content.style.opacity = '1';
                            content.style.transform = 'translateY(0)';
                        }, 300);
                    }
                }
            }
        });
    }

    initializeProgressBar() {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('readingProgress').style.width = scrolled + '%';
        });

        this.showLoadingProgress();
    }

    showLoadingProgress() {
        const progressBars = document.querySelectorAll('.loading-progress');
        progressBars.forEach(bar => {
            bar.classList.add('show');
            setTimeout(() => {
                bar.classList.remove('show');
            }, 2000);
        });
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
            'Xu hướng làm việc từ xa sau đại dịch',
            'Phát triển du lịch bền vững tại các tỉnh miền núi',
            'Ứng dụng trí tuệ nhân tạo trong y tế',
            'Thị trường bất động sản có dấu hiệu phục hồi',
            'Giải pháp giao thông thông minh cho đô thị lớn',
            'Nông nghiệp công nghệ cao: Hướng đi mới'
        ];

        const images = [
            'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800'
        ];

        const authors = ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Hoàng Cường', 'Phạm Thị Dung', 'Hoàng Văn Em'];

        for (let i = 0; i < 40; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const title = sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
            const image = images[Math.floor(Math.random() * images.length)];
            const author = authors[Math.floor(Math.random() * authors.length)];
            
            this.articles.push({
                id: i + 1,
                title: title,
                content: `Đây là nội dung chi tiết của bài viết "${title}". Bài viết cung cấp thông tin đầy đủ và chính xác về chủ đề này, được biên tập bởi đội ngũ phóng viên chuyên nghiệp. Nội dung được cập nhật liên tục để đảm bảo tính chính xác và kịp thời nhất.`,
                excerpt: `Thông tin quan trọng và cập nhật nhất về chủ đề "${title.length > 50 ? title.substring(0, 50) + '...' : title}". Đọc để biết thêm chi tiết.`,
                image: image,
                category: category.id,
                categoryName: category.name,
                categoryClass: category.class,
                author: author,
                date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                views: Math.floor(Math.random() * 10000) + 100,
                likes: Math.floor(Math.random() * 500) + 10,
                readTime: Math.floor(Math.random() * 10) + 2
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
                this.handleSort(e.target.dataset.sort);
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

        document.getElementById('contactForm').addEventListener('submit', (e) => {
            this.handleContactForm(e);
        });

        document.addEventListener('submit', (e) => {
            if (e.target.id === 'commentForm') {
                this.handleCommentForm(e);
            }
        });

        document.querySelectorAll('[data-nav]').forEach(link => {
            link.addEventListener('click', (e) => {
                this.updateActiveNav(e.target.dataset.nav);
            });
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
        this.updateBreakingNews();
    }

    renderArticles() {
        const container = document.getElementById('articlesContainer');
        const filteredArticles = this.getFilteredArticles();
        
        this.totalPages = Math.ceil(filteredArticles.length / this.articlesPerPage);
        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToShow = filteredArticles.slice(startIndex, endIndex);
        
        const articlesHTML = articlesToShow.map(article => `
            <article class="article-card" data-aos="fade-up" onclick="vietnewsBlog.showArticle(${article.id})">
                <div class="article-image">
                    <img src="${article.image}" alt="${article.title}" loading="lazy">
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="view-badge">
                            <i class="bi bi-eye"></i>
                            ${this.formatNumber(article.views)}
                        </span>
                    </div>
                </div>
                <div class="card-body">
                    <a href="#" class="category-badge ${article.categoryClass}" onclick="vietnewsBlog.filterByCategory('${article.category}')">${article.categoryName}</a>
                    <h3 class="card-title">
                        <a class="text-decoration-none text-dark">${article.title}</a>
                    </h3>
                    <p class="card-text">${article.excerpt}</p>
                    <div class="article-meta">
                        <div class="meta-left">
                            <span><i class="bi bi-person"></i> ${article.author}</span>
                            <span><i class="bi bi-calendar3"></i> ${this.formatDate(article.date)}</span>
                            <span><i class="bi bi-clock"></i> ${article.readTime} phút đọc</span>
                        </div>
                        <div class="meta-right">
                            <button class="btn btn-sm btn-outline-primary" onclick="vietnewsBlog.likeArticle(${article.id})">
                                <i class="bi bi-heart"></i> ${article.likes}
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');

        container.innerHTML = articlesHTML;

        this.renderPagination();

        this.triggerAnimations();
    }

    renderSidebar() {
        this.renderTrendingTopics();
        this.renderRecentPosts();
        this.renderCategories();
    }

    renderTrendingTopics() {
        const trending = this.articles
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);
        
        const container = document.getElementById('trendingTopics');
        container.innerHTML = trending.map((article, index) => `
            <div class="trending-item">
                <div class="trending-number">${index + 1}</div>
                <div class="trending-title">
                    <a href="#" onclick="vietnewsBlog.showArticle(${article.id})" class="text-decoration-none text-dark">
                        ${article.title.substring(0, 80)}${article.title.length > 80 ? '...' : ''}
                    </a>
                </div>
            </div>
        `).join('');
    }

    renderRecentPosts() {
        const recent = this.articles
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        const container = document.getElementById('recentPosts');
        container.innerHTML = recent.map(article => `
            <div class="recent-post">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <div class="recent-post-content">
                    <h6>
                        <a href="#" onclick="vietnewsBlog.showArticle(${article.id})" class="text-decoration-none">
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
            <a href="#" class="category-item" onclick="vietnewsBlog.filterByCategory('${cat.id}')">
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
            filtered = filtered.filter(article => 
                article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                article.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                article.author.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        if (this.currentSort === 'newest') {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (this.currentSort === 'popular') {
            filtered.sort((a, b) => b.views - a.views);
        }

        return filtered;
    }

    renderPagination() {
        const container = document.getElementById('paginationContainer');
        
        if (this.totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        paginationHTML += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="vietnewsBlog.goToPage(${this.currentPage - 1})">
                    <i class="bi bi-chevron-left"></i>
                </a>
            </li>
        `;
        
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(this.totalPages, this.currentPage + 2);
        
        if (startPage > 1) {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="vietnewsBlog.goToPage(1)">1</a>
                </li>
            `;
            if (startPage > 2) {
                paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="vietnewsBlog.goToPage(${i})">${i}</a>
                </li>
            `;
        }
        
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
            }
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="vietnewsBlog.goToPage(${this.totalPages})">${this.totalPages}</a>
                </li>
            `;
        }
        
        paginationHTML += `
            <li class="page-item ${this.currentPage === this.totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="vietnewsBlog.goToPage(${this.currentPage + 1})">
                    <i class="bi bi-chevron-right"></i>
                </a>
            </li>
        `;
        
        container.innerHTML = paginationHTML;
    }

    goToPage(page) {
        if (page < 1 || page > this.totalPages || page === this.currentPage) return;
        
        this.currentPage = page;
        this.renderArticles();
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
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        const categoryName = category === 'all' ? 'Tất cả tin tức' : 
            document.querySelector(`[data-category="${category}"]`).textContent;
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
                <header class="article-header mb-4">
                    <span class="category-badge ${article.categoryClass} mb-3">${article.categoryName}</span>
                    <h1 class="article-title mb-3">${article.title}</h1>
                    <div class="article-meta-detail">
                        <div class="d-flex align-items-center flex-wrap gap-3 text-muted">
                            <span><i class="bi bi-person"></i> ${article.author}</span>
                            <span><i class="bi bi-calendar3"></i> ${this.formatDate(article.date)}</span>
                            <span><i class="bi bi-clock"></i> ${article.readTime} phút đọc</span>
                            <span><i class="bi bi-eye"></i> ${this.formatNumber(article.views)} lượt xem</span>
                        </div>
                    </div>
                </header>
                
                <figure class="article-image mb-4">
                    <img src="${article.image}" class="img-fluid rounded" alt="${article.title}">
                </figure>
                
                <section class="article-content">
                    <p class="lead">${article.excerpt}</p>
                    <p>${article.content}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </section>
                
                <footer class="article-actions mt-4 pt-4 border-top">
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
                            <span class="badge bg-light text-dark">#VietNews</span>
                        </div>
                    </div>
                </footer>
            </article>
        `;
        
        this.loadComments(article.id);
        
        modal.show();
        
        this.renderSidebar();
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
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            this.showToast('Đã sao chép liên kết!', 'info');
        }
    }

    loadComments(articleId) {
        const commentsContainer = document.getElementById('commentsList');
        const commentsCount = document.getElementById('commentsCount');
        
        const articleComments = this.comments[articleId] || [];
        commentsCount.textContent = articleComments.length;
        
        if (articleComments.length === 0) {
            commentsContainer.innerHTML = '<p class="text-muted text-center py-4">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>';
            return;
        }
        
        const commentsHTML = articleComments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-author">${comment.name}</span>
                    <span class="comment-date">${this.formatDate(comment.date)}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
            </div>
        `).join('');
        
        commentsContainer.innerHTML = commentsHTML;
    }

    handleCommentForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const name = form.querySelector('#commentName').value.trim();
        const email = form.querySelector('#commentEmail').value.trim();
        const text = form.querySelector('#commentText').value.trim();
        
        if (!this.validateCommentForm(form, name, email, text)) {
            return;
        }
        
        const modal = document.getElementById('articleModal');
        const articleId = modal.dataset.articleId;
        
        if (!articleId) return;
        
        if (!this.comments[articleId]) {
            this.comments[articleId] = [];
        }
        
        this.comments[articleId].unshift({
            id: Date.now(),
            name: name,
            email: email,
            text: text,
            date: new Date().toISOString()
        });
        
        form.reset();
        form.classList.remove('was-validated');
        
        form.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        this.loadComments(articleId);
        
        this.showToast('Bình luận đã được gửi thành công!', 'success');
    }

    validateCommentForm(form, name, email, text) {
        let isValid = true;
        
        form.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        const nameInput = form.querySelector('#commentName');
        if (!name || name.length < 2) {
            nameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            nameInput.classList.add('is-valid');
        }
        
        const emailInput = form.querySelector('#commentEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailInput.classList.add('is-valid');
        }
        
        const textInput = form.querySelector('#commentText');
        if (!text || text.length < 10) {
            textInput.classList.add('is-invalid');
            textInput.nextElementSibling.textContent = 'Bình luận phải có ít nhất 10 ký tự';
            isValid = false;
        } else {
            textInput.classList.add('is-valid');
        }
        
        return isValid;
    }

    handleContactForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const name = form.querySelector('#contactName').value.trim();
        const email = form.querySelector('#contactEmail').value.trim();
        const subject = form.querySelector('#contactSubject').value.trim();
        const message = form.querySelector('#contactMessage').value.trim();
        
        if (!this.validateContactForm(form, name, email, message)) {
            return;
        }
        
        form.classList.add('loading');
        
        setTimeout(() => {
            form.classList.remove('loading');
            form.reset();
            form.classList.remove('was-validated');
            form.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
            
            this.showToast('Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.', 'success');
        }, 2000);
    }

    validateContactForm(form, name, email, message) {
        let isValid = true;
        
        form.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        const nameInput = form.querySelector('#contactName');
        if (!name || name.length < 2) {
            nameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            nameInput.classList.add('is-valid');
        }
        
        const emailInput = form.querySelector('#contactEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailInput.classList.add('is-valid');
        }
        
        const messageInput = form.querySelector('#contactMessage');
        if (!message || message.length < 10) {
            messageInput.classList.add('is-invalid');
            isValid = false;
        } else {
            messageInput.classList.add('is-valid');
        }
        
        return isValid;
    }

    updateActiveNav(section) {
        document.querySelectorAll('[data-nav]').forEach(link => {
            link.classList.remove('active');
        });
        const linkToActivate = document.querySelector(`[data-nav="${section}"]`);
        if (linkToActivate) {
            linkToActivate.classList.add('active');
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
        
        if (this.heroSwiper) {
            this.heroSwiper.update();
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
        const email = form.querySelector('input[type="email"]').value;
        
        form.classList.add('loading');
        
        setTimeout(() => {
            form.classList.remove('loading');
            form.reset();
            this.showToast('Đăng ký nhận tin thành công!', 'success');
        }, 1500);
    }

    updateBreakingNews() {
        const breakingNews = [
            'Chính phủ công bố gói hỗ trợ kinh tế mới trị giá 120.000 tỷ đồng',
            'Công nghệ AI đang thay đổi cách chúng ta làm việc và học tập',
            'Đội tuyển Việt Nam giành chiến thắng ấn tượng trước đối thủ mạnh',
            'Thị trường chứng khoán Việt Nam tăng trưởng mạnh trong quý này',
            'Startup Việt Nam gọi vốn thành công 50 triệu USD từ quỹ đầu tư quốc tế'
        ];
        
        let currentIndex = 0;
        const breakingTextElement = document.getElementById('breakingNewsText');
        
        setInterval(() => {
            breakingTextElement.style.opacity = '0';
            setTimeout(() => {
                breakingTextElement.textContent = breakingNews[currentIndex];
                breakingTextElement.style.opacity = '1';
                currentIndex = (currentIndex + 1) % breakingNews.length;
            }, 300);
        }, 5000);
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            setTimeout(() => {
                document.querySelectorAll('.article-card, .sidebar-widget').forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(el);
                });
            }, 100);
        }
    }

    triggerAnimations() {
        const newElements = document.querySelectorAll('.article-card:not([data-animated])');
        newElements.forEach((el, index) => {
            el.setAttribute('data-animated', 'true');
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        this.showLoadingProgress();
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toastId = 'toast-' + Date.now();
        
        const iconMap = {
            success: 'bi-check-circle-fill text-success',
            error: 'bi-x-circle-fill text-danger',
            warning: 'bi-exclamation-triangle-fill text-warning',
            info: 'bi-info-circle-fill text-info'
        };
        
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.id = toastId;
        toast.innerHTML = `
            <div class="toast-header">
                <i class="bi ${iconMap[type]} me-2"></i>
                <strong class="me-auto">VietNews</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Hôm qua';
        if (diffDays < 7) return `${diffDays} ngày trước`;
        
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.vietnewsBlog = new VietNewsBlog();
});

document.addEventListener('scroll', () => {
    const backToTopBtn = document.getElementById('backToTop');
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        backToTopBtn.style.opacity = '1';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        backToTopBtn.style.opacity = '0.7';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    const sections = ['home', 'news', 'about', 'contact'];
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
            vietnewsBlog.updateActiveNav(section);
        }
    });
});

document.addEventListener('show.bs.modal', (e) => {
    if (e.target.id === 'articleModal') {
        const articleId = e.relatedTarget?.dataset?.articleId;
        if (articleId) {
            e.target.dataset.articleId = articleId;
        }
    }
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            bootstrap.Modal.getInstance(openModal).hide();
        }
    }
    
    if (vietnewsBlog.heroSwiper) {
        if (e.key === 'ArrowLeft') {
            vietnewsBlog.heroSwiper.slidePrev();
        } else if (e.key === 'ArrowRight') {
            vietnewsBlog.heroSwiper.slideNext();
        }
    }
});

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then((registration) => {
//                 console.log('SW registered: ', registration);
//             })
//             .catch((registrationError) => {
//                 console.log('SW registration failed: ', registrationError);
//             });
//     });
// }