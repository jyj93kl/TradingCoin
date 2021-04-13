const requestUrl = {
    upbitSocket : "wss://api.upbit.com/websocket/v1",
    holdAssets : "https://api.upbit.com/v1/accounts",
    orders : "https://api.upbit.com/v1/orders",
    order : "https://api.upbit.com/v1/order",
    orderChance : "https://api.upbit.com/v1/order/chance",
    marketAll : "https://api.upbit.com/v1/market/all",
    ticker : "https://api.upbit.com/v1/ticker?markets=",
}


const market = [
    {"market_warning":"NONE","market":"KRW-STORJ","korean_name":"스토리지","english_name":"Storj"},
    {"market_warning":"NONE","market":"KRW-DMT","korean_name":"디마켓","english_name":"DMarket"},
    {"market_warning":"NONE","market":"KRW-CHZ","korean_name":"칠리즈","english_name":"Chiliz"},
    {"market_warning":"NONE","market":"KRW-PLA","korean_name":"플레이댑","english_name":"PlayDapp"},
    {"market_warning":"NONE","market":"KRW-OMG","korean_name":"오미세고","english_name":"OmiseGo"},
    {"market_warning":"NONE","market":"KRW-TRX","korean_name":"트론","english_name":"TRON"},
    {"market_warning":"NONE","market":"KRW-BORA","korean_name":"보라","english_name":"BORA"},
    {"market_warning":"NONE","market":"KRW-PCI","korean_name":"페이코인","english_name":"PayCoin"},
    {"market_warning":"NONE","market":"KRW-PUNDIX","korean_name":"펀디엑스","english_name":"Pundi X"},
    {"market_warning":"NONE","market":"KRW-TT","korean_name":"썬더토큰","english_name":"Thunder Token"}
    // {"market_warning":"NONE","market":"KRW-DOGE","korean_name":"도지코인","english_name":"Dogecoin"}
]

