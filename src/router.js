import Login from './components/login/index'
import Account from './components/account/index'
import Allocation from './components/allocation/index'
import Foundation from './components/foundation/index'
import Position from './components/position/index'
import Release from './components/release/index'
import Business from './components/business/index'
import ModifyInfoHome from './components/modifyinfo/index'
import ModifyInfo from './components/modifyinfo/info'
import ModifySecondContact from './components/modifyinfo/secondcontact'
import ModifyPwd from './components/modifypwd/index'
import Risk from './components/risk/index'
import RiskInfo from './components/risk/info'
import RiskLevel from './components/risk/level'
import Questionnaire from './components/questionnaire/index'
import NewStock from './components/newstock/index'
import NewStockRisk from './components/newstock/nsrsk'
import NewStockHistory from './components/newstock/nshis'
import NewStockSuccess from './components/newstock/nssuc'
import NotFound from './components/notfound/index'

const routes = [{
	path: '/login',
	name: '账户绑定',
	component: Login
}, {
	path: '/account',
	name: '账户管家',
	component: Account
}, {
	path: '/allocation',
	name: '新股中签',
	component: Allocation
}, {
	path: '/foundation',
	name: '理财基金',
	component: Foundation
}, {
	path: '/position',
	name: '我的持仓',
	component: Position
}, {
	path: '/release',
	name: '解除绑定',
	component: Release
}, {
	path: '/business',
	name: '业务办理',
	component: Business
}, {
	path: '/modifyinfohome',
	name: '资料修改主页',
	component: ModifyInfoHome
}, {
	path: '/modifyinfo',
	name: '资料修改',
	component: ModifyInfo
}, {
	path: '/secondcontact',
	name: '修改第二联系人信息',
	component: ModifySecondContact
}, {
	path: '/modifypwd',
	name: '密码修改',
	component: ModifyPwd
}, {
	path: '/questionnaire',
	name: '问卷回访',
	component: Questionnaire
}, {
	path: '/risk',
	name: '风险测评结果',
	component: Risk
}, {
	path: '/riskinfo',
	name: '风险测评题目',
	component: RiskInfo
}, {
	path: '/risklevel',
	name: '风险测评等级',
	component: RiskLevel
}, {
	path: '/newstock',
	name: '新股申购查询',
	component: NewStock
}, {
	path: '/newstockrisk',
	name: '新股申购风险',
	component: NewStockRisk
}, {
	path: '/newstockhistory',
	name: '新股申购历史',
	component: NewStockHistory
}, {
	path: '/newstocksuccess',
	name: '新股申购成功',
	component: NewStockSuccess
}, {
	path: '*',
	name: '找不到...',
	component: NotFound
}];

module.exports = {
	routes: routes
}