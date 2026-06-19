import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  Alpine.data('bento', () => ({
    items: [] as Array<{
      title: string;
      description: string;
      icon: string;
      number: string;
      expandTo: 'left' | 'right';
    }>,
    activeIndex: null as number | null,

    get activeItem() {
      if (
        this.activeIndex === null ||
        this.activeIndex < 0 ||
        this.activeIndex >= this.items.length
      ) {
        return null;
      }
      return this.items[this.activeIndex];
    },

    get activePanel() {
      return this.activeItem?.expandTo ?? null;
    },

    init() {
      let parsed: unknown = [];
      try {
        parsed = JSON.parse(this.$el.dataset.items || '[]');
      } catch {
        parsed = [];
      }
      this.items = Array.isArray(parsed) ? parsed : [];
      this.activeIndex = this.items.length > 0 ? 0 : null;
    },

    expand(index: number) {
      if (index < 0 || index >= this.items.length) return;
      if (this.activeIndex === index) return;
      this.activeIndex = index;
    },

    close() {
      if (this.activeIndex === null) return;
      this.activeIndex = null;
    },
  }));
};
