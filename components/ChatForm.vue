<template>
	<footer>
		<div class="reply-wrap" v-if="replyingStatus">
			<div class="reply-content">
				<div class="line"></div>
				<div class="reply-data">
					<span>{{ replyingName }}</span>
					<p>{{ replyingText }}</p>
				</div>
			</div>
			<div class="close-reply">
				<button @click="removeReplying">&times;</button>
			</div>
		</div>
		<div class="form-wrap">
			<textarea placeholder="Введите сообщение" v-model="text" ref="msg" @keydown.tab="addSpaces($event)" @keydown.shift.enter="send($event)"/>
			<button class="send-mes" @click="send">
				<img src="../assets/send.svg" alt="send">
			</button>
		</div>
	</footer>
</template>

<script>
    export default {
		name: 'ChatForm',
		data() {
			return {
				text: '',
				replyingStatus: false,
				replyingText: '',
				replyingName: '',
				replyingId: ''
			}
		},
		methods: {
			send(e) {
				e.preventDefault();
				this.$socket.emit('createMessage', {
					text: this.text.trim(),
					id: this.$store.state.user.id
				}, data => {
					if (typeof data === 'string') {
						console.error(data);
					} else {
						this.text = '';
						this.$refs.msg.focus();
						this.removeReplying();
					}
				});
			},
			removeReplying() {
				this.replyingStatus = false;
				this.$root.$emit('remove-reply');
				this.replyingText = '';
				this.replyingName = '';
				this.replyingId = '';
			},
			addSpaces(e) {
				e.preventDefault();
				this.text = this.text + '  ';
			},
		},
		mounted() {
			this.$root.$on('reply', (id, text, name) => {
				this.replyingStatus = true;
				this.replyingText = text;
				this.replyingName = name;
				this.replyingId = id;
			})
		}
	}
</script>

<style lang="scss">
	footer{
		background-color: #17212B;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		.reply-wrap{
			background-color: #17212B;
			color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50px;
			.reply-content{
				padding-left: 16px;
				display: flex;
				.line{
					height: 31px;
					width: 2px;
					background-color: #4C82EA;
					display: block;
					transform: translateY(6px);
				}
				.reply-data{
					padding-left: 10px;
					transform: translateY(-2px);
					span{
						font-size: 12px;
						color: lighten(#17212B, 25%);
						font-weight: 600;
					}
					p{
						font-size: 14px;
					}
				}
			}
			.close-reply{
				button{
					padding: 0 16px;
					font-size: 30px;
					color: #4C82EA;
					background-color: transparent;
					border: none;
					width: 56px;
				}
			}
		}
		.form-wrap{
			display: flex;
			border-top: 1px solid #131D27;
			textarea {
				height: 56px;
				width: 100%;
				border: none;
				background-color: #17212B;
				font-size: 14px;
				color: #FFFFFF;
				padding: 16px 0 5px 16px;
				resize: none;
				outline: none;
				&:focus {
					padding: 7px 0 0 16px;
				}
				&::placeholder{
					color: #A7A7A7;
				}
				&::-webkit-scrollbar {
					width: 3px; height: 3px;
				}
				&::-webkit-scrollbar-button {
					height: 0;
				}

			}
			button{
				height: 56px;
				padding: 0 16px;
				display: flex;
				align-items: center;
				justify-content: center;
				border: none;
				background-color: #17212B;

			}
		}
	}
</style>
