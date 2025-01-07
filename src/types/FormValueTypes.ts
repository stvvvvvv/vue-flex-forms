// types.ts
import { Ref } from 'vue';
import type { FormField } from '@/types/FormFieldTypes';

export type FormValue = Ref<{ [key: string]: FormField }>;
