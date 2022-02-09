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
import { CONFIGURATION_NAMES } from '@/common/constants';
import configurationServices from '@/services/configuration-service';

export default {
  props: {
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
      tabs: null,
    };
  },
  async mounted() {
    await configurationServices.getConfigurationByName(CONFIGURATION_NAMES.productLicense).then((data) => {
      const raw = data[0].configurations.map((config) => JSON.parse(config.value));
      this.tabs = raw.map((el) => {
        const res = {
          tabName: el.name.toLowerCase(),
          tabLabel: el.name,
        };
        return res;
      });
    });
  },
};
</script>
