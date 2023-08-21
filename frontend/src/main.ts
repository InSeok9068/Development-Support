/**
 * 스크립트 main 파일로서 프레임웍, 미들웨어, 플러그인 등록
 * @author jtmoon
 * @copyright 한국선불카드(주)
 * @see None
 */
import App from '@/App.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';

import { name, version } from '../package.json';

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
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.mount('#app');
