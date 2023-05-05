<template>
  <DragDropBox @update="urlChange"/>
  <MusicScoreViewer :file-url="fileUrl"/>
  <how-to-use/>
</template>

<script >
  import MusicScoreViewer from '@/components/MusicScoreViewer.vue'
  import DragDropBox from "@/components/DragDropBox";
  import HowToUse from "@/components/HowToUse";

  export default {
    components: {
      DragDropBox, MusicScoreViewer, HowToUse
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
