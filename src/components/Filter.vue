<template>
    <div id="filter-bar" @click="showHideFilter">Filter <i class="xm-el-icon-plus"></i>
        <div id="filter-div" style="display: none;">
        <el-row style="text-align: cetner; margin-bottom: 2em;">
            <el-col :span="24">
            <p style="font-weight: bold; margin-bottom: 0px; margin-top: 0px">Licensors</p>
            </el-col>
            <el-col :span="12" :xs="24">
            <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
            </el-col>
            <el-col :span="12" :xs="24">
            <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
            </el-col>
            <el-col :span="12" :xs="24">
            <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
            </el-col>
            <el-col :span="12" :xs="24">
            <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
            </el-col>
            <el-col :span="12" :xs="24">
            <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
            </el-col>
            <el-col :span="12" :xs="24">
            <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
            </el-col>
        </el-row>
        <el-row style="text-align: cetner; margin-bottom: 2em;">
            <el-col :span="24">
            <p style="font-weight: bold; margin-bottom: 0px">Status</p>
            </el-col>
            <el-col :span="24">
            <el-radio v-model="radio1" label="1" size="large">All</el-radio>
            </el-col>
            <el-col :span="24">
            <el-radio v-model="radio1" label="1" size="large">Pending</el-radio>
            </el-col>
            <el-col :span="24">
            <el-radio v-model="radio1" label="1" size="large">Completed</el-radio>
            </el-col>
        </el-row>
        </div>
    </div>
</template>
<script>
import { showHideFilterMenu } from '@/helpers';

export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    modelValue: String,
  },
  emits: ['update:modelValue'],
  watch: {
    tabName(newTabName) {
      this.$emit('update:modelValue', newTabName);
    },
  },
  data() {
    return {
      tabName: this.modelValue,
    };
  },
  methods: {
    showHideFilter() {
      showHideFilterMenu();
    },
  },
};
</script>
<style scoped>
  #filter-bar {
      display:inline-block;
      padding:10px;
  }

  #filter-bar:hover {
      cursor:hand;
      cursor:pointer;
  }

  #filter-div {
      display:inline-block;
      position:absolute;
      top:55px;
      left: 0px;
      background-color:#fff;
      z-index: 1000;
      padding: 0px 20px 20px 20px;
      max-width: 400px;
  }
</style>
