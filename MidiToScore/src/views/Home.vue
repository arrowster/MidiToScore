<template>
  <DragDropBox @update="urlChange"/>
  <MusicScoreViewer :file-url="fileUrl" />
</template>

<script >
  import MusicScoreViewer from '@/components/MusicScoreViewer.vue'
  import DragDropBox from "@/components/DragDropBox";

  export default {
    components: {
      DragDropBox, MusicScoreViewer
    },
    name: "Home",
    data() {
      return {
        fileUrl: null,
      }
    },
    methods: {
      urlChange(fileUrl) {
        this.fileUrl = fileUrl
      }
    }
  }
</script>
