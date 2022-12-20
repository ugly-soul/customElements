<template>
  <nav @click="okEvent">Picker</nav>
  <xing-picker ref="xingPicker"></xing-picker>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import 'web-component-mobile/picker/xingPicker'

const xingPicker = ref()
onMounted(() => {
  nextTick(() => {
    const picker = xingPicker.value
    picker._dataList(
      {
        //需要显示几列
        columns: 3,
        axis: {
          one: { // 映射第一个数据
            data: 'yearData', // 数据源
            prop: 'date' // 显示对应key数据
          },
          two: { // 映射第二个数据
            data: 'monthData',
            prop: 'date'
          },
          three: { // 映射第三个数据
            data: 'dayData',
            prop: 'date'
          }
        },
        // 数据，需要是数组格式，不支持多维数组
        yearData: [// 第一列
          {
            date: '2022年'
          },
          {
            date: '2023年'
          },
          {
            date: '2024年'
          }
        ],
        monthData: [ // 第二列
          {
            date: '01月'
          },
          {
            date: '02月'
          },
          {
            date: '03月'
          },
          {
            date: '04月'
          },
          {
            date: '05月'
          },
          {
            date: '06月'
          },
          {
            date: '07月'
          }
        ],
        dayData: [ // 第三列
          {
            date: '01日'
          },
          {
            date: '02日'
          },
          {
            date: '03日'
          }
        ],
      }
    )
  })
})

const okEvent = () => {
  const res = xingPicker.value._getPickerValue()
  console.log(res);
}
</script>