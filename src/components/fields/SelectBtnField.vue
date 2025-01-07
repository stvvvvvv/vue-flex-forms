// Component
<template>
	<div>
		<label :for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
			{{ name }}
		</label>
		<div class="flex flex-wrap">
			<template v-for="(option, index) in options" :key="index">
				<button @click.prevent="handleSelection(option)"
					:class="['m-1', 'px-3', 'py-1', 'rounded', isSelected(option) ? 'bg-primary-300 text-white' : 'bg-gray-200 hover:bg-gray-300']">
					{{ option.label }}
				</button>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { useEventBus } from '@vueuse/core'

type SelectOption = {
	label: string;
	value: string | number | boolean;
	description?: string;
	icon?: string;
};

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		required: false,
		default: 'Select option(s)',
	},
	isMultiSelect: {
		type: Boolean,
		required: false,
		default: false,
	},
	options: {
		type: Array as () => SelectOption[],
		required: true,
	},
});

const { name, isMultiSelect, options } = toRefs(props);

const selectedValues = ref<string[]>([]);

function handleSelection(option: SelectOption) {
	if (isMultiSelect.value) {
		const index = selectedValues.value.indexOf(String(option.value));
		if (index === -1) {
			selectedValues.value.push(String(option.value));
		} else {
			selectedValues.value.splice(index, 1);
		}
	} else {
		selectedValues.value = [String(option.value)];
	}

	const bus = useEventBus('field-changed');
	bus.emit({
		[name.value]: {
			value: selectedValues.value,
			isValid: true,
		}
	});
}

function isSelected(option: SelectOption) {
	return selectedValues.value.includes(String(option.value));
}
</script>

<style scoped></style>
