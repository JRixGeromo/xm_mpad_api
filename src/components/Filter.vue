<template>
  <div id="filter-bar" @click="showHideFilter" class="fs-20">Filter <i class="xm-el-icon-plus"></i>
    <div id="filter-div" style="display: none;" class="font-m">
      <el-row>
          <el-col :span="24">
          <p style="font-weight: bold; margin-bottom: 0px; margin-top: 0px" class="fs-16">Licensors</p>
          </el-col>
          <el-col :span="12" :xs="24" class="py-4" v-for="tab in tabs" :key="tab">
            <el-checkbox
            v-model="tab.index"
            :label="tab.tabLabel"
            size="large"
            @click="getTabLicense(tab.index, tab.tabName)"
            ></el-checkbox>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="24">
          <p style="font-weight: bold; margin-bottom: 0px" class="fs-16">Status</p>
          </el-col>
          <el-col :span="24" class="py-4">
          <el-radio-group v-model="activeStatus">
            <div style="padding-top:5px;">
              <el-radio :label="1" size="large" style="color:#000;">All</el-radio>
            </div>
            <div style="padding:10px 0;">
              <el-radio :label="2" size="large" style="color:#000;">Pending</el-radio>
            </div>
            <div>
              <el-radio :label="3" size="large" style="color:#000;">Completed</el-radio>
            </div>
          </el-radio-group>
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
    getTabLicense: {
      type: Function,
      required: true,
    },
  },
  emits: ['update:modelValue', 'newActiveStatus'],
  watch: {
    tabName(newTabName) {
      this.$emit('update:modelValue', newTabName);
    },
    activeStatus(newActiveStatus) {
      this.$emit('newActiveStatus', newActiveStatus);
    },
  },
  data() {
    return {
      tabName: this.modelValue,
      activeStatus: 1,
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
      padding: 20px;
      max-width: 300px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>
