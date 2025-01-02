<template>
	<button class="btn solid light primary w-full relative">
		<slot />
		<Loading v-if="isLoading" class="w-10 absolute right-1" />
	</button>
</template>

<script setup lang="ts">
import Loading from '@/modules/icons/LoadingIcon.vue';

defineProps({
	isLoading: {
		type: Boolean,
		default: true,
	},
});
</script>
