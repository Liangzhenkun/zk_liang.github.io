// DOM 元素加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 设置最后更新时间
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        const currentDate = new Date();
        lastUpdateElement.textContent = currentDate.toLocaleDateString('zh-CN');
    }

    // 页面滚动时添加导航高亮
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // 主题切换功能
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    // 检查本地存储中的主题首选项
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }
    
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    }
    
    toggleSwitch.addEventListener('change', switchTheme, false);
    
    // 论文摘要展开收起
    const abstractToggles = document.querySelectorAll('.abstract-toggle');
    
    abstractToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const abstract = this.parentElement.nextElementSibling;
            abstract.classList.toggle('hidden');
            
            // 更新图标
            const icon = this.querySelector('i');
            if (abstract.classList.contains('hidden')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                this.setAttribute('title', '展开摘要');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                this.setAttribute('title', '收起摘要');
            }
        });
    });
    
    // 出版物筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationItems = document.querySelectorAll('.publication-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的活动状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前按钮的活动状态
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            publicationItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'flex';
                } else if (item.getAttribute('data-year') === filterValue || item.getAttribute('data-type') === filterValue) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 语言切换功能
    const zhBtn = document.getElementById('zh-btn');
    const enBtn = document.getElementById('en-btn');
    
    if (zhBtn && enBtn) {
        // 检查当前页面是否为中文版
        const isChinesePage = window.location.pathname.endsWith('index.html') || 
                             window.location.pathname.endsWith('/') || 
                             window.location.pathname.endsWith('/personal-academic-website/');
        
        // 设置初始按钮状态
        if (isChinesePage) {
            zhBtn.classList.add('active');
            enBtn.classList.remove('active');
        } else {
            enBtn.classList.add('active');
            zhBtn.classList.remove('active');
        }
        
        zhBtn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                this.classList.add('active');
                enBtn.classList.remove('active');
                window.location.href = 'index.html';
            }
        });
        
        enBtn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                this.classList.add('active');
                zhBtn.classList.remove('active');
                window.location.href = 'en.html';
            }
        });
    }
    
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
                
                // 更新导航链接活动状态
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // 添加入场动画
    const animateElements = document.querySelectorAll('.section, .info-card, .interest-card, .publication-item, .project-card, .reading-card, .photo-item, .collection-item, .moment-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // 生活之光标签切换功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前按钮的活动状态
            button.classList.add('active');
            
            const tabId = button.getAttribute('data-tab');
            
            // 隐藏所有内容
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // 显示选中的内容
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
}); 