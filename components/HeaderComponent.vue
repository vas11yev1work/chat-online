<template>
	<header>
		<div class="left">
			<slot name="left"></slot>
		</div>
		<div class="title">
			<h3>{{ title }}</h3>
		</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</header>
</template>

<script>
    export default {
        name: 'HeaderComponent',
		props: {
        	title: {
        		type: String,
				default: 'Title'
			}
		}
    }
</script>

<style lang="scss" scoped>
	header{
		z-index: 99;
		background-color: #17212B;
		height: 46px;
		border-bottom: 1px solid #131D27;
		padding: 0 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		width: 100%;
		.title{
			h3{
				font-size: 16px;
				font-weight: 600;
				color: #FFFFFF;
			}
		}
		.left{
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
		.right{
			height: 100%;
			position: absolute;
			top: 0;
			right: 0;
		}
	}
</style>
