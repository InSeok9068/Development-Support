import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';

import { name, version } from '../package.json';

// Tailwind CSS
import '@/assets/index.css';

import str from '@/plugins/stringPlugin';

//앱 정보 출력
console.log(`*******************************************************`);
console.log(`* ${name} (ver.${version})`);
console.log(`* User Agent : ${window.navigator.userAgent}`);
console.log(`*******************************************************`);
for (const key in import.meta.env) {
  console.log(`- ${key} : ${import.meta.env[key]}`);
}
console.log(`*******************************************************`);

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

app.mount('#app');
