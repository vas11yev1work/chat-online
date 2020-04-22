<template>
	<div class="modal">
		<transition name="fade">
			<div class="overlay" v-if="show" @click="closeEmit"></div>
		</transition>
		<transition name="fade">
			<div class="modal-wrap" v-if="show">
				<ul class="actions-list">
					<li class="action">
						<button @click="reply">Ответить</button>
					</li>
					<li class="action">
						<button @click="copyText">Скопировать текст</button>
					</li>
					<li class="action">
						<button @click="deleteOne">Удалить</button>
					</li>
				</ul>
			</div>
		</transition>
	</div>
</template>

<script>
    export default {
    	props: {
    		show: {
    			type: Boolean,
				default: false
			},
			id: String,
			text: String,
			name: String,
		},
		methods: {
			closeEmit() {
				this.$emit('close');
			},
			copyText() {
				navigator.clipboard.writeText(this.text).then(() => {
					console.log('Success');
				}).catch(err => {
					console.error('Error', err);
				});
				this.$emit('close');
			},
			reply() {
				this.$emit('close-reply');
				this.$root.$emit('reply', this.id, this.text, this.name);
			},
			deleteOne() {
				this.$store.commit('deleteMessage', this.id);
				this.$emit('close');
			}
		}
    }
</script>

<style lang="scss">
	.modal{
		position: absolute;
		z-index: 99;
		top: 0;
		left: 0;
		.overlay{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0,0,0,.6);
		}
		.modal-wrap{
			position: fixed;
			top: 30%;
			left: 50%;
			transform: translateX(-50%);
			background-color: lighten(#182533, 10%);
			border-radius: 8px;
			transition: all .3s;
			padding: 10px 0;
			max-width: 360px;
			width: calc(100% - 64px);
			.actions-list{
				.action{
					width: 100%;
					button{
						padding: 10px 16px;
						width: 100%;
						background-color: transparent;
						border: none;
						color: #FFFFFF;
						display: flex;
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
