<template>
  <Html>
    <Head>
      <!-- Google fonts -->
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
      <Link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      <!-- Fontawesome -->
      <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      <Title>Vue3 - Nuxt Todo App</Title>
    </Head>
  </Html>
  
  <div id="app">
    <NuxtPage />
  </div>
</template>

<script setup></script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Roboto', sans-serif;
}

#app {
  height: 100vh;
}
</style>
