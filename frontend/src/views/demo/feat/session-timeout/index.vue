<template>
  <PageWrapper
    title="로그인 만료 예"
    content="사용자 로그인 만료의 예, 더 이상 로그인 페이지로 건너뛰지 않고 현재 페이지를 덮어쓰는 페이지를 직접 생성하여
    만료 전에 사용자 상태를 유지하는 데 편리합니다!"
  >
    <a-card
      title="테스트 인터페이스에 액세스하려면 아래 버튼을 클릭하십시오."
      extra="액세스된 인터페이스는 토큰 만료 응답을 반환합니다."
    >
      <a-card-grid style="width: 50%; text-align: center">
        <a-button type="primary" @click="test1">HttpStatus == 401</a-button>
      </a-card-grid>
      <a-card-grid style="width: 50%; text-align: center">
        <span></span>
        <a-button class="ml-4" type="primary" @click="test2">Response.code == 401</a-button>
      </a-card-grid>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useUserStore } from '/@/store/modules/user';

  import { sessionTimeoutApi, tokenExpiredApi } from '/@/api/demo/account';
  import { Card } from 'ant-design-vue';

  export default defineComponent({
    name: 'TestSessionTimeout',
    components: { ACardGrid: Card.Grid, ACard: Card, PageWrapper },
    setup() {
      const userStore = useUserStore();
      async function test1() {
        // 샘플 웹 사이트의 프로덕션 환경은 모의 데이터를 사용하며 Http 상태 코드를 반환할 수 없습니다.
        // 따라서 테스트 효과를 달성하기 위해 프로덕션 환경에서 상태를 직접 변경하십시오.
        if (import.meta.env.PROD) {
          userStore.setToken(undefined);
          userStore.setSessionTimeout(true);
        } else {
          // 이 API는 상태 코드 401로 응답을 반환합니다.
          await sessionTimeoutApi();
        }
      }

      async function test2() {
        // 이 API는 코드 401 및 Http 상태 코드 200으로 json 데이터를 반환합니다.
        try {
          await tokenExpiredApi();
        } catch (err) {
          console.log('인터페이스 액세스 오류：', (err as Error).message || '실수');
        }
      }

      return { test1, test2 };
    },
  });
</script>
