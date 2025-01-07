<template>
	<div>
		<label :for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
			{{ name }}
		</label>
		<div class="input solid" :class="{ danger: v$[name].$error }">
			<component :is="icon" v-if="icon" />
			<input v-show="reactiveType !== 'password'" v-model="fieldValue" :type="reactiveType" :name="name"
				:placeholder="placeholder" :autocomplete="type === 'password' ? 'current-password' : ''"
				@blur="v$[name].$touch">
			<input v-show="reactiveType === 'password'" v-model="fieldValue" type="password" :name="name"
				:placeholder="placeholder" :autocomplete="type === 'password' ? 'current-password' : ''"
				@blur="v$[name].$touch">
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
			<div v-if="showPassword" class="p-relative z-10" @click="changePasswordViability">
				<Show v-if="isPasswordHidden" />
				<Hide v-else />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, toRefs, watch } from 'vue';
import {validateField} from '@/validation/ValidationService';
import { useEventBus } from '@vueuse/core'

import Hide from '@/components/icons/HideIcon.vue';
import Show from '@/components/icons/ShowIcon.vue';
import Attention from '@/components/icons/AttentionIcon.vue';

const props = defineProps({
	type: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		required: true,
	},

	icon: {
		type: [String, Object],
		default: ''
	},
	rules: {
		type: Object,
		default: () => {
			return {
				minLength: 0,
				email: false,
				sameAs: undefined,
				isRequired: true
			};
		},
	},
});

const { type, name, placeholder, icon, rules } = toRefs(props);


const showPassword = type.value === 'password' ? true : false;

const fieldValue = ref('');

const { v$ } = validateField(name, fieldValue, rules);
const isValid = computed(() => v$.value[name.value].$pending ? true : !v$.value[name.value].$invalid);

const field = reactive({
	[name.value]: {
		value: fieldValue,
		isValid,
		type, name, placeholder, icon, rules
	},
});

const bus = useEventBus('field-changed');
watch(
	fieldValue,
	() => {
		console.log(v$.value[name.value])
		bus.emit(field);
	},
	{ immediate: true, deep: true }
);

const reactiveType = ref(type.value);
const isPasswordHidden = ref(true);
function changePasswordViability() {
	isPasswordHidden.value = !isPasswordHidden.value;

	if (isPasswordHidden.value) {
		reactiveType.value = 'password';
	}
	else {
		reactiveType.value = 'string';
	}
}
</script>

<style scoped></style>