const buyPrice = 6000;
const highPercent = 10;
const lowPercent = -5;
const marketBuy = 0;
const marketSell = 1;
const enter = "\n";
// const market = [
// 	{"market_warning":"NONE","market":"KRW-BTC","korean_name":"비트코인","english_name":"Bitcoin"},
// 	{"market_warning":"NONE","market":"KRW-ETH","korean_name":"이더리움","english_name":"Ethereum"},
// 	{"market_warning":"NONE","market":"BTC-ETH","korean_name":"이더리움","english_name":"Ethereum"},
// 	{"market_warning":"NONE","market":"BTC-LTC","korean_name":"라이트코인","english_name":"Litecoin"},
// 	{"market_warning":"NONE","market":"BTC-XRP","korean_name":"리플","english_name":"Ripple"},
// 	{"market_warning":"NONE","market":"BTC-ETC","korean_name":"이더리움클래식","english_name":"Ethereum Classic"},
// 	{"market_warning":"NONE","market":"BTC-OMG","korean_name":"오미세고","english_name":"OmiseGo"},
// 	{"market_warning":"NONE","market":"BTC-CVC","korean_name":"시빅","english_name":"Civic"},
// 	{"market_warning":"NONE","market":"BTC-DGB","korean_name":"디지바이트","english_name":"DigiByte"},
// 	{"market_warning":"NONE","market":"BTC-SC","korean_name":"시아코인","english_name":"Siacoin"},
// 	{"market_warning":"NONE","market":"BTC-SNT","korean_name":"스테이터스네트워크토큰","english_name":"Status Network Token"},
// 	{"market_warning":"NONE","market":"BTC-WAVES","korean_name":"웨이브","english_name":"Waves"},
// 	{"market_warning":"NONE","market":"BTC-NMR","korean_name":"뉴메레르","english_name":"Numeraire"},
// 	{"market_warning":"NONE","market":"BTC-XEM","korean_name":"넴","english_name":"NEM"},
// 	{"market_warning":"NONE","market":"BTC-LBC","korean_name":"엘비알와이크레딧","english_name":"LBRY Credits"},
// 	{"market_warning":"NONE","market":"BTC-QTUM","korean_name":"퀀텀","english_name":"Qtum"},
// 	{"market_warning":"NONE","market":"BTC-NXT","korean_name":"엔엑스티","english_name":"Nxt"},
// 	{"market_warning":"NONE","market":"BTC-BAT","korean_name":"베이직어텐션토큰","english_name":"Basic Attention Token"},
// 	{"market_warning":"NONE","market":"BTC-LSK","korean_name":"리스크","english_name":"Lisk"},
// 	{"market_warning":"NONE","market":"BTC-RDD","korean_name":"레드코인","english_name":"ReddCoin"},
// 	{"market_warning":"NONE","market":"BTC-STEEM","korean_name":"스팀","english_name":"Steem"},
// 	{"market_warning":"NONE","market":"BTC-DOGE","korean_name":"도지코인","english_name":"Dogecoin"},
// 	{"market_warning":"NONE","market":"BTC-BNT","korean_name":"뱅코르","english_name":"Bancor"},
// 	{"market_warning":"NONE","market":"BTC-XLM","korean_name":"스텔라루멘","english_name":"Lumen"},
// 	{"market_warning":"NONE","market":"BTC-ARDR","korean_name":"아더","english_name":"Ardor"},
// 	{"market_warning":"NONE","market":"BTC-KMD","korean_name":"코모도","english_name":"Komodo"},
// 	{"market_warning":"NONE","market":"BTC-ARK","korean_name":"아크","english_name":"Ark"},
// 	{"market_warning":"NONE","market":"BTC-ADX","korean_name":"애드엑스","english_name":"AdEx"},
// 	{"market_warning":"NONE","market":"BTC-SYS","korean_name":"시스코인","english_name":"SysCoin"},
// 	{"market_warning":"NONE","market":"BTC-ANT","korean_name":"아라곤","english_name":"Aragon"},
// 	{"market_warning":"NONE","market":"BTC-STORJ","korean_name":"스토리지","english_name":"Storj"},
// 	{"market_warning":"NONE","market":"BTC-GRS","korean_name":"그로스톨코인","english_name":"Groestlcoin"},
// 	{"market_warning":"NONE","market":"BTC-REP","korean_name":"어거","english_name":"Augur"},
// 	{"market_warning":"NONE","market":"BTC-RLC","korean_name":"아이젝","english_name":"iEx.ec"},
// 	{"market_warning":"NONE","market":"BTC-EMC2","korean_name":"아인스타이늄","english_name":"Einsteinium"},
// 	{"market_warning":"NONE","market":"USDT-BTC","korean_name":"비트코인","english_name":"Bitcoin"},
// 	{"market_warning":"NONE","market":"USDT-ETH","korean_name":"이더리움","english_name":"Ethereum"},
// 	{"market_warning":"NONE","market":"USDT-LTC","korean_name":"라이트코인","english_name":"Litecoin"},
// 	{"market_warning":"NONE","market":"USDT-XRP","korean_name":"리플","english_name":"Ripple"},
// 	{"market_warning":"NONE","market":"USDT-ETC","korean_name":"이더리움클래식","english_name":"Ethereum Classic"},
// 	{"market_warning":"NONE","market":"KRW-NEO","korean_name":"네오","english_name":"NEO"},
// 	{"market_warning":"NONE","market":"KRW-MTL","korean_name":"메탈","english_name":"Metal"},
// 	{"market_warning":"NONE","market":"KRW-LTC","korean_name":"라이트코인","english_name":"Litecoin"},
// 	{"market_warning":"NONE","market":"KRW-XRP","korean_name":"리플","english_name":"Ripple"},
// 	{"market_warning":"NONE","market":"KRW-ETC","korean_name":"이더리움클래식","english_name":"Ethereum Classic"},
// 	{"market_warning":"NONE","market":"KRW-OMG","korean_name":"오미세고","english_name":"OmiseGo"},
// 	{"market_warning":"NONE","market":"KRW-SNT","korean_name":"스테이터스네트워크토큰","english_name":"Status Network Token"},
// 	{"market_warning":"NONE","market":"KRW-WAVES","korean_name":"웨이브","english_name":"Waves"},
// 	{"market_warning":"NONE","market":"KRW-XEM","korean_name":"넴","english_name":"NEM"},
// 	{"market_warning":"NONE","market":"KRW-QTUM","korean_name":"퀀텀","english_name":"Qtum"},
// 	{"market_warning":"NONE","market":"KRW-LSK","korean_name":"리스크","english_name":"Lisk"},
// 	{"market_warning":"NONE","market":"KRW-STEEM","korean_name":"스팀","english_name":"Steem"},
// 	{"market_warning":"NONE","market":"KRW-XLM","korean_name":"스텔라루멘","english_name":"Lumen"},
// 	{"market_warning":"NONE","market":"KRW-ARDR","korean_name":"아더","english_name":"Ardor"},
// 	{"market_warning":"NONE","market":"KRW-KMD","korean_name":"코모도","english_name":"Komodo"},
// 	{"market_warning":"NONE","market":"KRW-ARK","korean_name":"아크","english_name":"Ark"},
// 	{"market_warning":"NONE","market":"KRW-STORJ","korean_name":"스토리지","english_name":"Storj"},
// 	{"market_warning":"NONE","market":"KRW-GRS","korean_name":"그로스톨코인","english_name":"Groestlcoin"},
// 	{"market_warning":"NONE","market":"KRW-REP","korean_name":"어거","english_name":"Augur"},
// 	{"market_warning":"NONE","market":"KRW-EMC2","korean_name":"아인스타이 늄","english_name":"Einsteinium"},
// 	{"market_warning":"NONE","market":"KRW-ADA","korean_name":"에이다","english_name":"Ada"},
// 	{"market_warning":"NONE","market":"BTC-ADA","korean_name":"에이다","english_name":"Ada"},
// 	{"market_warning":"NONE","market":"BTC-MANA","korean_name":"디센트럴랜드","english_name":"Decentraland"},
// 	{"market_warning":"NONE","market":"USDT-OMG","korean_name":"오미세고","english_name":"OmiseGo"},
// 	{"market_warning":"NONE","market":"KRW-SBD","korean_name":"스팀달러","english_name":"SteemDollars"},
// 	{"market_warning":"NONE","market":"BTC-SBD","korean_name":"스팀달러","english_name":"SteemDollars"},
// 	{"market_warning":"NONE","market":"BTC-RCN","korean_name":"리피오크레딧네트워크","english_name":"Ripio Credit Network"},
// 	{"market_warning":"NONE","market":"KRW-POWR","korean_name":"파워렛저","english_name":"Power ledger"},
// 	{"market_warning":"NONE","market":"BTC-POWR","korean_name":"파워렛저","english_name":"Power ledger"},
// 	{"market_warning":"NONE","market":"KRW-BTG","korean_name":"비트코인골드","english_name":"Bitcoin Gold"},
// 	{"market_warning":"NONE","market":"USDT-ADA","korean_name":"에이다","english_name":"Ada"},
// 	{"market_warning":"NONE","market":"BTC-DNT","korean_name":"디스트릭트0x","english_name":"district0x"},
// 	{"market_warning":"NONE","market":"BTC-IGNIS","korean_name":"이그니스","english_name":"Ignis"},
// 	{"market_warning":"NONE","market":"BTC-ZRX","korean_name":"제로엑스","english_name":"0x Protocol"},
// 	{"market_warning":"NONE","market":"BTC-TRX","korean_name":"트론","english_name":"TRON"},
// 	{"market_warning":"NONE","market":"BTC-TUSD","korean_name":"트루USD","english_name":"TrueUSD"},
// 	{"market_warning":"NONE","market":"BTC-LRC","korean_name":"루프링","english_name":"Loopring"},
// 	{"market_warning":"NONE","market":"KRW-ICX","korean_name":"아이콘","english_name":"Icon"},
// 	{"market_warning":"NONE","market":"KRW-EOS","korean_name":"이오스","english_name":"EOS"},
// 	{"market_warning":"NONE","market":"BTC-DMT","korean_name":"디마켓","english_name":"DMarket"},
// 	{"market_warning":"NONE","market":"USDT-TUSD","korean_name":"트루USD","english_name":"TrueUSD"},
// 	{"market_warning":"NONE","market":"KRW-TRX","korean_name":"트론","english_name":"TRON"},
// 	{"market_warning":"NONE","market":"BTC-POLY","korean_name":"폴리매쓰","english_name":"Polymath"},
// 	{"market_warning":"NONE","market":"BTC-PRO","korean_name":"프로피","english_name":"Propy"},
// 	{"market_warning":"NONE","market":"USDT-SC","korean_name":"시아코인","english_name":"Siacoin"},
// 	{"market_warning":"NONE","market":"USDT-TRX","korean_name":"트론","english_name":"TRON"},
// 	{"market_warning":"NONE","market":"KRW-SC","korean_name":"시아코인","english_name":"Siacoin"},
// 	{"market_warning":"NONE","market":"KRW-IGNIS","korean_name":"이그니스","english_name":"Ignis"},
// 	{"market_warning":"NONE","market":"KRW-ONT","korean_name":"온톨로지","english_name":"Ontology"},
// 	{"market_warning":"NONE","market":"KRW-ZIL","korean_name":"질리카","english_name":"Zilliqa"},
// 	{"market_warning":"NONE","market":"KRW-POLY","korean_name":"폴리매쓰","english_name":"Polymath"},
// 	{"market_warning":"NONE","market":"KRW-ZRX","korean_name":"제로엑스","english_name":"0x Protocol"},
// 	{"market_warning":"NONE","market":"KRW-LOOM","korean_name":"룸네트워크","english_name":"Loom Network"},
// 	{"market_warning":"NONE","market":"BTC-BCH","korean_name":"비트코인캐시","english_name":"Bitcoin Cash"},
// 	{"market_warning":"NONE","market":"USDT-BCH","korean_name":"비트코인캐시","english_name":"Bitcoin Cash"},
// 	{"market_warning":"NONE","market":"KRW-BCH","korean_name":"비트코인캐시","english_name":"Bitcoin Cash"},
// 	{"market_warning":"NONE","market":"BTC-MFT","korean_name":"메인프레임","english_name":"Mainframe"},
// 	{"market_warning":"NONE","market":"BTC-LOOM","korean_name":" 룸네트워크","english_name":"Loom Network"},
// 	{"market_warning":"NONE","market":"KRW-ADX","korean_name":"애드엑스","english_name":"AdEx"},
// 	{"market_warning":"NONE","market":"KRW-BAT","korean_name":"베이직어텐션토큰","english_name":"Basic Attention Token"},
// 	{"market_warning":"NONE","market":"KRW-IOST","korean_name":"아이오에스티","english_name":"IOST"},
// 	{"market_warning":"NONE","market":"BTC-RFR","korean_name":"리퍼리움","english_name":"Refereum"},
// 	{"market_warning":"NONE","market":"KRW-DMT","korean_name":"디마켓","english_name":"DMarket"},
// 	{"market_warning":"NONE","market":"KRW-RFR","korean_name":"리퍼리움","english_name":"Refereum"},
// 	{"market_warning":"NONE","market":"USDT-DGB","korean_name":"디지바이트","english_name":"DigiByte"},
// 	{"market_warning":"NONE","market":"KRW-CVC","korean_name":"시빅","english_name":"Civic"},
// 	{"market_warning":"NONE","market":"KRW-IQ","korean_name":"에브리피디아","english_name":"Everipedia"},
// 	{"market_warning":"NONE","market":"KRW-IOTA","korean_name":"아이오타","english_name":"IOTA"},
// 	{"market_warning":"NONE","market":"BTC-RVN","korean_name":"레이븐코인","english_name":"Ravencoin"},
// 	{"market_warning":"NONE","market":"BTC-BFT","korean_name":"비에프토큰","english_name":"BnkToTheFuture"},
// 	{"market_warning":"NONE","market":"BTC-GO","korean_name":"고체인","english_name":"GoChain"},
// 	{"market_warning":"NONE","market":"BTC-UPP","korean_name":"센티넬프로토콜","english_name":"Sentinel Protocol"},
// 	{"market_warning":"NONE","market":"BTC-ENJ","korean_name":"엔진코인","english_name":"Enjin"},
// 	{"market_warning":"NONE","market":"KRW-MFT","korean_name":"메인프레임","english_name":"Mainframe"},
// 	{"market_warning":"NONE","market":"BTC-EDR","korean_name":"엔도르","english_name":"Endor"},
// 	{"market_warning":"NONE","market":"KRW-ONG","korean_name":"온톨로지가스","english_name":"ONG"},
// 	{"market_warning":"NONE","market":"KRW-GAS","korean_name":"가스","english_name":"GAS"},
// 	{"market_warning":"NONE","market":"BTC-MTL","korean_name":"메탈","english_name":"Metal"},
// 	{"market_warning":"NONE","market":"KRW-UPP","korean_name":"센티넬프로토콜","english_name":"Sentinel Protocol"},
// 	{"market_warning":"NONE","market":"KRW-ELF","korean_name":"엘프","english_name":"aelf"},
// 	{"market_warning":"NONE","market":"USDT-DOGE","korean_name":"도지코인","english_name":"Dogecoin"},
// 	{"market_warning":"NONE","market":"USDT-ZRX","korean_name":"제로엑스","english_name":"0x Protocol"},
// 	{"market_warning":"NONE","market":"USDT-RVN","korean_name":"레이븐코인","english_name":"Ravencoin"},
// 	{"market_warning":"NONE","market":"USDT-BAT","korean_name":"베이직어텐션토큰","english_name":"Basic Attention Token"},
// 	{"market_warning":"NONE","market":"KRW-KNC","korean_name":"카이버네트워크","english_name":"Kyber Network"},
// 	{"market_warning":"NONE","market":"BTC-PAX","korean_name":"팩 소스스탠다드","english_name":"Paxos Standard"},
// 	{"market_warning":"NONE","market":"BTC-MOC","korean_name":"모스코인","english_name":"Moss Coin"},
// 	{"market_warning":"NONE","market":"BTC-ZIL","korean_name":"질리카","english_name":"Zilliqa"},
// 	{"market_warning":"NONE","market":"KRW-BSV","korean_name":"비트코인에스브이","english_name":"Bitcoin SV"},
// 	{"market_warning":"NONE","market":"BTC-BSV","korean_name":"비트코인에스브이","english_name":"Bitcoin SV"},
// 	{"market_warning":"NONE","market":"BTC-IOST","korean_name":"아이오에스티","english_name":"IOST"},
// 	{"market_warning":"NONE","market":"KRW-THETA","korean_name":"쎄타토큰","english_name":"Theta Token"},
// 	{"market_warning":"NONE","market":"BTC-NCASH","korean_name":"뉴클리어스비전","english_name":"Nucleus Vision"},
// 	{"market_warning":"NONE","market":"KRW-EDR","korean_name":"엔도르","english_name":"Endor"},
// 	{"market_warning":"NONE","market":"BTC-DENT","korean_name":"덴트","english_name":"Dent"},
// 	{"market_warning":"NONE","market":"KRW-QKC","korean_name":"쿼크체인","english_name":"QuarkChain"},
// 	{"market_warning":"NONE","market":"BTC-ELF","korean_name":"엘프","english_name":"aelf"},
// 	{"market_warning":"NONE","market":"KRW-BTT","korean_name":"비트토렌트","english_name":"BitTorrent"},
// 	{"market_warning":"NONE","market":"BTC-BTT","korean_name":"비트토렌트","english_name":"BitTorrent"},
// 	{"market_warning":"NONE","market":"BTC-VITE","korean_name":"비트토큰","english_name":"Vite"},
// 	{"market_warning":"NONE","market":"BTC-IOTX","korean_name":"아이오텍스","english_name":"IoTeX"},
// 	{"market_warning":"NONE","market":"BTC-SOLVE","korean_name":"솔브케어","english_name":"Solve.Care"},
// 	{"market_warning":"NONE","market":"BTC-NKN","korean_name":"엔케이엔","english_name":"NKN"},
// 	{"market_warning":"NONE","market":"BTC-META","korean_name":"메타디움","english_name":"Metadium"},
// 	{"market_warning":"NONE","market":"KRW-MOC","korean_name":"모스코인","english_name":"Moss Coin"},
// 	{"market_warning":"NONE","market":"BTC-ANKR","korean_name":"앵커","english_name":"Ankr"},
// 	{"market_warning":"NONE","market":"BTC-CRO","korean_name":"크립토닷컴체인","english_name":"Crypto.com Chain"},
// 	{"market_warning":"NONE","market":"KRW-ENJ","korean_name":"엔진코인","english_name":"Enjin"},
// 	{"market_warning":"NONE","market":"KRW-TFUEL","korean_name":"쎄타퓨엘","english_name":"Theta Fuel"},
// 	{"market_warning":"NONE","market":"BTC-FSN","korean_name":"퓨전","english_name":"Fusion"},
// 	{"market_warning":"NONE","market":"KRW-MANA","korean_name":"디센트럴랜드","english_name":"Decentraland"},
// 	{"market_warning":"NONE","market":"KRW-ANKR","korean_name":"앵커","english_name":"Ankr"},
// 	{"market_warning":"NONE","market":"BTC-ORBS","korean_name":"오브스","english_name":"Orbs"},
// 	{"market_warning":"NONE","market":"BTC-AERGO","korean_name":"아르고","english_name":"Aergo"},
// 	{"market_warning":"NONE","market":"BTC-PI","korean_name":"플리안","english_name":"Plian"},
// 	{"market_warning":"NONE","market":"KRW-AERGO","korean_name":"아르고","english_name":"Aergo"},
// 	{"market_warning":"NONE","market":"KRW-ATOM","korean_name":"코스모스","english_name":"Cosmos"},
// 	{"market_warning":"NONE","market":"KRW-TT","korean_name":"썬더토큰","english_name":"Thunder Token"},
// 	{"market_warning":"NONE","market":"KRW-CRE","korean_name":"캐리프로토콜","english_name":"Carry Protocol"},
// 	{"market_warning":"NONE","market":"KRW-SOLVE","korean_name":"솔브케어","english_name":"Solve.Care"},
// 	{"market_warning":"NONE","market":"BTC-ATOM","korean_name":"코스모스","english_name":"Cosmos"},
// 	{"market_warning":"NONE","market":"BTC-STPT","korean_name":"에스티피","english_name":"Standard Tokenization Protocol"},
// 	{"market_warning":"NONE","market":"KRW-MBL","korean_name":"무비블록","english_name":"MovieBloc"},
// 	{"market_warning":"NONE","market":"BTC-LAMB","korean_name":"람다","english_name":"Lambda"},
// 	{"market_warning":"NONE","market":"BTC-EOS","korean_name":"이오스","english_name":"EOS"},
// 	{"market_warning":"NONE","market":"BTC-LUNA","korean_name":"루나","english_name":"Luna"},
// 	{"market_warning":"NONE","market":"BTC-DAI","korean_name":"다이","english_name":"Dai"},
// 	{"market_warning":"NONE","market":"BTC-MKR","korean_name":"메이커","english_name":"Maker"},
// 	{"market_warning":"NONE","market":"BTC-BORA","korean_name":"보라","english_name":"BORA"},
// 	{"market_warning":"NONE","market":"KRW-TSHP","korean_name":"트웰브쉽스","english_name":"12SHIPS"},
// 	{"market_warning":"NONE","market":"BTC-TSHP","korean_name":"트웰브쉽스","english_name":"12SHIPS"},
// 	{"market_warning":"NONE","market":"KRW-WAXP","korean_name":"왁스","english_name":"WAX"},
// 	{"market_warning":"NONE","market":"BTC-WAXP","korean_name":"왁스","english_name":"WAX"},
// 	{"market_warning":"NONE","market":"KRW-HBAR","korean_name":"헤데라해시그래프","english_name":"Hedera Hashgraph"},
// 	{"market_warning":"NONE","market":"KRW-MED","korean_name":"메디블록","english_name":"MediBloc"},
// 	{"market_warning":"NONE","market":"BTC-MED","korean_name":"메디블록","english_name":"MediBloc"},
// 	{"market_warning":"NONE","market":"BTC-MLK","korean_name":"밀크","english_name":"MiL.k"},
// 	{"market_warning":"NONE","market":"KRW-MLK","korean_name":"밀크","english_name":"MiL.k"},
// 	{"market_warning":"NONE","market":"BTC-PXL","korean_name":"픽셀","english_name":"PIXEL"},
// 	{"market_warning":"NONE","market":"KRW-STPT","korean_name":"에스티피","english_name":"Standard Tokenization Protocol"},
// 	{"market_warning":"NONE","market":"BTC-VET","korean_name":"비체인","english_name":"VeChain"},
// 	{"market_warning":"NONE","market":"KRW-ORBS","korean_name":"오브스","english_name":"Orbs"},
// 	{"market_warning":"NONE","market":"BTC-CHZ","korean_name":"칠리즈","english_name":"Chiliz"},
// 	{"market_warning":"NONE","market":"KRW-VET","korean_name":"비체인","english_name":"VeChain"},
// 	{"market_warning":"NONE","market":"BTC-FX","korean_name":"펑션엑스","english_name":"Function X"},
// 	{"market_warning":"NONE","market":"BTC-OGN","korean_name":"오리진프로토콜","english_name":"Origin Protocol"},
// 	{"market_warning":"NONE","market":"KRW-CHZ","korean_name":"칠리즈","english_name":"Chiliz"},
// 	{"market_warning":"NONE","market":"KRW-PXL","korean_name":"픽셀","english_name":"PIXEL"},
// 	{"market_warning":"NONE","market":"BTC-ITAM","korean_name":"아이텀게임즈","english_name":"Itam Games"},
// 	{"market_warning":"NONE","market":"BTC-XTZ","korean_name":"테조스","english_name":"Tezos"},
// 	{"market_warning":"NONE","market":"BTC-HIVE","korean_name":"하이브","english_name":"Hive"},
// 	{"market_warning":"NONE","market":"BTC-HBD","korean_name":"하이브달러","english_name":"Hive Dollar"},
// 	{"market_warning":"NONE","market":"BTC-OBSR","korean_name":"옵저버","english_name":"Observer"},
// 	{"market_warning":"NONE","market":"BTC-DKA","korean_name":"디카르고","english_name":"dKargo"},
// 	{"market_warning":"NONE","market":"KRW-STMX","korean_name":"스톰엑스","english_name":"StormX"},
// 	{"market_warning":"NONE","market":"BTC-STMX","korean_name":"스톰엑스","english_name":"StormX"},
// 	{"market_warning":"NONE","market":"BTC-AHT","korean_name":"아하토큰","english_name":"AhaToken"},
// 	{"market_warning":"NONE","market":"BTC-PCI","korean_name":"페이코인","english_name":"PayCoin"},
// 	{"market_warning":"NONE","market":"BTC-RINGX","korean_name":"링엑스","english_name":"RINGX"},
// 	{"market_warning":"NONE","market":"KRW-DKA","korean_name":"디카르고","english_name":"dKargo"},
// 	{"market_warning":"NONE","market":"BTC-LINK","korean_name":"체인링크","english_name":"Chainlink"},
// 	{"market_warning":"NONE","market":"KRW-HIVE","korean_name":"하이브","english_name":"Hive"},
// 	{"market_warning":"NONE","market":"KRW-KAVA","korean_name":"카바","english_name":"Kava"},
// 	{"market_warning":"NONE","market":"BTC-KAVA","korean_name":"카바","english_name":"Kava"},
// 	{"market_warning":"NONE","market":"KRW-AHT","korean_name":"아하토큰","english_name":"AhaToken"},
// 	{"market_warning":"NONE","market":"KRW-LINK","korean_name":"체인링크","english_name":"Chainlink"},
// 	{"market_warning":"NONE","market":"KRW-XTZ","korean_name":"테조스","english_name":"Tezos"},
// 	{"market_warning":"NONE","market":"KRW-BORA","korean_name":"보라","english_name":"BORA"},
// 	{"market_warning":"NONE","market":"BTC-JST","korean_name":"저스트","english_name":"JUST"},
// 	{"market_warning":"NONE","market":"BTC-CHR","korean_name":"크로미아","english_name":"Chromia"},
// 	{"market_warning":"NONE","market":"BTC-DAD","korean_name":"다드","english_name":"DAD"},
// 	{"market_warning":"NONE","market":"BTC-TON","korean_name":"톤","english_name":"TON"},
// 	{"market_warning":"NONE","market":"KRW-JST","korean_name":"저스트","english_name":"JUST"},
// 	{"market_warning":"NONE","market":"BTC-CTSI","korean_name":"카르테시","english_name":"Cartesi"},
// 	{"market_warning":"NONE","market":"BTC-DOT","korean_name":"폴카닷","english_name":"Polkadot"},
// 	{"market_warning":"NONE","market":"KRW-CRO","korean_name":"크립토닷컴체인","english_name":"Crypto.com Chain"},
// 	{"market_warning":"NONE","market":"BTC-COMP","korean_name":"컴파운드","english_name":"Compound"},
// 	{"market_warning":"NONE","market":"BTC-SXP","korean_name":"스와이프","english_name":"Swipe"},
// 	{"market_warning":"NONE","market":"BTC-HUNT","korean_name":"헌트","english_name":"HUNT"},
// 	{"market_warning":"NONE","market":"KRW-TON","korean_name":"톤","english_name":"TON"},
// 	{"market_warning":"NONE","market":"BTC-ONIT","korean_name":"온버프","english_name":"ONBUFF"},
// 	{"market_warning":"NONE","market":"BTC-CRV","korean_name":"커브","english_name":"Curve"},
// 	{"market_warning":"NONE","market":"BTC-ALGO","korean_name":"알고랜드","english_name":"Algorand"},
// 	{"market_warning":"NONE","market":"BTC-RSR","korean_name":"리저브라이트","english_name":"Reserve Rights"},
// 	{"market_warning":"NONE","market":"KRW-SXP","korean_name":"스와이프","english_name":"Swipe"},
// 	{"market_warning":"NONE","market":"BTC-OXT","korean_name":"오키드","english_name":"Orchid"},
// 	{"market_warning":"NONE","market":"BTC-PLA","korean_name":"플레이댑","english_name":"PlayDapp"},
// 	{"market_warning":"NONE","market":"KRW-LAMB","korean_name":"람다","english_name":"Lambda"},
// 	{"market_warning":"NONE","market":"KRW-HUNT","korean_name":"헌트","english_name":"HUNT"},
// 	{"market_warning":"NONE","market":"BTC-MARO","korean_name":"마로","english_name":"Maro"},
// 	{"market_warning":"NONE","market":"KRW-MARO","korean_name":"마로","english_name":"Maro"},
// 	{"market_warning":"NONE","market":"BTC-SAND","korean_name":"샌드박스","english_name":"The Sandbox"},
// 	{"market_warning":"NONE","market":"BTC-SUN","korean_name":"썬","english_name":"SUN"},
// 	{"market_warning":"NONE","market":"KRW-PLA","korean_name":"플레이댑","english_name":"PlayDapp"},
// 	{"market_warning":"NONE","market":"KRW-DOT","korean_name":"폴카닷","english_name":"Polkadot"},
// 	{"market_warning":"NONE","market":"BTC-SRM","korean_name":"세럼","english_name":"Serum"},
// 	{"market_warning":"NONE","market":"BTC-QTCON","korean_name":"퀴즈톡","english_name":"Quiztok"},
// 	{"market_warning":"NONE","market":"BTC-MVL","korean_name":"엠블","english_name":"MVL"},
// 	{"market_warning":"NONE","market":"KRW-SRM","korean_name":"세럼","english_name":"Serum"},
// 	{"market_warning":"NONE","market":"KRW-MVL","korean_name":"엠블","english_name":"MVL"},
// 	{"market_warning":"NONE","market":"BTC-GXC","korean_name":"지엑스체인","english_name":"GXChain"},
// 	{"market_warning":"NONE","market":"KRW-PCI","korean_name":"페이코인","english_name":"PayCoin"},
// 	{"market_warning":"NONE","market":"BTC-AQT","korean_name":"알파쿼크","english_name":"Alpha Quark Token"},
// 	{"market_warning":"NONE","market":"BTC-AXS","korean_name":"엑시인피니티","english_name":"Axie Infinity"},
// 	{"market_warning":"NONE","market":"BTC-STRAX","korean_name":"스트라티스","english_name":"Stratis"},
// 	{"market_warning":"NONE","market":"KRW-STRAX","korean_name":"스트라티스","english_name":"Stratis"},
// 	{"market_warning":"NONE","market":"KRW-AQT","korean_name":"알파쿼크","english_name":"Alpha Quark Token"},
// 	{"market_warning":"NONE","market":"BTC-BCHA","korean_name":"비트코인캐시에이비씨","english_name":"Bitcoin Cash ABC"},
// 	{"market_warning":"NONE","market":"KRW-BCHA","korean_name":"비트코인캐시에이비씨","english_name":"Bitcoin Cash ABC"},
// 	{"market_warning":"NONE","market":"BTC-GLM","korean_name":"골렘","english_name":"Golem"},
// 	{"market_warning":"NONE","market":"KRW-GLM","korean_name":"골렘","english_name":"Golem"},
// 	{"market_warning":"NONE","market":"KRW-QTCON","korean_name":"퀴즈톡","english_name":"Quiztok"},
// 	{"market_warning":"NONE","market":"BTC-FCT2","korean_name":"피르마체인","english_name":"FirmaChain"},
// 	{"market_warning":"NONE","market":"BTC-SSX","korean_name":"썸씽","english_name":"SOMESING"},
// 	{"market_warning":"NONE","market":"KRW-SSX","korean_name":"썸씽","english_name":"SOMESING"},
// 	{"market_warning":"NONE","market":"KRW-META","korean_name":"메타디움","english_name":"Metadium"},
// 	{"market_warning":"NONE","market":"KRW-OBSR","korean_name":"옵저버","english_name":"Observer"},
// 	{"market_warning":"NONE","market":"KRW-FCT2","korean_name":"피르마체인","english_name":"FirmaChain"},
// 	{"market_warning":"NONE","market":"BTC-FIL","korean_name":"파일코인","english_name":"Filecoin"},
// 	{"market_warning":"NONE","market":"KRW-LBC","korean_name":"엘비알와이크레딧","english_name":"LBRY Credits"},
// 	{"market_warning":"NONE","market":"BTC-UNI","korean_name":"유니스왑","english_name":"Uniswap"},
// 	{"market_warning":"NONE","market":"BTC-BASIC","korean_name":"베이직","english_name":"Basic"},
// 	{"market_warning":"NONE","market":"BTC-INJ","korean_name":"인젝티브프로토콜","english_name":"Injective Protocol"},
// 	{"market_warning":"NONE","market":"BTC-PROM","korean_name":"프로메테우스","english_name":"Prometeus"},
// 	{"market_warning":"NONE","market":"BTC-VAL","korean_name":"밸리디티","english_name":"Validity"},
// 	{"market_warning":"NONE","market":"BTC-PSG","korean_name":"파리생제르맹","english_name":"Paris Saint-Germain Fan Token"},
// 	{"market_warning":"NONE","market":"BTC-JUV","korean_name":"유벤투스","english_name":"Juventus Fan Token"},
// 	{"market_warning":"NONE","market":"BTC-CBK","korean_name":"코박토큰","english_name":"Cobak Token"},
// 	{"market_warning":"NONE","market":"BTC-FOR","korean_name":"포튜브","english_name":"ForTube"},
// 	{"market_warning":"NONE","market":"KRW-CBK","korean_name":"코박토큰","english_name":"Cobak Token"},
// 	{"market_warning":"NONE","market":"BTC-BFC","korean_name":"바이프로스트","english_name":"Bifrost"},
// 	{"market_warning":"NONE","market":"BTC-LINA","korean_name":"리니어파이낸스","english_name":"Linear"},
// 	{"market_warning":"NONE","market":"BTC-HUM","korean_name":"휴먼스케이프","english_name":"Humanscape"},
// 	{"market_warning":"NONE","market":"BTC-PICA","korean_name":"피카","english_name":"Pica"},
// 	{"market_warning":"NONE","market":"BTC-CELO","korean_name":"셀로","english_name":"Celo"},
// 	{"market_warning":"NONE","market":"KRW-SAND","korean_name":"샌드박스","english_name":"The Sandbox"},
// 	{"market_warning":"NONE","market":"KRW-HUM","korean_name":"휴먼스케이프","english_name":"Humanscape"},
// 	{"market_warning":"NONE","market":"BTC-IQ","korean_name":"에브리피디아","english_name":"Everipedia"},
// 	{"market_warning":"NONE","market":"BTC-STX","korean_name":"스택스","english_name":"Stacks"},
// 	{"market_warning":"NONE","market":"KRW-DOGE","korean_name":"도지코인","english_name":"Dogecoin"},
// 	{"market_warning":"NONE","market":"BTC-NEAR","korean_name":"니어프로토콜","english_name":"NEAR Protocol"},
// 	{"market_warning":"NONE","market":"BTC-AUCTION","korean_name":"바운스토큰","english_name":"Bounce"},
// 	{"market_warning":"NONE","market":"BTC-DAWN","korean_name":"던프로토콜","english_name":"Dawn Protocol"},
// 	{"market_warning":"NONE","market":"BTC-FLOW","korean_name":"플로우","english_name":"Flow"},
// 	{"market_warning":"NONE","market":"BTC-STRK","korean_name":"스트라이크","english_name":"Strike"},
// 	{"market_warning":"NONE","market":"KRW-STRK","korean_name":"스트라이크","english_name":"Strike"},
// 	{"market_warning":"NONE","market":"BTC-PUNDIX","korean_name":"펀디엑스","english_name":"Pundi X"},
// 	{"market_warning":"NONE","market":"KRW-PUNDIX","korean_name":"펀디엑스","english_name":"Pundi X"},
// 	{"market_warning":"NONE","market":"KRW-FLOW","korean_name":"플로우","english_name":"Flow"},
// 	{"market_warning":"NONE","market":"KRW-DAWN","korean_name":"던프로토콜","english_name":"Dawn Protocol"},
// 	{"market_warning":"NONE","market":"KRW-AXS","korean_name":"엑시인피니티","english_name":"Axie Infinity"},
// 	{"market_warning":"NONE","market":"KRW-STX","korean_name":"스택스","english_name":"Stacks"}
// ]