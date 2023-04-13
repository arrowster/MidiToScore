// MusicScoreViewer    - 최종 수정 : 23/04/13 14:59 김지용 -

<template>
  <v-container>
    <div class="justify-center">
      <v-btn class="ma-4" @click="pagePrev">Prev</v-btn>
      <div class="mt-6"> {{currentPage}} / {{pages}} </div>
      <v-btn class="ma-4" @click="pageNext">Next</v-btn>
    </div>
    <div class="justify-center">
      <VuePDF :pdf="pdf" :page="currentPage" />
    </div>
  </v-container>
</template>

<script>
import { usePDF, VuePDF } from '@tato30/vue-pdf'
import { ref } from 'vue'

export default {
  name: "MusicScoreViewer",

  components: {
    VuePDF
  },
  setup() {
    let pdfUrl = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
    const currentPage = ref(1)
    const { pdf, pages } = usePDF(pdfUrl)
    return {
      pdf,
      pages,
      currentPage
    }
  },
  methods: {
    pageNext() {
      this.currentPage = this.currentPage < this.pages ? this.currentPage + 1 : this.pages
      console.log(this.currentPage)
    },
    pagePrev() {
      this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1
      console.log(this.currentPage)
    }
  },
}
</script>

<style lang="scss" scoped>
.justify-center{
  display: flex;
}
</style>
