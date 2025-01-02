import { createApp } from 'vue';

import App from './App.vue';
import FloatingVue from 'floating-vue';


import '@/assets/index.css';
import 'floating-vue/dist/style.css';

const app = createApp(App);

app.use(FloatingVue, {
	themes: {
		'error-tooltip': {
			$extend: 'tooltip'
		}
	}
});

app.mount('#app');
