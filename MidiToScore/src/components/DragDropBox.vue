// DragDropBox    - 최종 수정 : 23/04/19  -

<template>
  <div class="container">
    <div class="file-upload-container"
         @dragenter="onDragenter"
         @dragover="onDragover"
         @dragleave="onDragleave"
         @drop="onDrop"
         @click="onClick"
    >
      <div class="file-upload" :class="isDragged ? 'dragged' : ''">
        Drag & Drop Files
      </div>
    </div>
    <!-- 파일 업로드 -->
    <input type="file" ref="fileInput" class="file-upload-input" @change="onFileChange" multiple>
    <!-- 업로드된 리스트 -->
    <div class="file-upload-list">
      <div class="file-upload-list__item" v-for="(file, index) in fileList" :key="index">
        <div class="file-upload-list__item__data">
          <img class="file-upload-list__item__data-thumbnail" :src="file.src">
          <div class="file-upload-list__item__data-name">
            {{ file.name }}
          </div>
        </div>
        <div class="file-upload-list__item__btn-remove" @click="handleRemove(index)">
          Delete
        </div>
      </div>
    </div>
    <!-- 파일 변환 보내기 -->
    <div class="file-upload-list__item__btn-convert">
      <v-btn block elevation="4" @click="uploadFiles()">Convert</v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "DragDropBox",
  data(){
    return {
      isDragged: null,
      fileList: []
    }
  },
  methods:{
    onClick () {
      this.$refs.fileInput.click()
    },
    onDragenter (event) {
      // class 넣기
      this.isDragged = true
    },
    onDragleave (event) {
      // class 삭제
      this.isDragged = false
    },
    onDragover (event) {
      // 드롭을 허용하도록 prevetDefault() 호출
      event.preventDefault()
    },
    onDrop (event) {
      // 기본 액션을 막음 (링크 열기같은 것들)
      event.preventDefault()
      this.isDragged = false
      const files = event.dataTransfer.files
      this.addFiles(files)
    },
    onFileChange (event) {
      const files = event.target.files
      this.addFiles(files)
    },
    async addFiles (files) {
      for(let i = 0; i < files.length; i++) {
        const src = await this.readFiles(files[i])
        files[i].src = src
        this.fileList.push(files[i])
      }
    },

    // FileReader를 통해 파일을 읽어 thumbnail 영역의 src 값으로 셋팅
    async readFiles (files) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async (e) => {
          resolve(e.target.result)
        }
        reader.readAsDataURL(files)
      })
    },
    handleRemove (index) {
      this.fileList.splice(index, 1)
    },

    //uploadFiles axios 파일 전송
    uploadFiles() {
      console.log('test')
      const formData = new FormData();

      this.fileList.forEach((file) => {
        formData.append("selectedFiles", file);
      });

      axios({
        method: "POST",
        url: "/api/manager/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 300px;
  width: 500px;
  margin: 0 auto;
}
.file-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: transparent;
  border-radius: 20px;
  cursor: pointer;
  &.dragged {
    border: 1px dashed rgba(192,192,192,0.3);
    opacity: .6;
  }
  &-container {
    background-color: rgba(192,192,192,0.3);
    border: 1px solid black;

    height: 300px;

    padding: 20px;
    margin: 0 auto;
    box-shadow: 0 0.625rem 1.25rem #0000001a;
    border-radius: 20px;
  }
  &-input {
    display: none;
  }
  &-list {
    margin-top: 10px;
    width: 100%;
    &__item {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__data {
        display: flex;
        align-items: center;
        &-thumbnail {
          margin-right: 10px;
          border-radius: 20px;
          width: 120px;
          height: 120px;
        }
      }
      &__btn-remove {
        cursor: pointer;
        background-color: rgba(192,192,192,0.3);
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        border-radius: 6px;
      }
      &__btn-convert {
        width: 500px;
        color: black;
        cursor: pointer;
        border : none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        border-radius: 6px;
      }

    }
  }
}
</style>
