import App from '@/App.vue';
import '@/assets/styles.scss';
import navigator from '@/plugins/navigator.plugin';
import str from '@/plugins/string.plugin';
import time from '@/plugins/time.plugin';
import router from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import DialogService from 'primevue/dialogservice';
import DynamicDialog from 'primevue/dynamicdialog';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import { name } from '../package.json';

//앱 정보 출력
console.log(`*******************************************************`);
console.log(`* ${name}`);
console.log(`* User Agent : ${window.navigator.userAgent}`);
console.log(`*******************************************************`);
for (const key in import.meta.env) {
  console.log(`- ${key} : ${import.meta.env[key]}`);
}
console.log(`*****************************************************  **`);

//---------------------------------
// VUE
//---------------------------------
//뷰인스턴스 생성
const app = createApp(App);

//뷰 미들웨어 등록
app.use(router);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(str); //문자열 플러그인 등록
app.use(time); //시간 플러그인 등록
app.use(navigator); //URL Navigator 플러그인
app.use(PrimeVue); //PrimeVue 설정 등록
app.use(ConfirmationService);
app.use(DialogService);
app.use(ToastService);

app.component('ConfirmDialog', ConfirmDialog);
app.component('DynamicDialog', DynamicDialog);
app.component('Toast', Toast);

app.mount('#app');
