<template>
	<div>
		<label :for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
			{{ name }}
		</label>
		<div class="input solid" :class="{ danger: v$[name].$error }">
			<input v-model.number="fieldValue" type="number" :name="name" :placeholder="placeholder" @blur="v$[name].$touch">
			<VTooltip v-if="v$[name].$error" :placement="'bottom'" :theme="'error-tooltip'">
				<div class="p-relative z-10">
					<Attention class="text-red-500 bg-color-red-500" />
				</div>
				<template #popper>
					<div>
						<div v-for="err in v$[name].$errors" :key="err.$message">
							{{ err.$message }}
						</div>
					</div>
				</template>
			</VTooltip>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, toRefs, watch } from 'vue';
import {validateField} from '@/validation/ValidationService';
import { useEventBus } from '@vueuse/core'
import Attention from '@/components/icons/AttentionIcon.vue';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		required: true,
	},
	rules: {
		type: Object,
		default: () => {
			return {
				minValue: undefined,
				maxValue: undefined,
				isRequired: true
			};
		},
	},
});

const { name, placeholder, rules } = toRefs(props);

const fieldValue = ref(null);

const { v$ } = validateField(name, fieldValue, rules);
const isValid = computed(() => v$.value[name.value].$pending ? true : !v$.value[name.value].$invalid);

const field = reactive({
	[name.value]: {
		value: fieldValue,
		isValid,
		name, 
		placeholder, 
		rules
	},
});

const bus = useEventBus('field-changed');
watch(
	fieldValue,
	() => {
		bus.emit(field);
	},
	{ immediate: true, deep: true }
);
</script>

<style scoped></style>
