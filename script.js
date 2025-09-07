// Modern News Blog JavaScript

class VietNewsBlog {
    constructor() {
        this.articles = [];
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.currentCategory = 'all';
        this.currentSort = 'newest';
        this.searchQuery = '';
        this.loadedArticles = 0;
        
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
                readTime: Math.floor(Math.random() * 10) + 2
            });
        }

        // Sort by date initially
        this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        searchBtn.addEventListener('click', () => this.handleSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // Category filtering
        document.querySelectorAll('[data-category]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByCategory(e.target.dataset.category);
            });
        });

        // Sorting
        document.querySelectorAll('[data-sort]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleSort(e.target.dataset.sort);
            });
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Load more button
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.loadMoreArticles();
        });

        // Newsletter form
        document.getElementById('newsletterForm').addEventListener('submit', (e) => {
            this.handleNewsletter(e);
        });

        // Back to top
        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Smooth scrolling for navigation links
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
        const articlesToShow = filteredArticles.slice(0, this.loadedArticles || this.articlesPerPage);
        
        if (this.loadedArticles === 0) {
            container.innerHTML = '';
            this.loadedArticles = this.articlesPerPage;
        }

        const articlesHTML = articlesToShow.slice(this.loadedArticles - this.articlesPerPage).map(article => `
            <article class="article-card" data-aos="fade-up">
                <div class="article-image">
                    <img src="${article.image}" alt="${article.title}" loading="lazy">
                </div>
                <div class="card-body">
                    <a href="#" class="category-badge ${article.categoryClass}" onclick="vietnewsBlog.filterByCategory('${article.category}')">${article.categoryName}</a>
                    <h3 class="card-title">
                        <a href="#" onclick="vietnewsBlog.showArticle(${article.id})" class="text-decoration-none text-dark">${article.title}</a>
                    </h3>
                    <p class="card-text">${article.excerpt}</p>
                    <div class="article-meta">
                        <div class="meta-left">
                            <span><i class="bi bi-person"></i> ${article.author}</span>
                            <span><i class="bi bi-calendar3"></i> ${this.formatDate(article.date)}</span>
                            <span><i class="bi bi-clock"></i> ${article.readTime} phút đọc</span>
                        </div>
                        <div class="meta-right">
                            <span><i class="bi bi-eye"></i> ${this.formatNumber(article.views)}</span>
                            <button class="btn btn-sm btn-outline-primary" onclick="vietnewsBlog.likeArticle(${article.id})">
                                <i class="bi bi-heart"></i> ${article.likes}
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');

        if (this.loadedArticles <= this.articlesPerPage) {
            container.innerHTML = articlesHTML;
        } else {
            container.insertAdjacentHTML('beforeend', articlesHTML);
        }

        // Update load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (this.loadedArticles >= filteredArticles.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }

        // Trigger animations
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

        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(article => article.category === this.currentCategory);
        }

        // Filter by search query
        if (this.searchQuery) {
            filtered = filtered.filter(article => 
                article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                article.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                article.author.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        // Sort articles
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
        this.loadedArticles = 0;
        this.renderArticles();
        
        if (this.searchQuery) {
            this.showToast(`Tìm thấy ${this.getFilteredArticles().length} kết quả cho "${this.searchQuery}"`, 'info');
        }
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.loadedArticles = 0;
        this.renderArticles();
        
        // Update active state in dropdown
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
        this.loadedArticles = 0;
        this.renderArticles();
        
        // Update active state
        document.querySelectorAll('[data-sort]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-sort="${sortType}"]`).classList.add('active');
    }

    loadMoreArticles() {
        this.loadedArticles += this.articlesPerPage;
        this.renderArticles();
    }

    showArticle(id) {
        const article = this.articles.find(a => a.id === id);
        if (!article) return;

        // Increment view count
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
                            <span><i class="bi bi-eye"></i> ${this.formatNumber(article.views)} lượt xem</span>
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
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
                            <span class="badge bg-light text-dark">#VietNews</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
        
        modal.show();
        
        // Update sidebar after view count change
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
            // Fallback: copy to clipboard
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
        const email = form.querySelector('input[type="email"]').value;
        
        // Simulate API call
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

            // Observe elements for animation
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
        // Simple animation trigger for new elements
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

// Initialize the blog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.vietnewsBlog = new VietNewsBlog();
});

// Additional utility functions
document.addEventListener('scroll', () => {
    const backToTopBtn = document.getElementById('backToTop');
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        backToTopBtn.style.opacity = '1';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        backToTopBtn.style.opacity = '0.7';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            bootstrap.Modal.getInstance(openModal).hide();
        }
    }
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}