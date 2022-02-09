<template>
    <div class="custom-select">
        <el-select v-model="sortTabName" placeholder="Sort By">
        <el-option value="newest" label="Newest"></el-option>
        <el-option value="oldest" label="Oldest"></el-option>
        </el-select>
    </div>
</template>
<script>

export default {
};
</script>
