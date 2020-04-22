<template>
	<div class="page-wrap">
		<div class="form-text">
			<span class="grey-text">Войдите в комнату</span>
		</div>
		<div class="auth-wrap">
			<div class="form-group">
				<div class="form-item">
					<input type="text" placeholder="Введите имя" v-model="name">
				</div>
				<div class="form-item">
					<input type="text" placeholder="Введите комнату" v-model="room">
				</div>
			</div>
		</div>
		<div class="button-wrap">
			<button class="enter-button" @click="submit">Войти</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
		layout: 'AuthLayout',
		data() {
			return {
				name: '',
				room: '',
				colors: [
					'#EA4C4C',
					'#4C82EA',
					'#83C878',
					'#C878C0',
					'#84CECA',
					'#F2A634'
				]
			}
		},
		sockets: {
			connect(){
				console.log('Client IO Connected...');
			}
		},
		computed: {
			color() {
				return this.colors[Math.floor(Math.random() * this.colors.length)]
			}
		},
		methods: {
			setUser(user) {
				this.$store.commit('setUser', user);
			},
			submit() {
				if (this.name.trim() && this.room.trim()) {
					const user = {
						name: this.name,
						room: this.room.trim().toLowerCase(),
						color: this.color
					};
					this.$socket.emit('userJoined', user, data => {
						if (typeof data === 'string') {
							console.error(data);
						} else {
							user.id = data.userId;
							this.setUser(user);
							this.$router.push('/chat');
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.form-group{
		background-color: #17212B;
		border-top: 1px solid #131D27;
		border-bottom: 1px solid #131D27;
		padding: 0 16px;
		.form-item{
			border-bottom: 1px solid #131D27;
			&:last-child{
				border-bottom: none;
			}
			input{
				height: 42px;
				border: none;
				width: 100%;
				font-size: 14px;
				color: #FFFFFF;
				background-color: transparent;
				&::placeholder{
					color: #A7A7A7;
				}
			}
		}
	}
	.button-wrap{
		padding: 16px;
		.enter-button{
			height: 60px;
			width: 100%;
			background-color: #4C82EA;
			color: #FFFFFF;
			font-size: 16px;
			font-weight: 600;
			border: none;
			border-radius: 2px;
			&:active{
				background-color: #6597FA;
			}
		}
	}
</style>
