<template>
	<form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
		<slot />
		<PrimaryBtn v-if="!options.isHideSubmit" :is-loading="isLoading">
			{{ options.submitBtnText }}
		</PrimaryBtn>
	</form>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { useEventBus } from '@vueuse/core'
import type { FormField } from '@/types/FormFieldTypes';
import type { FormProps } from '@/types/FormPropsTypes';
import PrimaryBtn from '@/components/ui/buttons/PrimaryBtn.vue';

const props = defineProps<{
	options: FormProps;
}>();

const emit = defineEmits(['onFormSubmit']);

const formValue = ref<{ [key: string]: FormField }>({});

// Watch for fields value from <slot />
const bus = useEventBus('field-changed');
bus.on((newValue: FormField) => {
	formValue.value = { ...formValue.value, ...newValue }
});

const isLoading = ref(false);
let timeout: ReturnType<typeof setTimeout> | null = null;

async function handleSubmit() {
	function isFormValid(): boolean {
		return Object.values(formValue.value).every(field => field.isValid);
	}

	if (!isFormValid()) {
		throw new Error("Form isn't valid!");
	}

	isLoading.value = true;

	await new Promise<void>((resolve) => {
		emit('onFormSubmit', formValue.value, resolve);
	});

	isLoading.value = false;
}

// Watcehr for submiting on feild changed
let stopWatch: (() => void) | null = null;
if (props.options.isSubmitOnUpdate) {
	stopWatch = watch(formValue, () => {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			handleSubmit();
		}, 300);
	}, { deep: true });
}

onUnmounted(() => {
	if (timeout) {
		clearTimeout(timeout);
	}
	if (stopWatch) {
		stopWatch();
	}
});
</script>

<style scoped></style>
