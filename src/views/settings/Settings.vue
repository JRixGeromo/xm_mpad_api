<template>
  <div class="px-40">
    <!-- <el-row class="hidden-xs-only">
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
    </el-row> -->
    <el-row class="hidden-xs-only">
      <el-col :span="24">
        <h2 class="main-title">Settings</h2>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <div style="border: 1px solid #C4C4C4; padding: 0 20px; border-radius:10px;">
          <el-collapse>
            <el-collapse-item title="Marketplace Logo">
              <div>Upload a logo in .jpg or .png format.</div>
              <el-row>
                <el-col :span="6" :xs="24" style="text-align: center; margin-top: 20px;">
                  <div style="border: 1px solid #C4C4C4; padding: 20px 10px;">
                    <div style="text-align: center"><img :src="marketPlaceLogo" style="max-width: 186px"/></div>
                    <h1 class="custom-menu-title">XMarketplace</h1>
                  </div>
                </el-col>
                <el-col :span="12" :offset="1" :xs="{offset:0,span:24}" class="d-flex-center mobile-center">
                  <div>
                    <el-upload
                      action=""
                      :show-file-list="false"
                      :on-change="handleLogoImg"
                      :auto-upload="false"
                      :accept="fileFormat"
                    >
                    <u>Upload a new logo</u>
                    </el-upload>
                  </div>
                </el-col>
              </el-row>
              <el-row class="mobile-center">
                <el-col :span="6" :xs="24">
                  <div style="text-align: center;"><u>marketplacelogo.png</u></div>
                </el-col>
              </el-row>
              <el-row class="mobile-center" style="margin-top: 15px;">
                <el-col :span="24" :xs="24" style="text-align: right">
                  <span class="mobile-center">
                    <el-button
                      class="font-bold discard-btn custom-btn"
                      @click="discardLogo"
                    >DISCARD
                    </el-button>
                    <el-button
                      class="font-bold save-btn custom-btn"
                      @click="updateLogo"
                    >SAVE
                    </el-button>
                  </span>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <div style="border: 1px solid #C4C4C4; padding: 0 20px; border-radius:10px;">
          <el-collapse>
            <el-collapse-item title="Payment Modes">
              <div>Select the payment modes that buyers can pay with.</div>
              <div style="margin-top: 10px;">
                <el-row>
                  <el-col :span="4" :xs="24">
                    <el-checkbox label="Binance" name="type"></el-checkbox>
                    <br/>
                    <el-checkbox label="Enjin" name="type"></el-checkbox>
                    <br/>
                    <el-checkbox label="Trust Wallet" name="type"></el-checkbox>
                  </el-col>
                  <el-col :span="12" :offset="1" :xs="{offset:0,span:24}">
                    <el-checkbox label="Coinbase" name="type"></el-checkbox>
                    <br/>
                    <el-checkbox v-model="input" label="Metamask" name="type"></el-checkbox>
                    <br/>
                    <div style="width: 400px;">
                      <el-checkbox label="Other:" name="type"></el-checkbox>
                      <input type="text" style="height: 5px; margin-left: 10px;">
                    </div>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20px;">
                  <el-col :span="24" :xs="24" style="text-align: right">
                    <span class="mobile-center">
                      <el-button
                        class="font-bold discard-btn custom-btn"
                      >DISCARD
                      </el-button>
                      <el-button
                        class="font-bold save-btn custom-btn"
                      >SAVE
                      </el-button>
                    </span>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <div style="border: 1px solid #C4C4C4; padding: 0 20px; border-radius:10px;">
          <el-collapse>
            <el-collapse-item title="Commission Percentage">
              <div>Input the amount of commission to be deducted from the sale price before releasing to the seller.</div>
              <div style="margin-top: 10px;">
                <el-row>
                  <el-col :span="24">
                    <div style="width: 160px;">
                      <input
                        v-model="commission"
                        type="number"
                        placeholder="Type...."
                        style="height: 10px;"><span class="fw-700 fs-20 fm-montserrat">%</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20px;">
                  <el-col :span="24" :xs="24" style="text-align: right">
                    <span class="mobile-center">
                      <el-button
                        class="font-bold discard-btn custom-btn"
                      >DISCARD
                      </el-button>
                      <el-button
                        class="font-bold save-btn custom-btn"
                        @click="updateCommission"
                      >SAVE
                      </el-button>
                    </span>
                  </el-col>
                </el-row>

              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import configurationServices from '@/services/configuration-service';
import fileUploadServices from '@/services/file-upload-service';
import axios from 'axios';
import { SetAuthHeader } from '@/services/api';
import { ElMessage } from 'element-plus';

export default {
  name: 'Settings',
  setup() {
    const input = ref('');
    const commission = ref(0);
    const marketPlaceLogo = ref('');
    const configuration = ref([]);
    const configurationLogo = ref([]);
    const logo = ref({
      imageUrl: null,
      imageFile: null,
    });
    onMounted(async () => {
      configuration.value = await configurationServices.getConfigurationByName('Platform Settings');
      commission.value = configuration.value[0].configurations[0].value;
      configurationLogo.value = await configurationServices.getConfigurationByName('Marketplace Logo');
      marketPlaceLogo.value = configurationLogo.value[0].configurations[0].value;
    });
    const updateCommission = async () => {
      const obj = [{
        name: 'commission',
        value: commission.value,
        dataType: 'string',
      }];
      await axios.put(`${process.env.VUE_APP_GENERIC_API_DOMAIN}api/configuration/v1/Platform Settings`, obj, SetAuthHeader())
        .then(() => {
          ElMessage({
            message: 'Successfully Updated',
            type: 'success',
          });
        })
        .catch((error) => {
          ElMessage.error('Oops, there was an error.', error);
        });
    };

    const updateLogo = async () => {
      const fileUrl = await fileUploadServices.uploadFile(logo.value.imageFile);
      const obj = [{
        name: 'marketplace logo',
        value: process.env.VUE_APP_FILE_DOMAIN + fileUrl,
        dataType: 'string',
      }];
      await axios.put(`${process.env.VUE_APP_GENERIC_API_DOMAIN}api/configuration/v1/Marketplace Logo`, obj, SetAuthHeader())
        .then(() => {
          ElMessage({
            message: 'Successfully Updated',
            type: 'success',
          });
        })
        .catch((error) => {
          ElMessage.error('Oops, there was an error.', error);
        });
    };

    const handleLogoImg = (file) => {
      logo.value.imageUrl = URL.createObjectURL(file.raw);
      marketPlaceLogo.value = logo.value.imageUrl;
      logo.value.imageFile = file.raw;
    };
    const discardLogo = () => {
      marketPlaceLogo.value = configurationLogo.value[0].configurations[0].value;
    };
    return {
      input,
      updateCommission,
      commission,
      configurationLogo,
      configuration,
      logo,
      handleLogoImg,
      updateLogo,
      marketPlaceLogo,
      discardLogo,
    };
  },
};
</script>

<style lang="scss" scoped>
input {
  padding: 10px;
  font-size: 14px !important;
  width: 100px !important;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #000 !important;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #000 !important;
}
</style>
