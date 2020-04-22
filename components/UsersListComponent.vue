<template>
	<div class="list-wrap">
		<transition name="fade">
			<div class="overlay" v-if="show" @click="closeEmit"></div>
		</transition>
		<div class="users-list-wrap" :class="{show}">
			<div class="list-title">
				<h3>Список участников</h3>
			</div>
			<ul class="users-list">
				<li class="user" v-for="u in users" :key="u.id" :class="{'current' : u.id === user.id}">
					<div class="images">
						<img v-if="u.id === user.id" src="../assets/user-active.svg" alt="user-active">
						<img v-else src="../assets/user.svg" alt="user">
					</div>
					<span>{{ u.name }} - {{ u.color }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			show: Boolean,
			users: Array
		},
		methods: {
			closeEmit() {
				this.$emit('close');
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		}
	}
</script>

<style lang="scss">
	.list-wrap{
		position: relative;
		z-index: 99;
		.overlay{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0,0,0,.6);
		}
		.users-list-wrap{
			position: fixed;
			bottom: 0;
			right: 0;
			left: 0;
			height: 60%;
			background-color: #182533;
			padding: 16px;
			border-radius: 25px 25px 0 0;
			transition: all .3s;
			transform: translateY(100%);
			&.show{
				transform: translateY(0);
			}
			.list-title{
				text-align: center;
				border-bottom: 1px solid #17212B;
				h3{
					margin-bottom: 16px;
					font-size: 16px;
					font-weight: 600;
					color: #FFFFFF;
				}
			}
			.users-list{
				overflow-y: auto;
				display: block;
				height: 94%;
				.user{
					display: flex;
					align-items: center;
					padding: 10px 0;
					border-bottom: 1px solid #17212B;
					.images{
						display: flex;
						img{
							margin-right: 10px;
						}
					}
					span{
						font-size: 14px;
						color: #A7A7A7;
						font-weight: 600;
					}
					&.current {
						span {
							color: #4C82EA;
						}
					}
				}
			}
		}
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
