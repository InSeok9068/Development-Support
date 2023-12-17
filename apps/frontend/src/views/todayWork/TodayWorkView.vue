<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="card">
        <div class="flex flex-column gap-2">
          <label>오늘 무슨 일을 하셨나요?</label>
          <InputText v-model="todayWorkInputArgs.title" type="text" placeholder="제목" />
        </div>
        <div class="mt-1"></div>
        <Textarea v-model="todayWorkInputArgs.content" class="md:col-12" auto-resize rows="5" placeholder="내용" />
        <div class="mt-3"></div>
        <Slider v-model="todayWorkInputArgs.time" class="md:w-26rem mb-2" :min="1" :max="8" :step="1" />
        <div class="flex align-items-center md:flex-row gap-6">
          <span v-for="(item, index) in 8" :key="index">{{ item }}</span>
        </div>
        <div class="mt-3"></div>
        <Button label="등록" @click.prevent.stop="onClickRegist()"></Button>
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card flex align-items-center flex-column md:flex-row gap-3">
        <b>오늘 한일</b>
        <Calendar
          v-model="todayWorkSearchArgs.date"
          show-icon
          date-format="yy-mm-dd"
          @date-select="works(todayWorkSearchArgs)"
        />
        <Button label="주간보고서 전송" @click.prevent.stop="onClickRegist()"></Button>
      </div>
      <div class="mt-1"></div>
      <div class="card">
        <ul>
          <li
            v-for="(item, index) in todayWorkListArgs.item"
            :key="index"
            class="mb-2"
            @drop.prevent="onDrop($event, item.id)"
            @dragenter.prevent
            @dragover.prevent
          >
            <span class="text-lg font-bold">{{ `${item.title} ` }}</span>
            <span class="text-lg font-bold text-red-700">{{ `[${item.time}H]` }}</span>
            <ul class="ml-3">
              <li
                v-for="(subItem, subIndex) in item.subItem"
                :key="subIndex"
                draggable="true"
                @dragstart="onDragStart($event, subItem.id)"
              >
                <!-- <InputGroup>
                <Button icon="pi pi-check" severity="success" />
                <InputText placeholder="Vote" />
                <Button icon="pi pi-times" severity="danger" />
              </InputGroup> -->
                <InputGroup>
                  <InputGroupAddon>{{ `${subIndex + 1}) ${subItem.content} ` }}</InputGroupAddon>
                  <InputGroupAddon>{{ `[${subItem.time}H]` }}</InputGroupAddon>
                  <Button
                    class="vertical-align-baseline"
                    icon="pi pi-eraser"
                    text
                    rounded
                    @click.prevent.stop="onClickItemRemove(subItem.id)"
                  />
                </InputGroup>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
