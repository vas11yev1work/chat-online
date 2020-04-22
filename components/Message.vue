<template>
	<div @click="messageClickEmit">
		<div v-if="name === 'admin'" class="system">
			<div class="m-wrap">
				<p>{{ text }}</p>
			</div>
		</div>
		<div v-else class="wrap">
			<div class="mes" :class="{owner}">
				<div class="small" v-if="!owner" :style="{color}">{{ name }}</div>
				<pre>{{ text }}</pre>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			name: String,
			text: String,
			color: String,
			mid: String,
			owner: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			messageClickEmit() {
				if (this.name !== 'admin') {
					this.$root.$emit('msg-click', this.mid, this.text, this.name);
				}
			}
		}
	}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=PT+Mono&display=swap&subset=cyrillic');
	.system{
		margin-bottom: 1rem;
		display: flex;
		justify-content: center;
		.m-wrap{
			min-width: 200px;
			p{
				margin: 0;
				padding: 2px 15px;
				text-align: center;
				background-color: #1B2734;
				color: #CFCFCF;
				box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.05);
				font-size: 12px;
				border-radius: 20px;
				word-wrap: break-word;
			}
		}
	}
	.wrap{
		display: flex;
		flex-direction: column;
		.mes{
			padding: 10px;
			max-width: 60%;
			margin-bottom: 10px;
			box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.05);
			border-radius: 5px;
			position: relative;
			background-color: #182533;
			align-self: flex-start;
			.small{
				font-size: 12px;
				font-weight: 600;
				width: auto;
			}
			pre{
				margin-bottom: 0;
				font-size: 13px;
				line-height: 20px;
				color: #b3c7dc;
				letter-spacing: 1px;
				overflow-x: auto;
				white-space: pre-wrap;
				word-wrap: break-word;
				font-family:'PT Mono', monospace;
			}
			&.owner{
				background-color: #2B5278;
				color: #000000;
				align-self: flex-end;
				max-width: 60%;
				.small{
					color: #A7A7A7;
				}
				p{
					color: #FFFFFF;
				}
			}
		}
	}
</style>
