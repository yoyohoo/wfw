import Vue from 'vue'

var cache = {};
cache.set = function(key, value) {
	cache[key] = value
}
cache.get = function(key) {
	return cache[key]
}
export default cache