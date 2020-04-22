<template>
	<div class="main-wrap">
		<HeaderComponent :title="`Комната ${user.room}`">
			<template #left>
				<button class="logout header-button" @click="exit">
					<img src="../assets/logout.svg" alt="logout">
					<span>Выйти</span>
				</button>
			</template>
			<template #right>
				<button class="list header-button" @click="show = true">
					<img src="../assets/list.svg" alt="list">
				</button>
			</template>
		</HeaderComponent>
		<UsersListComponent :show="show" :users="users" @close="show = false"/>
		<nuxt/>
		<ChatForm/>
	</div>
</template>

<script>
	import HeaderComponent from '../components/HeaderComponent';
	import UsersListComponent from "../components/UsersListComponent";
	import ChatForm from "../components/ChatForm";

	export default {
		name: 'ChatLayout',
		components: {
			HeaderComponent,
			UsersListComponent,
			ChatForm
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			clearData() {
				this.$store.commit('clearData');
			},
			exit() {
				this.$socket.emit('userLeft', this.user.id, () => {
					this.$router.push('/?message=leftChat');
					this.clearData();
				});
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			users() {
				return this.$store.state.users;
			}
		},
	}
</script>

<style lang="scss">
	.header-button{
		height: 100%;
		padding: 0 16px;
		font-size: 14px;
		background-color: transparent;
		border: none;
		display: flex;
		align-items: center;
		color: #4C82EA;
		&.logout{
			img{
				margin-right: 5px;
			}
		}
	}
</style>
