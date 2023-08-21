// /**
//  * 스크립트 main 파일로서 프레임웍, 미들웨어, 플러그인 등록
//  * @author jtmoon
//  * @copyright 한국선불카드(주)
//  * @see None
//  */
import { createApp, markRaw } from 'vue';
// import { createPinia } from 'pinia';
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// import App from '@/App.vue';
// import router from '@/router';
// import globalDirectives from '@/plugins/globalDirectives';
// import dayjs from '@/plugins/dayjsPlugin';
// import env from '@/plugins/envPlugin';
// import time from '@/plugins/timePlugin';
// import str from '@/plugins/stringPlugin';
// import obj from '@/plugins/objectPlugin';
// import typePlugin from '@/plugins/typePlugin';
// import navigator from '@/plugins/navigatorPlugin';
// import resetStore from '@/stores/plugin/reset-store';
// import api from '@/plugins/plgApiPlugin';
// import scroll from '@/plugins/scrollDetectPlugin';
// import markup from '@/plugins/markupPlugin';
// import validator from '@/plugins/validatorPlugin';
// import system from '@/plugins/systemPlugin';

// //CSS import
// //퍼블 배포시 인덱스 페이지에서 사용하는 css임. 필요없음. import '@/assets/publish/assets/css/guide.css';
// import '@/assets/publish/assets/css/common/common.css';
// import '@/assets/publish/assets/css/page/login.css';
// import '@/assets/publish/assets/css/page/mymenu.css';
// import '@/assets/publish/assets/css/page/point.css';
// import '@/assets/publish/assets/css/page/notice.css';
// import '@/assets/publish/assets/css/page/store.css';
// import '@/assets/publish/assets/css/page/main.css';
// import '@/assets/publish/assets/css/page/talk.css';
// import '@/assets/publish/assets/css/page/search.css';
// import '@/assets/publish/assets/css/page/market.css';

// //KPCARD css
// import '@/assets/base.css';

// import { version, name } from '../package.json';

// //앱 정보 출력
// console.log(`*******************************************************`);
// console.log(`* ${name} (ver.${version})`);
// console.log(`* User Agent : ${window.navigator.userAgent}`);
// console.log(`*******************************************************`);
// for (const key in import.meta.env) {
//   console.log(`- ${key} : ${import.meta.env[key]}`);
// }
// console.log(`*******************************************************`);

// //---------------------------------
// // VUE
// //---------------------------------
// //뷰인스턴스 생성
// const app = createApp(App);

// //뷰 미들웨어 등록
// app.use(router);
// const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);
// pinia.use(resetStore);
// pinia.use(({ store }) => {
//   store.$router = markRaw(router);
// });
// app.use(pinia);
// app.use(globalDirectives); //글로벌 디렉티브 plugin
// app.use(dayjs); //날짜 포멧 플러그인
// app.use(env); //로컬 스토리지 플러그인
// app.use(time); //시간 플러그인 등록
// app.use(str); //시간 플러그인 등록
// app.use(navigator); //URL Navigator 플러그인
// app.use(api); //URL Navigator 플러그인
// app.use(obj); //Object 플러그인
// app.use(typePlugin); //type 플러그인
// app.use(scroll); //scroll 플러그인
// app.use(markup); //markup 플러그인
// app.use(validator); //validator 플러그인
// app.use(system); //validator 플러그인

// app.mount('#app');
