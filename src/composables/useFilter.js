import { ref, computed } from "vue";

export function useFilter(items, fields = ["name"]) {
  const searchQuery = ref("");

  const filteredItems = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return items.value;

    return items.value.filter((item) =>
      fields.some((field) =>
        item[field]?.toLowerCase().includes(query)
      )
    );
  });

  return { searchQuery, filteredItems };
}
