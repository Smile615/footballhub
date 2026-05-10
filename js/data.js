/**
 * 瓒崇悆鏄熺悆 - FootballHub 妯℃嫙鏁版嵁
 */

const LEAGUES = {
  'premier-league': { name: '鑻辫秴', nameEn: 'Premier League', country: '鑻辨牸鍏?, color: '#3d195b' },
  'la-liga': { name: '瑗跨敳', nameEn: 'La Liga', country: '瑗跨彮鐗?, color: '#ee8707' },
  'serie-a': { name: '鎰忕敳', nameEn: 'Serie A', country: '鎰忓ぇ鍒?, color: '#004d80' },
  'bundesliga': { name: '寰风敳', nameEn: 'Bundesliga', country: '寰峰浗', color: '#d20515' },
  'ligue-1': { name: '娉曠敳', nameEn: 'Ligue 1', country: '娉曞浗', color: '#d6a843' },
  'csl': { name: '涓秴', nameEn: 'Chinese Super League', country: '涓浗', color: '#e25822' }
};

const TEAMS = {
  'man-utd': { name: '鏇煎交鏂壒鑱?, nameEn: 'Manchester United', league: 'premier-league', logo: 'MU' },
  'man-city': { name: '鏇煎煄', nameEn: 'Manchester City', league: 'premier-league', logo: 'MC' },
  'chelsea': { name: '鍒囧皵瑗?, nameEn: 'Chelsea', league: 'premier-league', logo: 'CHE' },
  'arsenal': { name: '闃挎．绾?, nameEn: 'Arsenal', league: 'premier-league', logo: 'ARS' },
  'liverpool': { name: '鍒╃墿娴?, nameEn: 'Liverpool', league: 'premier-league', logo: 'LIV' },
  'tottenham': { name: '鐑埡', nameEn: 'Tottenham', league: 'premier-league', logo: 'TOT' },
  'real-madrid': { name: '鐨囧椹痉閲?, nameEn: 'Real Madrid', league: 'la-liga', logo: 'RM' },
  'barcelona': { name: '宸村缃楅偅', nameEn: 'Barcelona', league: 'la-liga', logo: 'BAR' },
  'atletico': { name: '椹痉閲岀珵鎶€', nameEn: 'Atletico Madrid', league: 'la-liga', logo: 'ATM' },
  'juventus': { name: '灏ゆ枃鍥炬柉', nameEn: 'Juventus', league: 'serie-a', logo: 'JUV' },
  'inter': { name: '鍥介檯绫冲叞', nameEn: 'Inter Milan', league: 'serie-a', logo: 'INT' },
  'ac-milan': { name: 'AC绫冲叞', nameEn: 'AC Milan', league: 'serie-a', logo: 'MIL' },
  'bayern': { name: '鎷滀粊鎱曞凹榛?, nameEn: 'Bayern Munich', league: 'bundesliga', logo: 'BAY' },
  'dortmund': { name: '澶氱壒钂欏痉', nameEn: 'Borussia Dortmund', league: 'bundesliga', logo: 'BVB' },
  'psg': { name: '宸撮粠鍦ｆ棩鑰虫浖', nameEn: 'PSG', league: 'ligue-1', logo: 'PSG' },
  'marseille': { name: '椹禌', nameEn: 'Marseille', league: 'ligue-1', logo: 'MAR' },
  'shanghai': { name: '涓婃捣娴锋腐', nameEn: 'Shanghai Port', league: 'csl', logo: 'SHA' },
  'beijing': { name: '鍖椾含鍥藉畨', nameEn: 'Beijing Guoan', league: 'csl', logo: 'BEI' }
};

const MATCHES = [
  {
    id: 'match-1',
    home: 'man-utd',
    away: 'liverpool',
    homeScore: 2,
    awayScore: 2,
    status: 'live',
    currentTime: 67,
    startTime: new Date(Date.now() - 67 * 60000).toISOString(),
    league: 'premier-league',
    events: [
      { type: 'goal', team: 'home', player: 'B璐?, time: 23 },
      { type: 'goal', team: 'away', player: '钀ㄦ媺璧?, time: 41 },
      { type: 'goal', team: 'home', player: '鍔犵撼涔?, time: 55 },
      { type: 'goal', team: 'away', player: '鍔秴鏂?, time: 62 }
    ]
  },
  {
    id: 'match-2',
    home: 'arsenal',
    away: 'man-city',
    homeScore: 1,
    awayScore: 0,
    status: 'live',
    currentTime: 78,
    startTime: new Date(Date.now() - 78 * 60000).toISOString(),
    league: 'premier-league',
    events: [
      { type: 'goal', team: 'home', player: '钀ㄥ崱', time: 34 }
    ]
  },
  {
    id: 'match-3',
    home: 'real-madrid',
    away: 'barcelona',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    startTime: new Date(Date.now() + 3600000 * 2).toISOString(),
    league: 'la-liga',
    events: []
  },
  {
    id: 'match-4',
    home: 'bayern',
    away: 'dortmund',
    homeScore: 3,
    awayScore: 1,
    status: 'finished',
    startTime: new Date(Date.now() - 7200000).toISOString(),
    league: 'bundesliga',
    events: [
      { type: 'goal', team: 'home', player: '鍑仼', time: 12 },
      { type: 'goal', team: 'away', player: '绌嗙绉?, time: 28 },
      { type: 'goal', team: 'home', player: '绌嗚タ浜氭媺', time: 55 },
      { type: 'goal', team: 'home', player: '钀ㄥ唴', time: 78 }
    ]
  },
  {
    id: 'match-5',
    home: 'juventus',
    away: 'inter',
    homeScore: 1,
    awayScore: 1,
    status: 'upcoming',
    startTime: new Date(Date.now() + 3600000 * 5).toISOString(),
    league: 'serie-a',
    events: []
  },
  {
    id: 'match-6',
    home: 'psg',
    away: 'marseille',
    homeScore: 4,
    awayScore: 0,
    status: 'finished',
    startTime: new Date(Date.now() - 10800000).toISOString(),
    league: 'ligue-1',
    events: [
      { type: 'goal', team: 'home', player: '濮嗗反浣?, time: 8 },
      { type: 'goal', team: 'home', player: '濮嗗反浣?, time: 22 },
      { type: 'goal', team: 'home', player: '鐧昏礉鑾?, time: 56 },
      { type: 'goal', team: 'home', player: '闃挎．瑗垮ゥ', time: 71 }
    ]
  },
  {
    id: 'match-7',
    home: 'shanghai',
    away: 'beijing',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    startTime: new Date(Date.now() + 3600000 * 24).toISOString(),
    league: 'csl',
    events: []
  },
  {
    id: 'match-8',
    home: 'chelsea',
    away: 'tottenham',
    homeScore: 1,
    awayScore: 2,
    status: 'live',
    currentTime: 89,
    startTime: new Date(Date.now() - 89 * 60000).toISOString(),
    league: 'premier-league',
    events: [
      { type: 'goal', team: 'home', player: '鏂壒鏋?, time: 15 },
      { type: 'goal', team: 'away', player: '瀛欏叴鎱?, time: 38 },
      { type: 'goal', team: 'away', player: '瀛欏叴鎱?, time: 82 }
    ]
  }
];

const POSTS = [
  {
    id: 'post-1',
    title: '鏇煎競寰锋瘮涓婃紨杩涚悆澶ф垬锛佽繖鍦烘瘮璧涗綘鎬庝箞鐪嬶紵',
    content: '鍒氬垰缁撴潫鐨勬浖褰绘柉鐗瑰痉姣旓紝鏇艰仈涓诲満2-2鎴樺钩鍒╃墿娴︼紝鍦洪潰闈炲父婵€鐑堛€侭璐广€佸姞绾充箶涓烘浖鑱旇繘鐞冿紝钀ㄦ媺璧拰鍔秴鏂负鍒╃墿娴︽壋骞炽€俓n\n杩欏満姣旇禌灞曠幇浜嗚嫳瓒呯殑婵€鐑堢珵浜夛紝鍙屾柟閮芥湁涓嶉敊鐨勫緱鍒嗘満浼氥€備綔涓虹悆杩凤紝浣犱滑瑙夊緱璋佺殑琛ㄧ幇鏇村嚭鑹诧紵',
    author: '瓒崇悆鑰佸徃鏈?,
    avatar: 'LS',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    likes: 156,
    tags: ['鑻辫秴', '鏇煎競寰锋瘮', '鐑棬'],
    replies: [
      { id: 'reply-1', author: '绾㈤瓟鐞冭糠', content: 'B璐硅繖鍦烘瘮璧涚‘瀹炶涪寰椾笉閿欙紝鍒涢€犱簡寰堝鏈轰細', createdAt: new Date(Date.now() - 1200000).toISOString() },
      { id: 'reply-2', author: 'kop鐪嬪彴', content: '钀ㄦ媺璧繕鏄偅涓惃鎷夎但锛佸鍦鸿兘鎷夸竴鍒嗗凡缁忓緢婊℃剰浜?, createdAt: new Date(Date.now() - 900000).toISOString() }
    ]
  },
  {
    id: 'post-2',
    title: '闃挎．绾?-0棰嗗厛鏇煎煄锛岃惃鍗″缓鍔燂紒鏋墜鑳藉畧浣忎紭鍔垮悧锛?,
    content: '闃挎．绾充富鍦哄闃垫浖鍩庯紝涓婂崐鍦鸿惃鍗＄牬闂ㄥ府鍔╂灙鎵?-0棰嗗厛銆傝繖鏄嫳瓒呭啝鍐涗簤澶虹殑鍏抽敭鎴樺焦锛屽鏋滈樋妫撼鑳借耽涓嬭繖鍦烘瘮璧涳紝绉垎姒滀笂灏嗚繘涓€姝ユ媺寮€宸窛銆俓n\n涓嬪崐鍦烘浖鍩庤偗瀹氫細鍔犲己杩涙敾锛屼綘浠寰楅樋妫撼鑳藉畧浣忓悧锛?,
    author: '鏋墜姝诲繝',
    avatar: 'GS',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    likes: 89,
    tags: ['鑻辫秴', '闃挎．绾?, '鏇煎煄'],
    replies: [
      { id: 'reply-3', author: '鎴樻湳鍒嗘瀽甯?, content: '闃挎．绾崇殑涓満鎷︽埅鍋氬緱寰堝ソ锛屾浖鍩庡緢闅剧粍缁囨湁鏁堣繘鏀?, createdAt: new Date(Date.now() - 3000000).toISOString() }
    ]
  },
  {
    id: 'post-3',
    title: '鐨囬┈vs宸磋惃浠婃櫄寮€鎵擄紝璋佽兘绗戝埌鏈€鍚庯紵',
    content: '瑗跨彮鐗欏浗瀹跺痉姣斿嵆灏嗕笂婕旓紒鐨囬┈涓诲満杩庢垬宸磋惃锛屼袱闃熺洰鍓嶇Н鍒嗘涓婄珵浜夋縺鐑堛€傝繖鍦烘瘮璧涚殑缁撴灉灏嗙洿鎺ュ奖鍝嶈タ鐢插啝鍐涘綊灞炪€俓n\n浣犱滑鏇寸湅濂藉摢鏀悆闃燂紵鐨囬┈鐨勭淮灏间慨鏂繕鏄反钀ㄧ殑鑾变竾锛岃皝浼氭槸鍐冲畾姣旇禌鐨勫叧閿悆鍛橈紵',
    author: '瑗跨敳瑙傚療鍛?,
    avatar: 'XB',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    likes: 234,
    tags: ['瑗跨敳', '鍥藉寰锋瘮', '鐨囬┈', '宸磋惃'],
    replies: [
      { id: 'reply-4', author: '缇庡噷鏍?, content: '鐨囬┈鐨勪富鍦轰紭鍔挎槑鏄撅紝鍔犱笂瀹夊垏娲涜拏鐨勬垬鏈紝鎴戠湅濂界殗椹?-1鍙栬儨', createdAt: new Date(Date.now() - 6600000).toISOString() },
      { id: 'reply-5', author: '宸磋惃閾佺矇', content: '鍒繕浜嗗反钀ㄦ渶杩戠殑瀹㈠満鎴樼哗寰堝嚭鑹诧紝骞冲眬搴旇鏄悎鐞嗙殑缁撴灉', createdAt: new Date(Date.now() - 6000000).toISOString() }
    ]
  },
  {
    id: 'post-4',
    title: '濮嗗反浣╁ぇ鍥涘枩锛佸反榛庢í鎵┈璧?,
    content: '娉曠敳鐒︾偣鎴橈紝宸撮粠鍦ｆ棩鑰虫浖涓诲満4-0澶ц儨椹禌锛屽宸翠僵涓€浜虹嫭涓洓鍏冿紒杩欏満姣旇禌瀹屽叏灞曠ず浜嗗反榛庣殑鏀诲嚮鐏姏锛屽宸翠僵鐨勭姸鎬佺畝鐩寸儹寰楀彂鐑€俓n\n鍦ㄨ禌瀛ｅ嵆灏嗙粨鏉熺殑鍏抽敭鏃跺埢锛屽宸翠僵鑳藉惁甯﹂宸撮粠澶哄緱鑱旇禌鍐犲啗锛?,
    author: '娉曠敳鎯呮姤绔?,
    avatar: 'FB',
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    likes: 178,
    tags: ['娉曠敳', '濮嗗反浣?, '宸撮粠'],
    replies: []
  },
  {
    id: 'post-5',
    title: '鍑仼杩涚悆鍔╂嫓浠佸嚮璐ュ鐗硅挋寰?,
    content: '寰风敳鍥藉寰锋瘮锛屾嫓浠佹厱灏奸粦涓诲満3-1鎴樿儨澶氱壒钂欏痉銆傚嚡鎭╁湪绗?2鍒嗛挓棣栧紑绾綍锛屾渶缁堝府鍔╃悆闃熸嬁涓嬭繖鍦哄叧閿儨鍒┿€傛褰硅繃鍚庯紝鎷滀粊缁х画棰嗚窇寰风敳绉垎姒溿€俓n\n鍑仼鍔犵洘鍚庣殑棣栦釜璧涘琛ㄧ幇濡備綍锛熶綘浠粰杩欎綅鑻辨牸鍏板皠鎵嬫墦鍑犲垎锛?,
    author: '寰风敳閭ｄ簺浜?,
    avatar: 'DB',
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    likes: 145,
    tags: ['寰风敳', '鎷滀粊', '鍑仼'],
    replies:[
      { id: 'reply-6', author: '鍗楀ぇ鐜嬬悆杩?, content: '鍑仼缁濆鏄嫓浠佽繖浜涘勾鏈€鎴愬姛鐨勫紩鎻达紝杩涚悆鏁堢巼澶亹鎬栦簡', createdAt: new Date(Date.now() - 13800000).toISOString() }
    ]
  },
  {
    id: 'post-6',
    title: '鍒囧皵瑗縱s鐑埡锛氬瓩鍏存厹姊呭紑浜屽害鍔╃儹鍒哄鍦哄彇鑳?,
    content: '鑻辫秴浼︽暒寰锋瘮锛岀儹鍒哄鍦?-1鎴樿儨鍒囧皵瑗裤€傚瓩鍏存厹涓婁笅鍗婂満鍚勫叆涓€鐞冿紝瀹屾垚姊呭紑浜屽害锛佺儹鍒哄湪杩欏満鑳滃埄鍚庣户缁ǔ灞呰仈璧涘墠鍥涖€俓n\n娉㈡柉鐗圭鏍奸瞾鐨勬垬鏈綋绯昏鐑埡鐒曠劧涓€鏂帮紝浣犱滑瑙夊緱鐑埡浠婂勾鑳芥嬁鍒版鍐犺祫鏍煎悧锛?,
    author: '浼︽暒瓒崇悆鍦?,
    avatar: 'LF',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    likes: 98,
    tags: ['鑻辫秴', '鐑埡', '瀛欏叴鎱?],
    replies: [
      { id: 'reply-7', author: '鐑埡鐞冭糠', content: '瀛欏叴鎱滅殑琛ㄧ幇澶ǔ瀹氫簡锛屽笇鏈涗粬缁х画淇濇寔鍋ュ悍', createdAt: new Date(Date.now() - 1200000).toISOString() }
    ]
  }
];

// 瀵煎嚭鏁版嵁
const mockData = {
  leagues: LEAGUES,
  teams: TEAMS,
  matches: MATCHES,
  posts: POSTS
};