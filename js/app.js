/**
 * 瓒崇悆鏄熺悆 - FootballHub 涓诲簲鐢? */

// 搴旂敤鐘舵€?const app = {
  currentPage: 'home',
  currentPost: null,
  filters: {
    league: 'all',
    postFilter: 'all'
  },
  
  // 鍒濆鍖?  init() {
    this.bindEvents();
    this.handleRoute();
    
    // 姣忓垎閽熸洿鏂版瘮璧涙椂闂?    setInterval(() => this.updateMatchTimes(), 60000);
  },
  
  // 缁戝畾浜嬩欢
  bindEvents() {
    // 绉诲姩绔彍鍗?    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }
    
    // 璺敱鍙樺寲鐩戝惉
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // 鐐瑰嚮閬僵鍏抽棴 Modal
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.closePostModal();
      }
    });
  },
  
  // 澶勭悊璺敱
  handleRoute() {
    const hash = window.location.hash || '#home';
    const parts = hash.slice(1).split('/');
    const page = parts[0] || 'home';
    const param = parts[1];
    
    this.currentPage = page;
    this.currentPost = param;
    
    // 鏇存柊瀵艰埅楂樹寒
    this.updateNavHighlight();
    
    // 娓叉煋椤甸潰
    this.renderPage();
    
    // 婊氬姩鍒伴《閮?    window.scrollTo(0, 0);
  },
  
  // 鏇存柊瀵艰埅楂樹寒
  updateNavHighlight() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${this.currentPage}`) {
        link.classList.add('active');
      }
    });
  },
  
  // 娓叉煋椤甸潰
  renderPage() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    let content = '';
    
    switch (this.currentPage) {
      case 'home':
        content = components.renderHomePage();
        break;
      case 'matches':
        content = components.renderMatchesPage();
        break;
      case 'discussion':
        content = components.renderDiscussionPage();
        break;
      case 'post':
        content = components.renderPostDetailPage(this.currentPost);
        break;
      default:
        content = components.renderHomePage();
    }
    
    mainContent.innerHTML = content;
  },
  
  // 瀵艰埅
  navigateTo(page, param = null) {
    if (param) {
      window.location.hash = `#${page}/${param}`;
    } else {
      window.location.hash = `#${page}`;
    }
  },
  
  // 鎵撳紑鍙戝笘 Modal
  openPostModal() {
    const modal = document.getElementById('post-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },
  
  // 鍏抽棴鍙戝笘 Modal
  closePostModal() {
    const modal = document.getElementById('post-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      
      // 娓呯┖琛ㄥ崟
      const form = document.getElementById('post-form');
      if (form) form.reset();
    }
  },
  
  // 鎻愪氦甯栧瓙
  submitPost(event) {
    event.preventDefault();
    
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const tagsInput = document.getElementById('post-tags').value.trim();
    
    if (!title || !content) {
      alert('璇峰～鍐欐爣棰樺拰鍐呭');
      return;
    }
    
    // 澶勭悊鏍囩
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];
    
    // 鍒涘缓鏂板笘瀛?    const newPost = {
      id: `post-${Date.now()}`,
      title,
      content,
      author: '鍖垮悕鐞冭糠',
      avatar: 'AN',
      createdAt: new Date().toISOString(),
      likes: 0,
      tags,
      replies: []
    };
    
    // 娣诲姞鍒版暟鎹?    mockData.posts.unshift(newPost);
    
    // 淇濆瓨鍒?localStorage
    this.savePosts();
    
    // 鍏抽棴 Modal
    this.closePostModal();
    
    // 閲嶆柊娓叉煋璁ㄨ鍖?    this.renderPage();
    
    alert('甯栧瓙鍙戝竷鎴愬姛锛?);
  },
  
  // 鎻愪氦鍥炲
  submitReply(postId) {
    const replyContent = document.getElementById('reply-content');
    if (!replyContent) return;
    
    const content = replyContent.value.trim();
    if (!content) {
      alert('璇疯緭鍏ュ洖澶嶅唴瀹?);
      return;
    }
    
    const post = mockData.posts.find(p => p.id === postId);
    if (!post) return;
    
    const newReply = {
      id: `reply-${Date.now()}`,
      author: '鍖垮悕鐞冭糠',
      content,
      createdAt: new Date().toISOString()
    };
    
    if (!post.replies) {
      post.replies = [];
    }
    post.replies.push(newReply);
    
    // 淇濆瓨鍒?localStorage
    this.savePosts();
    
    // 娓呯┖杈撳叆妗?    replyContent.value = '';
    
    // 閲嶆柊娓叉煋
    this.renderPage();
    
    alert('鍥炲鎴愬姛锛?);
  },
  
  // 绛涢€夊笘瀛?  filterPosts(filter) {
    this.filters.postFilter = filter;
    
    // 鏇存柊鎸夐挳鐘舵€?    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.textContent.includes(filter === 'all' ? '鍏ㄩ儴' : filter === 'hot' ? '鐑棬' : '鏈€鏂?)) {
        btn.classList.add('active');
      }
    });
    
    // 绛涢€夊苟閲嶆柊娓叉煋
    let posts = [...mockData.posts];
    
    switch (filter) {
      case 'hot':
        posts.sort((a, b) => b.likes - a.likes);
        break;
      case 'latest':
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // 榛樿鎸夋椂闂存帓搴?        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    // 閲嶆柊娓叉煋甯栧瓙鍒楄〃
    const postsContainer = document.getElementById('posts-container');
    if (postsContainer) {
      postsContainer.innerHTML = posts.map(p => components.renderPostCard(p)).join('');
    }
  },
  
  // 绛涢€夎仈璧?  filterLeague(league) {
    this.filters.league = league;
    
    // 鏇存柊鎸夐挳鐘舵€?    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    const targetBtn = Array.from(filterBtns).find(btn => 
      btn.textContent.includes(league === 'all' ? '鍏ㄩ儴' : mockData.leagues[league]?.name || league)
    );
    if (targetBtn) targetBtn.classList.add('active');
    
    // 绛涢€夋瘮璧?    let matches = [...mockData.matches];
    
    if (league !== 'all') {
      matches = matches.filter(m => m.league === league);
    }
    
    // 閲嶆柊娓叉煋锛堢畝鍖栧鐞嗭紝鐩存帴閲嶆柊娓叉煋鏁翠釜椤甸潰锛?    this.renderPage();
  },
  
  // 鏇存柊姣旇禌鏃堕棿
  updateMatchTimes() {
    // 鏇存柊 live 姣旇禌鐨?currentTime
    mockData.matches.forEach(match => {
      if (match.status === 'live' && match.currentTime) {
        match.currentTime = Math.min(match.currentTime + 1, 90);
      }
    });
    
    // 濡傛灉褰撳墠鍦ㄦ瘮璧涢〉闈紝鏇存柊鏄剧ず
    if (this.currentPage === 'matches') {
      const liveMatches = document.querySelectorAll('.status-live');
      liveMatches.forEach(el => {
        const card = el.closest('.live-match-card');
        if (card) {
          const match = mockData.matches.find(m => m.id === card.dataset.matchId);
          if (match) {
            el.textContent = `鐩存挱涓?${match.currentTime}'`;
          }
        }
      });
    }
  },
  
  // 淇濆瓨甯栧瓙鍒?localStorage
  savePosts() {
    try {
      localStorage.setItem('footballhub_posts', JSON.stringify(mockData.posts));
    } catch (e) {
      console.warn('鏃犳硶淇濆瓨鍒?localStorage:', e);
    }
  },
  
  // 浠?localStorage 鍔犺浇甯栧瓙
  loadPosts() {
    try {
      const saved = localStorage.getItem('footballhub_posts');
      if (saved) {
        const posts = JSON.parse(saved);
        // 鍚堝苟淇濆瓨鐨勫笘瀛愶紙閬垮厤瑕嗙洊榛樿甯栧瓙锛?        posts.forEach(savedPost => {
          const exists = mockData.posts.some(p => p.id === savedPost.id);
          if (!exists) {
            mockData.posts.push(savedPost);
          }
        });
      }
    } catch (e) {
      console.warn('鏃犳硶浠?localStorage 鍔犺浇:', e);
    }
  }
};

// 椤甸潰鍔犺浇瀹屾垚鍚庡垵濮嬪寲
document.addEventListener('DOMContentLoaded', () => {
  app.loadPosts();
  app.init();
});