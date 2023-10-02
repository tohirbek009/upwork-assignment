<template>
  <div class="container">
    <div class="tasks-wrapper">

      <div class="tasks-header">
        <div class="add-task">
          <input 
            v-model.trim="newTaskTitle" 
            class="add-task__input" 
            type="text" 
            placeholder="What are you working on?"
            v-on:keydown.enter="addNewItem"
          />
          <button
            v-if="availableNewTaskTitle" 
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
        <div v-if="totalTasksCount > 0">
          <task-item 
            v-for="task in taskItems" 
            v-bind:key="task.id" 
            v-bind:task="task" 
            v-on:toggle-task="toggleTask"
            v-on:remove-task="removeTask" 
          />
        </div>
        <div v-else-if="isLoading" class="tasks-list__empty">
          Loading <i class="fa-solid fa-spinner fa-spin"></i>
        </div>
        <div v-else class="tasks-list__empty">
          No Tasks
        </div>
      </div>

      <RouterLink to="/" class="router-link back-btn">
        <button class="app-button">Back to Home</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import TaskItem from '@/components/TaskItem.vue';
import initialTasks from '../data/initial-tasks.json';

export default {
  components: {
    TaskItem
  },
  data() {
    return {
      isLoading: false,
      newTaskTitle: "",
      taskItems: []
    };
  },
  computed: {
    availableNewTaskTitle() {
      return this.newTaskTitle.length > 0;
    },
    completedTasksCount() {
      return this.taskItems.filter(task => task.completed).length;
    },
    remainingTasksCount() {
      return this.taskItems.filter(task => !task.completed).length;
    },
    totalTasksCount() {
      return this.taskItems.length;
    },
    percentageOfCompletion() {
      if (this.totalTasksCount === 0) return 0;
      return Math.floor(this.completedTasksCount * 100 / this.totalTasksCount)
    },
  },
  methods: {
    setTasks() {
      this.isLoading = true;

      // We can implement API call here instead of setTimeout function in the future.
      setTimeout(() => {
        this.taskItems = initialTasks
        this.isLoading = false;
      }, 500)
    },
    addNewItem() {
      if (this.availableNewTaskTitle) {
        const newTask = {
          id: new Date().getTime(),
          title: this.newTaskTitle,
          completed: false
        }
        this.taskItems.unshift(newTask);
        this.newTaskTitle = "";
      }
    },
    toggleTask(taskId) {
      this.taskItems.forEach((task) => {
        if (task.id === taskId) {
          task.completed = !task.completed;
        }
      });
    },
    removeTask(taskId) {
      this.taskItems = this.taskItems.filter(taskItem => taskItem.id !== taskId);
    },
  },
  mounted() {
    this.setTasks();
  }
};
</script>

<style scoped lang="scss">
@import "../styles/style.scss";

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