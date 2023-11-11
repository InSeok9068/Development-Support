<template>
  <div class="form-control join w-2/6">
    <label class="label">
      <span class="label-text">오늘 무슨 일을 하셨나요?</span>
    </label>
    <input v-model="todayWorkInputArgs.title" class="input input-bordered" type="text" placeholder="제목" />
    <div class="mt-1"></div>
    <textarea v-model="todayWorkInputArgs.content" class="textarea textarea-bordered" placeholder="내용"></textarea>
    <div class="mt-3"></div>
    <input v-model="todayWorkInputArgs.time" type="range" min="1" max="8" class="range range-info" step="1" />
    <div class="flex justify-between px-2 text-xs">
      <span v-for="(item, index) in 8" :key="index">{{ item }}시간</span>
    </div>
    <div class="mt-3"></div>
    <button class="btn btn-primary w-1/3" @click.prevent.stop="onClickRegist()">등록</button>
  </div>
  <div class="form-control join float-right w-3/6">
    <div>
      <b class="text-2xl">오늘 한일</b>
      <input
        v-model="todayWorkSearchArgs.date"
        type="date"
        class="m-2 w-min rounded-xl border border-black pl-1"
        @change="works(todayWorkSearchArgs)"
      />
      <input type="month" class="m-2 hidden w-min rounded-xl border border-black pl-1" />
      <input type="week" class="m-2 hidden w-min rounded-xl border border-black pl-1" />
      <button class="btn btn-neutral float-right" @click.prevent.stop="onSendWeeklyReport()">주간보고서 전송</button>
    </div>
    <div class="mt-1"></div>
    <ul>
      <li
        v-for="(item, index) in todayWorkListArgs.item"
        :key="index"
        class="mb-2"
        @drop.prevent="onDrop($event, item.id)"
        @dragenter.prevent
        @dragover.prevent
      >
        <span class="text-lg font-bold">{{ `- ${item.title} ` }}</span>
        <span class="text-lg font-bold text-red-700">{{ `[${item.time}H]` }}</span>
        <ul class="ml-3">
          <li
            v-for="(subItem, subIndex) in item.subItem"
            :key="subIndex"
            draggable="true"
            @dragstart="onDragStart($event, subItem.id)"
          >
            <span>{{ `${subIndex + 1}) ${subItem.content} ` }}</span>
            <span class="text-lg font-bold text-red-500">{{ `[${subItem.time}H]` }}</span>
            <button class="btn btn-square btn-ghost" @click.prevent.stop="onClickItemRemove(subItem.id)">
              <TrashIcon />
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import TrashIcon from '@/components/icon/TrashIcon.vue';
import { useTodayWork } from '@/composables/todayWork/today.work';
import type { CreateTodayWorkItemInput, UpdateTodayWorkItemForTransferInput } from '@support/shared/types';
import { onMounted } from 'vue';
const {
  todayWorkInputArgs,
  todayWorkListArgs,
  todayWorkSearchArgs,
  createTodayWorkItem,
  deleteTodayWorkItem,
  updateTodayWorkItemForTransfer,
  sendWeeklyReport,
  works,
} = useTodayWork();

onMounted(() => works(todayWorkSearchArgs.value));

const onClickRegist = () => {
  createTodayWorkItem({
    title: todayWorkInputArgs.value.title,
    content: todayWorkInputArgs.value.content,
    time: todayWorkInputArgs.value.time,
    date: todayWorkSearchArgs.value.date,
  } as CreateTodayWorkItemInput);

  todayWorkInputArgsClear();
};

const onClickItemRemove = (subIndex: number) => {
  deleteTodayWorkItem(subIndex);
};

const onDragStart = (event: DragEvent, id: number) => {
  event.dataTransfer?.setData('text', String(id));
};

const onDrop = (event: DragEvent, id: number) => {
  updateTodayWorkItemForTransfer({
    id: String(id),
    itemId: event.dataTransfer?.getData('text'),
  } as UpdateTodayWorkItemForTransferInput);
};

const onSendWeeklyReport = () => {
  sendWeeklyReport();
};

const todayWorkInputArgsClear = () => {
  todayWorkInputArgs.value = {
    title: '',
    content: '',
    time: 1,
  };
};
</script>
