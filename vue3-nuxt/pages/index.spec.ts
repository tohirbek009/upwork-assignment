import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import IndexPage from './index.vue';

const push = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push
  }),
}));

const createWrapper = () => shallowMount(IndexPage);

let wrapper = createWrapper();

describe("Index page test suits", () => {
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it("should go the tasks view when 'Lets Go' button clicked", async () => {
    const gotoButton = wrapper.find('[data-testid="go-to-tasks"]');
    await gotoButton.trigger('click');

    expect(push).toHaveBeenCalledWith('/tasks');
  });
});