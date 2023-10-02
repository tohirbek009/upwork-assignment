<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import initialTasks from '../data/initial-tasks.json';

interface taskItemInterface {
  id: number | string,
  title: string,
  completed: boolean
}

const isLoading = ref(false);
const newTaskTitle = ref("");
const taskItems = ref<Array<taskItemInterface>>([]);

const totalTasksCount = computed(() => {
  return taskItems.value.length;
});

const completedTasksCount = computed(() => {
  return taskItems.value.filter(task => task.completed).length;
});

const remainingTasksCount = computed(() => {
  return taskItems.value.filter(task => !task.completed).length;
});

const percentageOfCompletion = computed(() => {
  if (totalTasksCount.value === 0) return 0;
  return Math.floor(completedTasksCount.value * 100 / totalTasksCount.value)
});

const isNewTaskTitleAvailable = computed(() => {
  return newTaskTitle.value.length > 0;
});

function setTasks() {
  isLoading.value = true;

  setTimeout(() => {
    taskItems.value = initialTasks;
    isLoading.value = false;
  }, 500)
};

function addNewItem() {
  if (isNewTaskTitleAvailable) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle.value,
      completed: false
    }
    taskItems.value.unshift(newTask);
    newTaskTitle.value = "";
  }
};

function toggleTask(taskId: number | string) {
  taskItems.value.forEach((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }
  });
};

function removeTask(taskId: number | string) {
  taskItems.value = taskItems.value.filter(taskItem => taskItem.id !== taskId);
};

onMounted(() => {
  setTasks();
});
</script>

<template>
  <div class="container">
    <div class="tasks-wrapper">

      <div class="tasks-header">
        <div class="add-task">
          <input 
            data-testid="new-task-input"
            v-model.trim="newTaskTitle"
            class="add-task__input" 
            type="text" 
            placeholder="What are you working on?"
            v-on:keydown.enter="addNewItem"
          />
          <button
            data-testid="new-task-button"
            v-if="isNewTaskTitleAvailable" 
            class="add-task__button app-button" 
            v-on:click="addNewItem"
          >
            + Add
          </button>
        </div>

        <div class="tasks-count">Tasks: {{ totalTasksCount }}</div>

        <div class="tasks-status">
          <span>Remaining: {{ remainingTasksCount }}</span>
          <div class="tasks-status__divider"></div>
          <span>Completed: {{ completedTasksCount }} ({{ percentageOfCompletion }}%)</span>
        </div>
      </div>

      <div class="tasks-list">
        <div data-testid="task-items-list" v-if="totalTasksCount > 0">
          <task-item
            v-for="task in taskItems"
            v-bind:data-testid="`task-item-${task.id}`"
            v-bind:key="task.id" 
            v-bind:task="task" 
            v-on:toggle-task="toggleTask"
            v-on:remove-task="removeTask" 
          />
        </div>
        <div v-else-if="isLoading" class="tasks-list__empty">
          Loading <i class="fa-solid fa-spinner fa-spin"></i>
        </div>
        <div  v-else class="tasks-list__empty">
          No Tasks
        </div>
      </div>

      <NuxtLink to="/" class="router-link back-btn">
        <button class="app-button">Back to Home</button>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/style.scss";

.tasks-wrapper {
  width: 520px;
  margin: 0 auto;

  @media (max-width: 536px) {
    & {
      width: 100%;
    }
  }

  .tasks-header {
    position: sticky;
    background-color: white;
    top: 0;
    padding: 1rem 0;
    width: 100%;
    .add-task {
      width: 100%;
      position: relative;

      &__input {
        width: 100%;
        height: 3.75rem;
        padding: 1rem 5.5rem 1rem 1rem;
        font-size: 1rem;
        color: $black;
        border: 1px solid transparent;
        outline: none;
        background-color: $grayLight;
        border-radius: 0.5rem;

        &::placeholder {
          color: $gray;
        }

        &:focus {
          border-color: $gray;
        }
      }

      &__button {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        z-index: 999;
      }
    }

    .tasks-count {
      color: $success;
      font-size: 2.5rem;
      padding: 1rem;
    }

    .tasks-status {
      padding: 0.5rem;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid $gray;
      border-bottom: 1px solid $gray;

      span {
        font-size: 1rem;
        font-weight: 700;
      }

      &__divider {
        width: 1px;
        height: 1.25rem;
        background-color: $gray;
        margin: 0 0.5rem;
      }
    }
  }
  .tasks-list {
    height: 60vh;
    overflow: auto;
    padding: 1rem 0.5rem;

    &__empty {
      font-size: 1.25rem;
      font-style: italic;
      text-align: center;
      color: $gray;
    }
  }

  .back-btn {
    button {
      margin: 1rem auto;
    }
  }
}
</style>