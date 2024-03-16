<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="card">
        <div class="flex flex-column gap-2">
          <label class="font-bold text-lg">오늘 무슨 일을 하셨나요?</label>
          <AutoComplete
            v-model="todayWorkInputArgs.title"
            class="flex-column"
            placeholder="제목"
            :suggestions="suggestionsArgs.suggestion"
            @complete="onCompleteSuggestions"
          />
          <Textarea v-model="todayWorkInputArgs.content" auto-resize rows="5" placeholder="내용" />
          <Slider v-model="todayWorkInputArgs.time" class="w-auto" :min="1" :max="8" :step="1" />
          <div class="flex align-items-center justify-content-between flex-row">
            <span v-for="(item, index) in 8" :key="index">{{ item }}H</span>
          </div>
          <Button label="등록" @click.prevent.stop="onClickRegist()"></Button>
        </div>
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card flex align-items-center flex-column md:flex-row gap-2">
        <div class="flex">
          <Calendar
            v-model="todayWorkSearchArgs.startDate"
            show-icon
            date-format="yy-mm-dd"
            @date-select="works(todayWorkSearchArgs)"
          />
        </div>
        <div class="flex gap-2">
          <Button icon="pi pi-caret-left" @click.prevent.stop="onClickCalendarPre()" />
          <Button icon="pi pi-caret-right" @click.prevent.stop="onClickCalendarNext()" />
        </div>
        <div class="flex">
          <Button label="주간보고서 전송" @click.prevent.stop="onClickRegist()"></Button>
        </div>
      </div>
      <div class="card">
        <label class="font-bold text-lg block mb-2"> 오늘 한일 </label>
        <ul>
          <li
            v-for="(item, index) in todayWorkListArgs"
            :key="index"
            class="mb-2"
            @drop.prevent="onDrop($event, item.id)"
            @dragenter.prevent
            @dragover.prevent
          >
            <span class="text-lg font-bold">{{ `${item.title} ` }}</span>
            <span class="text-lg font-bold text-red-700">{{ `[${item.time}H]` }}</span>
            <div
              v-for="(subItem, subIndex) in item.subItem"
              :key="subIndex"
              class="flex align-items-center gap-1"
              draggable="true"
              @dragstart="onDragStart($event, subItem.itemId)"
            >
              <span class="flex">
                {{ `${subIndex + 1}) ${subItem.content} [${subItem.time}H]` }}
              </span>
              <Button
                icon="pi pi-file-edit"
                text
                severity="help"
                @click.prevent.stop="onClickItemSelect(subItem.itemId)"
              />
              <Button
                icon="pi pi-eraser"
                text
                severity="danger"
                @click.prevent.stop="onClickItemRemove(subItem.itemId)"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlugin } from '@/composables/plugin';
import { useTodayWork } from '@/composables/todayWork/today.work';
import type { CreateTodayWorkItemInput, UpdateTodayWorkItemForTransferInput } from '@support/shared/types';
import { onMounted } from 'vue';
const {
  todayWorkInputArgs,
  todayWorkListArgs,
  todayWorkSearchArgs,
  suggestionsArgs,
  createTodayWorkItem,
  deleteTodayWorkItem,
  updateTodayWorkItemForTransfer,
  sendWeeklyReport,
  suggestions,
  works,
} = useTodayWork();
const { $time } = usePlugin();

onMounted(() => works(todayWorkSearchArgs.value));

const onClickRegist = () => {
  createTodayWorkItem({
    title: todayWorkInputArgs.value.title,
    content: todayWorkInputArgs.value.content,
    time: todayWorkInputArgs.value.time,
    date: todayWorkSearchArgs.value.startDate,
  } as CreateTodayWorkItemInput);

  todayWorkInputArgsClear();
};

const onClickItemSelect = (subIndex: number) => {};

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

const onCompleteSuggestions = async (event: any) => {
  await suggestions(event.query);
};

const onClickCalendarPre = () => {
  todayWorkSearchArgs.value.startDate = $time.minusTime(todayWorkSearchArgs.value.startDate, 1, 'day', 'YYYY-MM-DD');
  todayWorkSearchArgs.value.endDate = $time.minusTime(todayWorkSearchArgs.value.endDate, 1, 'day', 'YYYY-MM-DD');
  works(todayWorkSearchArgs.value);
};

const onClickCalendarNext = () => {
  todayWorkSearchArgs.value.startDate = $time.plusTime(todayWorkSearchArgs.value.startDate, 1, 'day', 'YYYY-MM-DD');
  todayWorkSearchArgs.value.endDate = $time.plusTime(todayWorkSearchArgs.value.endDate, 1, 'day', 'YYYY-MM-DD');
  works(todayWorkSearchArgs.value);
};

const todayWorkInputArgsClear = () => {
  todayWorkInputArgs.value = {
    ...todayWorkInputArgs.value,
    title: '',
    content: '',
    time: 1,
  };
};
</script>
