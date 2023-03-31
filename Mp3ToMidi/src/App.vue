<template>
  <v-app>
    <menuBar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
 import menuBar from "./components/menuBar"
 export default {
   name: 'App',
   components: { menuBar },
 }
</script>
