<template>
	<div>
		<label :for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
			{{ name }}
		</label>
		<div class="input solid" :class="{ danger: v$[name].$error }">
			<slot :field-value="fieldValue" :blur="handleBlur"></slot>
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
import { ref, toRefs, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useEventBus } from '@vueuse/core';
import Attention from '@/components/icons/AttentionIcon.vue';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	rules: {
		type: Object,
		required: true,
	},
});

const { name, rules } = toRefs(props);

const fieldValue = ref('');
const v$ = useVuelidate({ [name.value]: rules.value }, { [name.value]: fieldValue });

const bus = useEventBus('field-changed');
watch(
	fieldValue,
	() => {
		bus.emit({ [name.value]: { value: fieldValue, isValid: !v$.value[name.value].$invalid } });
	},
	{ immediate: true, deep: true }
);

const handleBlur = () => {
	v$[name.value].$touch();
};
</script>

<style scoped></style>
