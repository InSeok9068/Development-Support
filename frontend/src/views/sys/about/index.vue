<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">{{ name }}</a>
          Vue3.0, Vite, Ant-Design-Vue 및 TypeScript를 기반으로 하는 백그라운드 솔루션으로, 중대형
          프로젝트 개발을 위한 기성품 솔루션과 풍부한 예제를 제공하는 것을 목표로 합니다. ,
          상업적으로 사용되는 코드를 제한하지 않습니다.
        </span>
      </div>
    </template>
    <Description @register="infoRegister" class="enter-y" />
    <Description @register="register" class="my-4 enter-y" />
    <Description @register="registerDev" class="enter-y" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { DescItem, Description, useDescription } from '/@/components/Description/index';
  import { DOC_URL, GITHUB_URL, SITE_URL } from '/@/settings/siteSetting';

  const { pkg, lastBuildTime } = __APP_INFO__;

  const { dependencies, devDependencies, name, version } = pkg;

  const schema: DescItem[] = [];
  const devSchema: DescItem[] = [];

  const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);
  const commonLinkRender = (text: string) => (href) => h('a', { href, target: '_blank' }, text);

  const infoSchema: DescItem[] = [
    {
      label: '버전',
      field: 'version',
      render: commonTagRender('blue'),
    },
    {
      label: '마지막 컴파일 시간',
      field: 'lastBuildTime',
      render: commonTagRender('blue'),
    },
    {
      label: '문서 주소',
      field: 'doc',
      render: commonLinkRender('文档地址'),
    },
    {
      label: '미리보기 주소',
      field: 'preview',
      render: commonLinkRender('预览地址'),
    },
    {
      label: 'Github',
      field: 'github',
      render: commonLinkRender('Github'),
    },
  ];

  const infoData = {
    version,
    lastBuildTime,
    doc: DOC_URL,
    preview: SITE_URL,
    github: GITHUB_URL,
  };

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: key });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: key });
  });

  const [register] = useDescription({
    title: '프로덕션 환경 종속성',
    data: dependencies,
    schema: schema,
    column: 3,
  });

  const [registerDev] = useDescription({
    title: '개발 환경 종속성',
    data: devDependencies,
    schema: devSchema,
    column: 3,
  });

  const [infoRegister] = useDescription({
    title: '프로젝트 정보',
    data: infoData,
    schema: infoSchema,
    column: 2,
  });
</script>
