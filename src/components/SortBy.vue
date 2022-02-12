<template>
    <div class="custom-select">
        <el-select
            v-model="sortBy"
            placeholder="Sort By"
            @change="getSortBy(sortBy)"
            >
                <el-option
                    v-for="sort in sortOptions"
                    v-bind:value="sort.label"
                    v-bind:key="sort.label"
                    >
                    {{ sort.label }}
                </el-option>
        </el-select>
    </div>
</template>
<script>

export default {
  props: {
    getSortBy: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      sortBy: null,
      sortOptions: [
        {
          label: 'Newest',
        },
        {
          label: 'Oldest',
        },
      ],
    };
  },
};
</script>
