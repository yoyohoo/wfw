var baseServiceUrl = 'http://wxtest.hx168.com.cn/hxkf/api/v1.0/',
	jsonServiceUrl = 'http://wxtest.hx168.com.cn/hxwt/servlet/json?';

const apis = {
	'encryptKey': "9d1f9019b1ba46efa343b55f64f6dcc90932fe50c0b0c2df047ebe321f2fe7c4a34bc42a890712aa0018501f32068c6c404a4fe8e4379670170ca0fae1e7e6b103eda2d3733787c1ef2447a28b813e3c0dfb86f85f72759a9e7201c68910eb585eb887123e07918ffdd4981cc5661331a2be61b498803f551f7989a8ec22cbb3",
	'getVerifiImg': baseServiceUrl + 'stream/randimg?randKey=123456&width=96&height=32',
	'tokenLogin': baseServiceUrl+ 'sessions/token?custid=150000000283&orgid=1500&token=d201e6c2e2d65096ab1024e0098a2a06144fd91a94a8d3b37925109a1f898813',
	'login': baseServiceUrl + 'sessions/login',
	'logout': baseServiceUrl + 'sessions/logout',
	'validPassword': baseServiceUrl + 'sessions/msgValid',
	'getAllocation': baseServiceUrl + 'acct/winIPO',
	'getUser': baseServiceUrl + 'sessions/user',
	'getUserInfo': baseServiceUrl + 'acct/info',
	'getProducts': baseServiceUrl + 'pm/products',
	'subscribeProd': baseServiceUrl + 'pm/sub',
	'unSubscribeProd': baseServiceUrl + 'pm/unsub',
	'getStocks': baseServiceUrl + 'acct/stocks',
	'getFuns': baseServiceUrl + 'acct/funds',
	'getMoney': baseServiceUrl + 'acct/money',
	'modifyPwd': baseServiceUrl + 'acct/changePW',
	'secondContact': baseServiceUrl + 'acct/2ndConnector',
	'getPhoneVerCode': baseServiceUrl + 'acct/phonecode',
	'riskResult': baseServiceUrl + 'acct/risks/answer',
	'riskQuestions': baseServiceUrl + 'acct/risks',
	'questionnaire': jsonServiceUrl,
	'getNewStock': baseServiceUrl + 'ns/stockquery',
	'orderNewStock': baseServiceUrl + 'ns/sub',
	
}
export default apis;