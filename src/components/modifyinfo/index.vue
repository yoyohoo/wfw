<template>
<div class="container-fluid" id="ywbl_zlxg_zlxg">
        <div id="render" class="zlxgPage page-content">
            <div class="mainBody">
								<router-link to="/modifyinfo">
									<div class="item">修改账户信息 <b class="arrow"></b></div>
								</router-link>
								<router-link to="/secondcontact">
									<div class="item">修改第二联系人信息 <b class="arrow"></b></div>
								</router-link>
            </div>
        </div>
    </div>
</template>
<script>
	export default {
      
	}
</script>
<style media="screen">
	.mint-cell{
		height: 5rem;
	}
	.item{
		padding-left: 1rem;
	}
	.arrow {
		display:inline-block;
		position: absolute;
		right: 1rem;
		top:1.8rem;
		width: .7rem;
		height: 1.5rem;
		background: url(../../assets/img/arrow.png) no-repeat 0 0;
		background-size: 100% 100%;
	}
</style>
