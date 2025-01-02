import { computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';

import type { Ref } from 'vue';
import type { ValidationRuleWithoutParams } from '@vuelidate/core';

interface RulesConfig {
	email?: ValidationRuleWithoutParams,
	minLength?: ReturnType<typeof minLength>;
	required?: ValidationRuleWithoutParams,
	sameAs?: ReturnType<typeof sameAs>;
}

function configureRules(rules: Ref<any>): RulesConfig {
	const rulesConfig: RulesConfig = {};

	if (rules.value.email) {
		rulesConfig.email = email;
	}

	if (rules.value.minLength) {
		rulesConfig.minLength = minLength(rules.value.minLength);
	}

	if (rules.value.isRequired) {
		rulesConfig.required = required;
	}

	if (rules.value.sameAs) {
		rulesConfig.sameAs = sameAs(computed(() => rules.value.sameAs.eqTo));
	}

	return rulesConfig;
}

function validateField(fieldName: Ref<string>, fieldValue: any, rules: Ref<any>) {
	const rulesConfig = configureRules(rules);

	const validationRules: Record<string, any> = {};
	validationRules[fieldName.value] = rulesConfig;

	return useVuelidate(validationRules, { [fieldName.value]: fieldValue });
}

export default validateField;
