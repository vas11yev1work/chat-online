<template>
	<div class="page-wrap chat-wrap" :class="{'reply' : reply}" ref="block">
		<Message
			v-for="m in messages"
			:color="m.color"
			:key="m.dataId"
			:mid="m.dataId"
			:name="m.name"
			:text="m.text"
			:owner="m.id === user.id"
		/>
		<ModalComponent
			:show="show"
			:id="mid"
			:name="currentName"
			@close="closeModal"
			:text="currentText"
			@close-reply="show = false"
		/>
	</div>
</template>

<script>
import Message from "../components/Message";
import ModalComponent from "../components/ModalComponent";

export default {
        name: 'chat',
		middleware: ['auth'],
		layout: 'ChatLayout',
		components: {
        	Message,
			ModalComponent
		},
		data() {
        	return {
        		show: false,
				mid: '',
				currentText: '',
				currentName: '',
				reply: false
			}
		},
		methods: {
			closeModal() {
				this.show = false;
				this.currentText = '';
				this.currentName = '';
				this.mid = '';
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
        	messages() {
        		return this.$store.state.messages;
			}
		},
		watch: {
			messages() {
				setTimeout(() => {
					console.log(this.$refs.block.scrollTop);
					this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
				}, 0);
			}
		},
		mounted() {
        	this.$root.$on('msg-click', (id, text, name) => {
				this.show = true;
				this.mid = id;
				this.currentText = text;
				this.currentName = name;
			});
			this.$root.$on('remove-reply', () => {
				this.mid = '';
				this.currentName = this.currentText = '';
				this.reply = false;
			});
			this.$root.$on('reply', () => {
				this.reply = true;
			});
		}
	}
</script>

<style lang="scss">
	.chat-wrap{
		padding-bottom: 56px;
		&.reply{
			padding-bottom: 107px;
		}
	}
</style>
