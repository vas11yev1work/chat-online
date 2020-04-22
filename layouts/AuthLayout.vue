<template>
	<div class="main-wrap">
		<HeaderComponent title="Чат Онлайн"/>
		<nuxt/>
	</div>
</template>

<script>
    import HeaderComponent from '../components/HeaderComponent';

	export default {
		name: 'AuthLayout',
		components: {
			HeaderComponent
		}
    }
</script>

<style lang="scss">
	body {
		background-color: #0E1621;
	}
</style>
