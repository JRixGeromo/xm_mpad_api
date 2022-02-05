<template>
  <div class="multiple-upload-wrapper">
    <label class="custom-form-header form-sub-header">{{ formLabel }}</label>
    <div style="display: flex; width: 100%; overflow-x: auto; padding: 10px 0 20px 0;">
      <div v-for="image in existingImgUrls" class="upload-preview-image" :key="image" :id="image">
        <i class="el-icon-delete" @click="clearExistingImg(image)"></i>
        <el-image :src="image" :alt="image"></el-image>
      </div>
      <div v-for="image in imgFiles" class="upload-preview-image" :key="image" :id="image">
        <i class="el-icon-delete" @click="clearImg(image)"></i>
        <el-image :src="image.imageUrl" :alt="image.imageUrl"></el-image>
      </div>
      <el-form-item
        :prop="formProps"
        ref="formitem"
        class="multiple-upload-container"
      >
        <el-upload
          drag
          action
          list-type="picture-card"
          :on-change="handleImg"
          :auto-upload="false"
          :accept="fileFormat"
          :show-file-list="false"
          multiple
          :disabled="formIsDisabled"
        >
          <div>
            <span class="upload-icon">+</span>
          </div>
        </el-upload>
      </el-form-item>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { IMAGE_FORMAT } from '@/common/constants';

export default {
  props: {
    imgFiles: {
      type: Array,
      default() {
        return [];
      },
    },
    existingImgUrls: {
      type: Array,
      default() {
        return [];
      },
    },
    formLabel: {
      type: String,
      required: true,
    },
    formProps: {
      type: String,
      required: true,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    formIsDisabled: {
      type: Boolean,
    },
  },
  emits: ['update:imgFiles', 'update:existingImgUrls'],
  setup(props, context) {
    const formitem = ref(null);

    const handleImg = (file) => {
      setTimeout(() => {
        const newImageFile = {
          imageFile: file.raw,
          imageUrl: URL.createObjectURL(file.raw),
        };
        const newImageFiles = [...props.imgFiles, newImageFile];
        context.emit('update:imgFiles', newImageFiles);
        formitem.value.elForm.validateField(props.formProps);
      }, 1);
    };

    const clearImg = (file) => {
      const selectedImgIndex = props.imgFiles.indexOf(file);
      const imgFiles = [...props.imgFiles];
      imgFiles.splice(selectedImgIndex, 1);
      context.emit('update:imgFiles', imgFiles);
      formitem.value.elForm.validateField(props.formProps);
    };

    const clearExistingImg = (file) => {
      const selectedImgIndex = props.existingImgUrls.indexOf(file);
      const imageUrls = [...props.existingImgUrls];
      imageUrls.splice(selectedImgIndex, 1);
      context.emit('update:existingImgUrls', imageUrls);
      formitem.value.elForm.validateField(props.formProps);
    };

    return {
      formitem,
      fileFormat: IMAGE_FORMAT.join(','),
      handleImg,
      clearImg,
      clearExistingImg,
    };
  },
};
</script>
