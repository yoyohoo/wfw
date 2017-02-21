import Vue from 'vue'

var bus = new Vue();
bus.singleSelect = null;
bus.$on('singleSelect', function(component) {
	bus.singleSelect &&
		bus.singleSelect.hide();
	(bus.singleSelect = component).show();
})

export default bus