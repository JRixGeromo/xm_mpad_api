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
    <el-row style="margin: 40px 0;">
      <el-col v-for="profile in profiles" :key="profile.profileId" :xs="24" :sm="6">
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
        <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { MpApiIni } from '@/services/api';
import SortBy from '@/components/SortBy.vue';
import { ref, onMounted } from 'vue';

export default {
  name: 'Users',
  components: {
    SortBy,
  },
  setup() {
    const profiles = ref([]);
    const defaultProfileImg = ref(process.env.VUE_APP_DEFAULT_PIC_URL);
    const sortTabName = ref('Sort By');

    const retreiveProfiles = (sortBy) => {
      console.log(sortBy);
      MpApiIni()
        .get('/api/mp/profile/v1/profiles')
        .then((res) => {
          profiles.value = res.data;
        });
    };

    const getSortBy = (sortBy) => {
      retreiveProfiles(sortBy);
    };

    onMounted(() => {
      retreiveProfiles('Newest');
    });

    return {
      profiles,
      defaultProfileImg,
      sortTabName,
      getSortBy,
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
