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
                  <div style="border: 1px solid #C4C4C4; padding: 20px 10px;"><h1 class="custom-menu-title">XMarketplace</h1></div>
                </el-col>
                <el-col :span="12" :offset="1" :xs="{offset:0,span:24}" class="d-flex-center mobile-center">
                  <div><u>Upload a new logo</u></div>
                </el-col>
              </el-row>
              <el-row class="mobile-center">
                <el-col :span="6" :xs="24">
                  <div style="text-align: center;"><u>marketplacelogo.png</u></div>
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
                      <input type="number" placeholder="Type...." style="height: 10px;"> <b>%</b>
                    </div>
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
import { ref } from 'vue';

export default {
  name: 'Settings',
  setup() {
    const input = ref('');

    return {
      input,
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
