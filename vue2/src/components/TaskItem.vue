<template>
  <div class="task-item">
    <button class="task-item__remove-btn button" @click="removeTask">
      <i class="fa-regular fa-trash-can"></i>
    </button>
    <div class="task-item__check">
      <button class="checkbox button" :class="{ 'checked': isCompleted }" @click="toggleTask">
        <i v-if="isCompleted" class="fa-solid fa-check"></i>
      </button>
    </div>
    <div class="task-item__title" :class="{ 'title-completed': isCompleted }" @click="toggleTask">
      {{ task.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      isCompleted: this.task.completed
    }
  },
  methods: {
    toggleTask() {
      this.$emit('toggle-task', this.task.id);
      this.isCompleted = !this.isCompleted;
    },
    removeTask() {
      this.$emit('remove-task', this.task.id);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/style.scss";

.task-item {
  display: flex;
  align-items: center;

  &__remove-btn {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    font-size: 1.25rem;
    color: $gray;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }

  &__check {
    margin: 0 0.5rem;

    .checkbox {
      width: 1.15rem;
      height: 1.15rem;
      border: 1px solid $gray;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.25rem;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        filter: brightness(0.9);
      }

      i {
        color: white;
        font-size: 0.75rem;
      }
    }

    .checked {
      background-color: $success;
      border-color: $success;
    }
  }

  &__title {
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
      background-color: $grayLight;
    }
  }

  .title-completed {
    text-decoration-line: line-through;
    font-style: italic;
    color: $gray;
  }

}
</style>
