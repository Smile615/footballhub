/**
 * 瓒崇悆鏄熺悆 - FootballHub 缁勪欢妯″潡
 */

// 鏍煎紡鍖栨椂闂村樊
function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) return '鍒氬垰';
  if (diff < 3600) return `${Math.floor(diff / 60)}鍒嗛挓鍓峘;
  if (diff < 86400) return `${Math.floor(diff / 3600)}灏忔椂鍓峘;
  return `${Math.floor(diff / 86400)}澶╁墠`;
}

// 鏍煎紡鍖栨瘮璧涙椂闂?function formatMatchTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// 鍒涘缓 Logo SVG
function createLogo() {
  return `
    <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#00ff88" stroke-width="2" fill="none"/>
      <path d="M20 2 L20 38 M2 20 L38 20" stroke="#00ff88" stroke-width="1" opacity="0.5"/>
      <circle cx="20" cy="20" r="8" stroke="#00ff88" stroke-width="2" fill="none"/>
      <path d="M20 12 L26 18 L20 24 L14 18 Z" fill="#00ff88"/>
    </svg>
  `;
}

// 娓叉煋姣旇禌鍗＄墖
function renderMatchCard(match) {
  const homeTeam = mockData.teams[match.home];
  const awayTeam = mockData.teams[match.away];
  const league = mockData.leagues[match.league];
  
  let statusHtml = '';
  let timeDisplay = formatMatchTime(match.startTime);
  
  if (match.status === 'live') {
    statusHtml = `<span class="status-badge status-live">鐩存挱涓?${match.currentTime}'</span>`;
    timeDisplay = `${match.currentTime}'`;
  } else if (match.status === 'upcoming') {
    const diff = new Date(match.startTime) - new Date();
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    timeDisplay = `${hours}灏忔椂${mins}鍒哷;
    statusHtml = `<span class="status-badge status-upcoming">鍗冲皢寮€濮?/span>`;
  } else {
    statusHtml = `<span class="status-badge status-finished">宸茬粨鏉?/span>`;
  }
  
  let eventsHtml = '';
  if (match.events && match.events.length > 0) {
    eventsHtml = `
      <div class="match-events">
        ${match.events.map(e => `
          <div class="event-item">
            <span class="event-icon event-goal">鈿?/span>
            <span class="event-time">${e.time}'</span>
            <span class="event-player">${e.player}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  return `
    <div class="live-match-card" data-match-id="${match.id}">
      <div class="match-league">${league.name} 路 ${league.nameEn}</div>
      <div class="match-teams">
        <div class="team">
          <div class="team-logo">${homeTeam.logo}</div>
          <span class="team-name">${homeTeam.name}</span>
        </div>
        <div class="match-score">
          <span class="score-number">${match.homeScore}</span>
          <span class="score-separator">-</span>
          <span class="score-number">${match.awayScore}</span>
        </div>
        <div class="team">
          <div class="team-logo">${awayTeam.logo}</div>
          <span class="team-name">${awayTeam.name}</span>
        </div>
      </div>
      <div class="match-status">
        ${statusHtml}
        ${match.status !== 'live' ? `<span class="match-time">${timeDisplay}</span>` : ''}
      </div>
      ${eventsHtml}
    </div>
  `;
}

// 娓叉煋甯栧瓙鍗＄墖
function renderPostCard(post) {
  return `
    <div class="post-card" data-post-id="${post.id}" onclick="app.navigateTo('post', '${post.id}')">
      <div class="post-header">
        <div class="post-avatar">${post.avatar}</div>
        <div>
          <span class="post-author">${post.author}</span>
          <span class="post-time">${formatTimeAgo(post.createdAt)}</span>
        </div>
      </div>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-excerpt">${post.content.substring(0, 100)}...</p>
      <div class="post-tags">
        ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
      </div>
      <div class="post-footer">
        <span class="post-stat">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          ${post.likes}
        </span>
        <span class="post-stat">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          ${post.replies ? post.replies.length : 0}
        </span>
      </div>
    </div>
  `;
}

// 娓叉煋棣栭〉
function renderHomePage() {
  const liveMatches = mockData.matches.filter(m => m.status === 'live');
  const upcomingMatches = mockData.matches.filter(m => m.status === 'upcoming');
  const hotPosts = mockData.posts.slice(0, 3);
  
  return `
    <div class="container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1>鈿?娆㈣繋鏉ュ埌瓒崇悆鏄熺悆</h1>
            <p>鍦ㄨ繖閲岋紝浣犲彲浠ヨ拷韪疄鏃舵瘮璧涖€佸弬涓庣悆杩疯璁恒€佸垎浜綘鐨勮冻鐞冪儹鎯呫€傛棤璁轰綘鏄摢鏀悆闃熺殑鐞冭糠锛岃繖閲岄兘鏄綘鐨勪富鍦猴紒</p>
            <div class="hero-actions">
              <button class="btn btn-primary" onclick="app.navigateTo('matches')">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                鏌ョ湅姣旇禌
              </button>
              <button class="btn btn-secondary" onclick="app.navigateTo('discussion')">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                鍔犲叆璁ㄨ
              </button>
            </div>
          </div>
          ${liveMatches.length > 0 ? `
            <div class="countdown">
              ${liveMatches.slice(0, 2).map(match => {
                const home = mockData.teams[match.home];
                const away = mockData.teams[match.away];
                return `
                  <div class="countdown-match">
                    <span class="countdown-teams">${home.name} vs ${away.name}</span>
                    <span class="countdown-time">馃敟 ${match.currentTime}' 杩涜涓?/span>
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>
      </section>
      
      <!-- Live Matches Section -->
      ${liveMatches.length > 0 ? `
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              姝ｅ湪杩涜
            </h2>
            <button class="btn btn-ghost" onclick="app.navigateTo('matches')">鏌ョ湅鍏ㄩ儴 鈫?/button>
          </div>
          <div class="match-grid">
            ${liveMatches.map(m => renderMatchCard(m)).join('')}
          </div>
        </section>
      ` : ''}
      
      <!-- Upcoming Matches Section -->
      ${upcomingMatches.length > 0 ? `
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              鍗冲皢寮€璧?            </h2>
          </div>
          <div class="match-grid">
            ${upcomingMatches.map(m => renderMatchCard(m)).join('')}
          </div>
        </section>
      ` : ''}
      
      <!-- Hot Discussions Section -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            鐑棬璁ㄨ
          </h2>
          <button class="btn btn-ghost" onclick="app.navigateTo('discussion')">鏌ョ湅鍏ㄩ儴 鈫?/button>
        </div>
        <div class="post-grid">
          ${hotPosts.map(p => renderPostCard(p)).join('')}
        </div>
      </section>
    </div>
  `;
}

// 娓叉煋姣旇禌椤甸潰
function renderMatchesPage() {
  const liveMatches = mockData.matches.filter(m => m.status === 'live');
  const upcomingMatches = mockData.matches.filter(m => m.status === 'upcoming');
  const finishedMatches = mockData.matches.filter(m => m.status === 'finished');
  
  return `
    <div class="container">
      <section class="section">
        <div class="stats-bar">
          <div class="stat-item">
            <div class="stat-value">${liveMatches.length}</div>
            <div class="stat-label">鐩存挱涓?/div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${upcomingMatches.length}</div>
            <div class="stat-label">鍗冲皢寮€璧?/div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${finishedMatches.length}</div>
            <div class="stat-label">宸茬粨鏉?/div>
          </div>
        </div>
        
        ${liveMatches.length > 0 ? `
          <div class="section-header">
            <h2 class="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              鐩存挱涓?馃敶
            </h2>
          </div>
          <div class="match-grid mb-4">
            ${liveMatches.map(m => renderMatchCard(m)).join('')}
          </div>
        ` : ''}
        
        ${upcomingMatches.length > 0 ? `
          <div class="section-header mt-4">
            <h2 class="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              鍗冲皢寮€璧?鈴?            </h2>
          </div>
          <div class="match-grid mb-4">
            ${upcomingMatches.map(m => renderMatchCard(m)).join('')}
          </div>
        ` : ''}
        
        ${finishedMatches.length > 0 ? `
          <div class="section-header mt-4">
            <h2 class="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              宸茬粨鏉?鉁?            </h2>
          </div>
          <div class="match-grid">
            ${finishedMatches.map(m => renderMatchCard(m)).join('')}
          </div>
        ` : ''}
      </section>
    </div>
  `;
}

// 娓叉煋璁ㄨ鍖洪〉闈?function renderDiscussionPage() {
  return `
    <div class="container">
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            鐞冭糠璁ㄨ鍖?          </h2>
          <button class="btn btn-primary" onclick="app.openPostModal()">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            鍙戝竷甯栧瓙
          </button>
        </div>
        
        <div class="filters">
          <button class="filter-btn active" onclick="app.filterPosts('all')">鍏ㄩ儴</button>
          <button class="filter-btn" onclick="app.filterPosts('hot')">鐑棬</button>
          <button class="filter-btn" onclick="app.filterPosts('latest')">鏈€鏂?/button>
        </div>
        
        <div class="post-grid" id="posts-container">
          ${mockData.posts.map(p => renderPostCard(p)).join('')}
        </div>
      </section>
    </div>
    
    <!-- 鍙戝笘 Modal -->
    ${renderPostModal()}
  `;
}

// 娓叉煋鍙戝笘 Modal
function renderPostModal() {
  return `
    <div class="modal-overlay" id="post-modal">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">鍙戝竷鏂板笘瀛?/h3>
          <button class="modal-close" onclick="app.closePostModal()">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <form id="post-form" onsubmit="app.submitPost(event)">
            <div class="form-group">
              <label class="form-label">甯栧瓙鏍囬</label>
              <input type="text" class="form-input" id="post-title" placeholder="璇疯緭鍏ュ笘瀛愭爣棰? required>
            </div>
            <div class="form-group">
              <label class="form-label">甯栧瓙鍐呭</label>
              <textarea class="form-textarea" id="post-content" placeholder="璇疯緭鍏ュ笘瀛愬唴瀹?.." required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">鏍囩锛堢敤閫楀彿鍒嗛殧锛?/label>
              <input type="text" class="form-input" id="post-tags" placeholder="渚嬪锛氳嫳瓒? 鏇艰仈, 鐑棬">
            </div>
            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
              鍙戝竷甯栧瓙
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

// 娓叉煋甯栧瓙璇︽儏椤?function renderPostDetailPage(postId) {
  const post = mockData.posts.find(p => p.id === postId);
  
  if (!post) {
    return `
      <div class="container">
        <div class="empty-state">
          <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h3 class="empty-title">甯栧瓙涓嶅瓨鍦?/h3>
          <p class="empty-text">璇ュ笘瀛愬彲鑳藉凡琚垹闄ゆ垨绉诲姩</p>
          <button class="btn btn-primary mt-3" onclick="app.navigateTo('discussion')">杩斿洖璁ㄨ鍖?/button>
        </div>
      </div>
    `;
  }
  
  const repliesHtml = post.replies && post.replies.length > 0 
    ? post.replies.map(reply => `
        <div class="reply-item">
          <div class="reply-avatar">${reply.author.charAt(0)}</div>
          <div class="reply-content">
            <div class="reply-author">${reply.author}</div>
            <div class="reply-text">${reply.content}</div>
            <div class="reply-time">${formatTimeAgo(reply.createdAt)}</div>
          </div>
        </div>
      `).join('')
    : '<p style="color: var(--text-muted); text-align: center; padding: 20px;">鏆傛棤鍥炲锛屽揩鏉ユ姠娌欏彂鍚э紒</p>';
  
  return `
    <div class="container">
      <div class="post-detail">
        <a href="#" class="back-btn" onclick="app.navigateTo('discussion'); return false;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          杩斿洖璁ㄨ鍖?        </a>
        
        <div class="post-full-header">
          <h1 class="post-full-title">${post.title}</h1>
          <div class="post-full-meta">
            <span>馃懁 ${post.author}</span>
            <span>馃晲 ${formatTimeAgo(post.createdAt)}</span>
            <span>馃挰 ${post.replies ? post.replies.length : 0} 鏉″洖澶?/span>
          </div>
          <div class="post-tags mt-2">
            ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
          </div>
        </div>
        
        <div class="post-full-content">${post.content}</div>
        
        <div class="replies-section">
          <h3 class="replies-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            鍏ㄩ儴鍥炲 (${post.replies ? post.replies.length : 0})
          </h3>
          
          <div class="reply-form">
            <textarea class="form-textarea" id="reply-content" placeholder="鍐欎笅浣犵殑鍥炲..." style="min-height: 100px;"></textarea>
            <button class="btn btn-primary mt-2" onclick="app.submitReply('${post.id}')">鍙戦€佸洖澶?/button>
          </div>
          
          <div class="replies-list">
            ${repliesHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

// 瀵煎嚭缁勪欢
const components = {
  renderHomePage,
  renderMatchesPage,
  renderDiscussionPage,
  renderPostDetailPage,
  renderMatchCard,
  renderPostCard
};