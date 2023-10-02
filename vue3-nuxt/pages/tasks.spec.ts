import { shallowMount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, beforeEach, test } from "vitest";
import tasks from './tasks.vue';

const createWrapper = (data?: () => Object) => shallowMount(tasks, { data });

let wrapper: VueWrapper<any> = createWrapper();

describe("Tasks page test suits", () => {
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test.each([
    { newTaskTitle: "Title", addButtonExists: true },
    { newTaskTitle: "", addButtonExists: false }
  ])("should show Add button when the value of add-new-task input is not empty", async ({ newTaskTitle, addButtonExists }) => {
    wrapper.vm.newTaskTitle = newTaskTitle;
    await wrapper.vm.$nextTick();

    const addButton = wrapper.find("[data-testid='new-task-button']");

    expect(addButton.exists()).toBe(addButtonExists);
  });

  test.each([
    { taskItems: [], taskItemsListExists: false },
    { taskItems: [{id:1,title:"Title",completed:false}], taskItemsListExists: true }
  ])('taskItems: $taskItems --> task items list is visable: $taskItemsListExists', async ({ taskItems, taskItemsListExists }) => {
    wrapper.vm.taskItems = taskItems;
    await wrapper.vm.$nextTick();

    const taskItemsList = wrapper.find("[data-testid='task-items-list']");

    expect(taskItemsList.exists()).toBe(taskItemsListExists);
  });

  it("should add new title to front of taskLists array when addButton clicked and clear input after adding new title", async () => {
    const input = wrapper.find("[data-testid='new-task-input']");
    input.setValue("New Task Test Title");
    wrapper.vm.taskItems = [];
    await wrapper.vm.$nextTick();

    const button = wrapper.find("[data-testid='new-task-button']");
    await button.trigger('click');

    const newTask = wrapper.vm.taskItems[0];

    expect(wrapper.vm.taskItems).toHaveLength(1);
    expect(newTask.title).toBe("New Task Test Title");
    expect(wrapper.vm.newTaskTitle).toBe("");
  });

  it("should remove one item by its ID when remove-item emits is triggred from TaskItem child component", async () => {
    wrapper.vm.taskItems = [{id: 1, title: "", completed: false}];
    wrapper.vm.removeTask(1);

    expect(wrapper.vm.taskItems).toHaveLength(0);
  });

  it("should remove one item by its ID when remove-item emits is triggred from TaskItem child component", async () => {
    wrapper.vm.taskItems = [{id: 1, title: "", completed: false}];
    wrapper.vm.toggleTask(1);

    expect(wrapper.vm.taskItems[0].completed).toBe(true);
  });
});