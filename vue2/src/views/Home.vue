<template>
  <div class="container-centered">
    <div class="title">To-Do List</div>

    <div class="sub-title">Manage You Task Checklist Easily</div>

    <RouterLink to="/tasks" class="router-link">
      <button class="app-button">Lets Go</button>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style scoped lang="scss">
@import "../styles/style.scss";

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