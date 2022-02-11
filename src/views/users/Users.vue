<template>
  <div class="px-40">
    <el-row class="hidden-xs-only">
      <el-col :span="24">
        <span>
          <el-button
            size="mini"
            icon="xm-el-icon-s-search"
            style="border-color: #fff"
            class="transparent"
          ></el-button>
        </span>
      </el-col>
    </el-row>
    <el-row class="hidden-xs-only">
      <el-col :span="12">
        <h2 class="main-title">Users</h2>
      </el-col>
      <el-col :span="4" :offset="8" class="d-flex-end">
        <SortBy :getSortBy="getSortBy" />
      </el-col>
    </el-row>
    <el-row class="py-10">
      <el-col :span="24" class="d-flex-end">
        <el-pagination
          class="table-pagination"
          layout="prev, pager, next"
          :total="pagination.totalRecord"
          :page-size="pagination.itemPerPage"
          @current-change="paginationCallback"
          :current-page="pagination.currentPage + 1"
        ></el-pagination>
      </el-col>
    </el-row>
    <el-row style="margin: 40px 0;">
      <el-col v-for="profile in dataList" :key="profile.profileId" :xs="24" :sm="6">
        <router-link :to="{ path: '/user/'+ profile.profileId}">
          <div class="profile-container">
            <div>
              <el-image
                style="width: 100px; height: 100px"
                :src="profile.displayPhotoFilePath"
                :initial-index="1"
                fit="cover"
                class="profile-img"
              >
                <template #error>
                  <div class="image-slot">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="defaultProfileImg"
                      :initial-index="1"
                    ></el-image>
                  </div>
                </template>
              </el-image>
            </div>
            <div class="user-name">{{ profile.userName }}</div>
          </div>
        </router-link>
      </el-col>
    </el-row>
    <el-row class="py-10">
      <el-col :span="24" class="d-flex-end">
        <el-pagination
          class="table-pagination"
          layout="prev, pager, next"
          :total="pagination.totalRecord"
          :page-size="pagination.itemPerPage"
          @current-change="paginationCallback"
          :current-page="pagination.currentPage + 1"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { MpApiIni } from '@/services/api';
import SortBy from '@/components/SortBy.vue';
import { ref, onMounted, onBeforeMount, watch } from 'vue';

export default {
  name: 'Users',
  components: {
    SortBy,
  },
  setup() {
    const profiles = ref([]);
    const defaultProfileImg = ref(process.env.VUE_APP_DEFAULT_PIC_URL);
    const sortTabName = ref('Sort By');
    const pagination = ref({
      itemPerPage: 8,
      totalRecord: 0,
      currentPage: 0,
    });
    const paginationTimeout = ref([]);
    const dataList = ref([]);

    onBeforeMount(() => {
      if (paginationTimeout.value.length > 0) {
        clearTimeout(paginationTimeout.value);
      }
    });

    const retreiveProfiles = (sortBy) => {
      console.log(sortBy);
      MpApiIni()
        .get('/api/mp/profile/v1/profiles')
        .then((res) => {
          profiles.value = res.data;
        });
    };

    const slicePage = (params) => {
      const paginationDetails = {
        itemPerPage: params.itemPerPage,
        totalRecord: profiles.value.length,
        currentPage: params.currentPage,
      };
      const data = {
        pagination: paginationDetails,
        data: profiles.value.slice(
          (params.itemPerPage * params.currentPage),
          (params.itemPerPage * (params.currentPage + 1)),
        ),
      };
      return data;
    };

    const getSortBy = (sortBy) => {
      retreiveProfiles(sortBy);
    };

    onMounted(() => {
      retreiveProfiles('Newest');
    });

    const paginationCallback = (page) => {
      const newPagination = {
        ...pagination.value,
        currentPage: page - 1,
      };
      const transDataList = slicePage({
        ...newPagination,
      });
      dataList.value = [];
      paginationTimeout.value = setTimeout(() => {
        dataList.value = transDataList.data;
      }, 1);
      pagination.value = transDataList.pagination;
    };
    watch(profiles, () => {
      const transDataList = slicePage({
        ...pagination.value,
      });
      dataList.value = transDataList.data;
      pagination.value = transDataList.pagination;
    });

    return {
      profiles,
      defaultProfileImg,
      sortTabName,
      getSortBy,
      dataList,
      pagination,
      paginationCallback,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}

.profile-img {
  border-radius: 50%;
}

.user-name {
  font-weight: 700;
  font-size: 20px;
  font-family: 'Montserrat';
}
</style>
