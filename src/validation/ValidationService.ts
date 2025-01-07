import { computed, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';

import type { Ref } from 'vue';
import type { FormValue } from '@/types/FormValueTypes';
import type { RulesConfig } from '@/types/RulesConfigTypes';
import { FormError } from '@/types/FormErrorsTypes';

function _configureRules(rules: Ref<any>): RulesConfig {
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

export function validateField(fieldName: Ref<string>, fieldValue: any, rules: Ref<any>) {
	const rulesConfig = _configureRules(rules);

	const validationRules: Record<string, any> = {};
	validationRules[fieldName.value] = rulesConfig;

	const v$ = useVuelidate(validationRules, { [fieldName.value]: fieldValue });
	const errors: { message: string, fieldName: string }[] = [];

	// Collect errors based on validation
	if (v$.value[fieldName.value].$invalid) {
		if (v$.value[fieldName.value].$errors.length > 0) {
			v$.value[fieldName.value].$errors.forEach((error: any) => {
				errors.push({
					message: error.$message,
					fieldName: fieldName.value,
				});
			});
		}
	}

	return { v$, fieldErrors: errors };
}

export function validateForm(formValue: FormValue): { isValid: boolean, errors: FormError[] } {
	let errors: FormError[] = [];

	Object.entries(formValue.value).forEach(([fieldName, fieldValue]) => {
		const { fieldErrors } = validateField(ref(fieldName), fieldValue, ref(fieldValue.rules));
		errors = [...errors, ...fieldErrors];
	});

	return {
		isValid: errors.length === 0,
		errors,
	};
}
