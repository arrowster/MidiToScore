// MenuBar    - 최종 수정 : 23/04/02 18:47 김지용 -

<template>
  <v-app-bar color="green" elevation="4" rounded app>
    <v-app-bar-title>
      <router-link to="/">MP3 To Midi</router-link>
    </v-app-bar-title>
    <v-spacer/>
    <span class="mr-2">
			test
		</span>
  </v-app-bar>
</template>

<script>
export default {
  name: "MenuBar"
}
</script>

<style lang="scss" scoped>
form{
  display: flex;
  flex-direction: row;
  align-items: center;
  .v-text-field{
    margin-right: 8px !important;
    margin-top: 10px !important;
  }
}
</style>
