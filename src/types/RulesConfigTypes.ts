import { minLength, sameAs } from '@vuelidate/validators';
import type { ValidationRuleWithoutParams } from '@vuelidate/core';

export interface RulesConfig {
	email?: ValidationRuleWithoutParams,
	minLength?: ReturnType<typeof minLength>;
	required?: ValidationRuleWithoutParams,
	sameAs?: ReturnType<typeof sameAs>;
}