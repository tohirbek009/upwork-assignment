<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToTasks() {
  router.push('/tasks')
}
</script>

<template>
  <div class="container-centered">
    <div class="title">To-Do List</div>

    <div class="sub-title">Manage You Task Checklist Easily</div>

    <button data-testid="go-to-tasks" @click="goToTasks" class="app-button">Lets Go</button>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/style.scss";

.title {
  font-size: 4.5rem;
  color: $black;
  font-weight: 700;

  @media (max-width: 536px) {
    font-size: 3rem;
  }
}

.sub-title {
  font-size: 1.5rem;
  color: $black;
  font-weight: 600;
  margin-bottom: 40px;
  margin-top: 10px;
  text-align: center;
}
</style>