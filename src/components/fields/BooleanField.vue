<template>
	<div>
		<label :for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
			{{ name }}
		</label>
		<div class="input solid" :class="{ danger: v$[name].$error }">
			<input type="checkbox" v-model="fieldValue" :name="name" @blur="v$[name].$touch">
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
import validateField from '@/modules/forms/validation/ValidationService';
import { useEventBus } from '@vueuse/core';
import Attention from '@/modules/icons/AttentionIcon.vue';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	isRequired: {
		type: Boolean,
		required: false,
		default: true,
	},
});

const { name, isRequired } = toRefs(props);

const fieldValue = ref(false);

const rules = ref({ isRequired });
const v$ = validateField(name, fieldValue, rules);
const isValid = computed(() => v$.value[name.value].$pending ? true : !v$.value[name.value].$invalid);


const field = reactive({
	[name.value]: {
		value: fieldValue,
		isValid,
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
