<template>
	<div class="container mx-auto px-4 py-5">
		<FormWrapper :options="formOptions" @on-form-submit="onFormSubmit">
			<StringField :type="'email'" :name="'Email'" :placeholder="'name@company.com'" :icon="Mail"
				:rules="{ email: true, isRequired: true }" />
			<StringField :type="'password'" :name="'Password'" :placeholder="'••••••••'" :icon="Password"
				:rules="{ minLength: 8, isRequired: true }" />
			<div class="flex items-center justify-between">
				<a href="#" class="link text-primary-500">Forgot password?</a>
			</div>
		</FormWrapper>
	</div>
</template>

<script setup lang="ts">
import FormWrapper from '@/components/FormWrapper.vue';
import StringField from '@/components/fields/StringField.vue';
import Mail from '@/components/icons/MailIcon.vue';
import Password from '@/components/icons/PasswordIcon.vue';
import { FormProps } from '@/types/FormPropsTypes';

const formOptions: FormProps = {
	submitBtnText: 'Sign in'
};

const onFormSubmit = () => {

}
</script>
