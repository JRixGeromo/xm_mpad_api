<template>
  <div class="custom-tab hidden-xs-only">
    <div
      v-for="tab in tabs"
      class="tab-item"
      :key="tab"
      :class="tabName === tab.tabName ? 'selected' : ''"
      @click="tabName = tab.tabName"
    >
      <div>{{ tab.tabLabel }}</div>
    </div>
  </div>
  <div v-if="tabs" class="hidden-sm-and-up">
    <div class="custom-select">
      <el-select v-model="tabName" placeholder="Select">
        <el-option
          v-for="tab in tabs"
          :key="tab"
          :label="tab.tabLabel"
          :value="tab.tabName"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>

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
};
</script>
<style>
  .custom-tab .tab-item {
    width: 120px;
  }
</style>
