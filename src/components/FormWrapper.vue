<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
    <slot />
    <PrimaryBtn v-if="!options.isHideSubmit" :is-loading="isLoading">
      {{ options.submitBtnText }}
    </PrimaryBtn>
		<div v-if="errors.length > 0" class="text-red-500 bg-color-red-500">
			{{ errors }}
		</div>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useForm } from '@/composables/UseForm';
import PrimaryBtn from '@/components/ui/buttons/PrimaryBtn.vue';
import type { FormProps } from '@/types/FormPropsTypes';

const props = defineProps<{
  options: FormProps;
}>();

const emit = defineEmits(['onFormSubmit']);

const { isLoading, handleSubmit, errors } = useForm(props.options, emit);
</script>

<style scoped></style>
