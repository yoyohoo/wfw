const staticData = {}

function getData(originData) {
	var d = [];
	for (var i = 0; i < originData.length; i++) {
		d.push(originData[i].value);
	}
	return d;
}

function getIndex(originData, value) {
	var idx;
	for (var i = 0; i < originData.length; i++) {
		(value === originData[i].value) && (idx = i)
	}
	return idx;
}

function getKey(originData, value) {
	var idx;
	for (var i = 0; i < originData.length; i++) {
		(value === originData[i].value) && (idx = originData[i].key)
	}
	return idx;
}

function getValue(originData, key) {
	var v;
	for (var i = 0; i < originData.length; i++) {
		(key === originData[i].key) && (v = originData[i].value)
	}
	return v;
}

staticData.Profession = {
	originData: [{
		key: '01',
		value: '文教科卫专业人员'
	}, {
		key: '02',
		value: '党政（在职，离退休）机关干部'
	}, {
		key: '03',
		value: '企事业单位干部'
	}, {
		key: '04',
		value: '行政企事业单位工人'
	}, {
		key: '05',
		value: '农民'
	}, {
		key: '06',
		value: '个体'
	}, {
		key: '07',
		value: '无业'
	}, {
		key: '08',
		value: '军人'
	}, {
		key: '09',
		value: '学生'
	}, {
		key: '0A',
		value: '自由职业者'
	}, {
		key: '10',
		value: '证券从业人员'
	}, {
		key: '11',
		value: '离退休'
	}, {
		key: '99',
		value: '其他'
	}],
	getData: function() {
		return getData(this.originData);
	},
	getIndex: function(value) {
		return getIndex(this.originData, value);
	},
	getKey: function(value) {
		return getKey(this.originData, value);
	},
	getValue: function(key) {
		return getValue(this.originData, key);
	}
}
staticData.Education = {
	originData: [{
		key: '0',
		value: '博士'
	}, {
		key: '1',
		value: '硕士'
	}, {
		key: '2',
		value: '本科'
	}, {
		key: '3',
		value: '大专'
	}, {
		key: '4',
		value: '中专'
	}, {
		key: '5',
		value: '高中'
	}, {
		key: '6',
		value: '初中以下'
	}, {
		key: 'Z',
		value: '其他'
	}],
	getData: function() {
		return getData(this.originData);
	},
	getIndex: function(value) {
		return getIndex(this.originData, value);
	},
	getKey: function(value) {
		return getKey(this.originData, value);
	},
	getValue: function(key) {
		return getValue(this.originData, key);
	}
}
staticData.Contactway = {
	originData: [{
		key: '1',
		value: '手机'
	}, {
		key: '2',
		value: '家庭电话'
	}, {
		key: '3',
		value: '工作电话'
	}, {
		key: '4',
		value: '小灵通'
	}],
	getData: function() {
		return getData(this.originData);
	},
	getIndex: function(value) {
		return getIndex(this.originData, value);
	},
	getKey: function(value) {
		return getKey(this.originData, value);
	},
	getValue: function(key) {
		return getValue(this.originData, key);
	}
}
staticData.Contactfreq = {
	originData: [{
		key: '0',
		value: '可随意联络'
	}, {
		key: '1',
		value: '不超过1月3次'
	}, {
		key: '2',
		value: '不超过1季度1次'
	}, {
		key: '3',
		value: '不超过1年1次'
	}],
	getData: function() {
		return getData(this.originData);
	},
	getIndex: function(value) {
		return getIndex(this.originData, value);
	},
	getKey: function(value) {
		return getKey(this.originData, value);
	},
	getValue: function(key) {
		return getValue(this.originData, key);
	}
}

export default staticData