import { describe, it, expect, test, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import TaskItem, { TaskItemProps } from './TaskItem.vue';

const createWrapper = (props?: TaskItemProps, data?: () => Object) => shallowMount(TaskItem, { props, data });

const initialProps: TaskItemProps = {
  task: {
    id: 1,
    title: "Test Title",
    completed: false
  }
};

let wrapper = createWrapper(initialProps);
describe("TaskItem component test suits", () => {
  beforeEach(() => {
    wrapper = createWrapper(initialProps);
  });
  
  it("should display task title", () => {
    const wrapper = createWrapper({
      task: {
        id: 1,
        title: "Test Title",
        completed: false
      }
    });

    const titleDiv = wrapper.find('[data-testid="task-title"]');

    expect(titleDiv.text()).toBe("Test Title");
  });

  test.each([
    { completed: true, exists: true },
    { completed: false, exists: false}
  ])('task completed: $completed --> should check icon exists, check button should has "checked" class, task title div should has "title-completed" class', ({ completed, exists }) => {
    const wrapper = createWrapper({
      task: {
        id: 1,
        title: "Test Title",
        completed: completed
      }
    });

    const checkIcon = wrapper.find<HTMLDivElement>('[data-testid="check-icon"]');
    const checkButton = wrapper.find('[data-testid="check-button"]');
    const taskTitle = wrapper.find('[data-testid="task-title"]');

    expect(checkIcon.exists()).toBe(exists);
    expect(checkButton.element.attributes.getNamedItem('class')?.value.includes("checked")).toBe(exists);
    expect(taskTitle.element.attributes.getNamedItem('class')?.value.includes("title-completed")).toBe(exists);
  });

  it("should emit toggle-task event when check button clicked", async () => {
    const checkButton = wrapper.find('[data-testid="check-button"]');
    await checkButton.trigger('click');
    expect(wrapper.emitted('toggle-task')).toBeTruthy();
  });

  it("should emit toggle-task event when item title clicked", async () => {
    const taskTitle = wrapper.find('[data-testid="task-title"]');
    await taskTitle.trigger('click');
    expect(wrapper.emitted('toggle-task')).toBeTruthy();
  });

  it("should emit remove-task event when remove button clicked", async () => {
    const removeButton = wrapper.find('[data-testid="remove-button"]');
    await removeButton.trigger('click');
    expect(wrapper.emitted('remove-task')).toBeTruthy();
  });
});