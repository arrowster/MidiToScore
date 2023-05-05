<template>
    <v-card class="ma-10">
      <div>
        <h3>Q. What is this site?</h3>
        <p>&nbsp&nbsp This site converts .mid extension files into music score in pdf format.</p>
      </div>
      <br>
      <div>
        <h3>Q. How to use it</h3>
        <p>&nbsp&nbsp 1. Put your .mid file on "drag & drop Midi File(.mid) Plz..."zone</p>
        <p>&nbsp&nbsp 2. Make sure your .mid file below is correct and click "Convert" button</p>
        <p>&nbsp&nbsp 3. Check the converted pdf and click the Download PDF File</p>
        <p>&nbsp&nbsp 4. done.</p>
      </div>
    </v-card>
</template>

<script>
export default {
  name: "HowToUse"
}
</script>

<style scoped>
  .v-card {
    padding-left: 10px;
    padding-right: 10px;
    background-color: rgba(255, 255, 255, 0);
  }
</style>
