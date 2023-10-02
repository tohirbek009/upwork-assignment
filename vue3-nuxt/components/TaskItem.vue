<script setup lang="ts">
export interface TaskItemProps {
  task: {
    id: number | string,
    title: string,
    completed: boolean
  }
}

const props = defineProps<TaskItemProps>();

const emits = defineEmits(['toggle-task', 'remove-task']);

function toggleTask() {
  emits('toggle-task', props.task.id);
};

function removeTask() {
  emits('remove-task', props.task.id);
};
</script>

<template>
  <div class="task-item">
    <button data-testid="remove-button" class="task-item__remove-btn button" @click="removeTask">
      <i class="fa-regular fa-trash-can"></i>
    </button>
    <div class="task-item__check">
      <button data-testid="check-button" class="checkbox button" :class="{ 'checked': task.completed }" @click="toggleTask">
        <i data-testid="check-icon" v-if="task.completed" class="fa-solid fa-check"></i>
      </button>
    </div>
    <div data-testid="task-title" class="task-item__title" :class="{ 'title-completed': task.completed }" @click="toggleTask">
      {{ task.title }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/style.scss";

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