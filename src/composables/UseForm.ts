import { ref, watch, onUnmounted } from 'vue';
import { useEventBus } from '@vueuse/core';
import { validateForm } from '@/validation/ValidationService';
import type { FormField } from '@/types/FormFieldTypes';
import type { FormProps } from '@/types/FormPropsTypes';
import { FormError } from '@/types/FormErrorsTypes';

export function useForm(options: FormProps, emit: any) {
	const formValue = ref<{ [key: string]: FormField }>({});
	const isLoading = ref(false);
	const errors = ref<FormError[]>([]);
	let timeout: ReturnType<typeof setTimeout> | null = null;
	let stopWatch: (() => void) | null = null;

	const bus = useEventBus('field-changed');

	// Watch for fields value from <slot />
	// @ts-ignore
	bus.on((newValue: FormField) => {
		// @ts-ignore
		formValue.value = { ...formValue.value, ...newValue };
	});


	async function handleSubmit() {
		errors.value = [];
		const { isValid, errors: formErrors } = validateForm(formValue);
	
		if (!isValid) {
			errors.value = formErrors;
			throw new Error("Form isn't valid!");
		}

		isLoading.value = true;

		await new Promise<void>((resolve) => {
			emit('onFormSubmit', formValue.value, resolve);
		});

		isLoading.value = false;
	}

	// Watch for form value updates to submit
	if (options.isSubmitOnUpdate) {
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

	return {
		formValue,
		isLoading,
		errors,
		handleSubmit
	};
}
