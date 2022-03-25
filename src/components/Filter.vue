<template>
  <div id="filter-bar" @click="showHideFilter" class="fs-16">Filter <i class="xm-el-icon-plus"></i>
    <div class="filter-div font-m" style="display: none;">
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
              <el-radio label="all" size="large" style="color:#000;">All</el-radio>
            </div>
            <div style="padding:10px 0;">
              <el-radio label="pending_payment" size="large" style="color:#000;">Pending Payment</el-radio>
            </div>
            <div>
              <el-radio label="completed_payment" size="large" style="color:#000;">Completed Payment</el-radio>
            </div>
            <div style="padding:10px 0;">
              <el-radio label="failed_payment" size="large" style="color:#000;">Failed Payment</el-radio>
            </div>
            <div>
              <el-radio label="item_ship_out" size="large" style="color:#000;">Item Ship Out</el-radio>
            </div>
            <div style="padding:10px 0;">
              <el-radio label="item_received" size="large" style="color:#000;">Item Received</el-radio>
            </div>
            <div>
              <el-radio label="pending_payout" size="large" style="color:#000;">Pending Payout</el-radio>
            </div>
            <div style="padding:10px 0;">
              <el-radio label="payout_released" size="large" style="color:#000;">Payout Released</el-radio>
            </div>
            <div>
              <el-radio label="payout_rejected" size="large" style="color:#000;">Payout Rejected</el-radio>
            </div>
            <div style="padding-top:10px;">
              <el-radio label="payout_failed" size="large" style="color:#000;">Payout Failed</el-radio>
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

  .filter-div {
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
