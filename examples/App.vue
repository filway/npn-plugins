<template>
  <div id="app">
    <h1>NPN Plugins Demo</h1>
    <p>
      <router-link to="/search" class="nav">Search</router-link>
      <router-link to="/upload" class="nav">Upload</router-link>
    </p>
    <div class="demo-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
p {
  margin-bottom: 50px;
}
.nav {
  margin-right: 10px;
}
.nav.router-link-active {
  background-color: #faf;
}
.demo-wrapper {
  border: 1px dashed lightblue;
}
</style>