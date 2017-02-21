<template>
<div class="preloading">
	<div class="sk-double-bounce">
		<div class="sk-child sk-double-bounce1"></div>
		<div class="sk-child sk-double-bounce2"></div>
	</div>
</div>
</template>
<style>
	.preloading {
		position: absolute;
	    top: 0;
	    left: 0;
	    background-color: #fff;
	    height: 100%;
	    width: 100%;
	    z-index: 999;
	}
	.sk-double-bounce {
	     width: 4rem;
	    height: 4rem;
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    margin-top: -2rem;
	    margin-left: -2rem;
		}
	.sk-double-bounce .sk-child {
	    width: 100%;
	    height: 100%;
	    border-radius: 50%;
	    background-color: #C13333;
	    opacity: 0.6;
	    position: absolute;
	    top: 0;
	    left: 0;
	    -webkit-animation: sk-doubleBounce 2s infinite ease-in-out;
	    animation: sk-doubleBounce 2s infinite ease-in-out;
	}
	.sk-double-bounce .sk-child.sk-double-bounce2 {
	    -webkit-animation-delay: -1.0s !important;
	    animation-delay: -1.0s !important;
	    opacity: 1 !important;
	}
</style>