<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <RepositoriesList
 msg="Welcome to Your Vue.js App"/>
</template>

<script>
import RepositoriesList from './components/RepositoriesList.vue'

export default {
  name: 'App',
  components: {
    RepositoriesList
  
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
