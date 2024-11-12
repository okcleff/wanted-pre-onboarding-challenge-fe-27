import React, { useState, useEffect } from "react";

import { useDebounce } from "../../hooks/useDebounce";
import { TODO_PRIORITY_OPTIONS, TODO_SORT_OPTIONS } from "../../constants";
import type { TodoFilters } from "../../types/todo";

interface TodoListFilterProps {
  filters: TodoFilters;
  setFilters: React.Dispatch<React.SetStateAction<TodoFilters>>;
}

const TodoListFilter: React.FC<TodoListFilterProps> = ({
  filters,
  setFilters,
}) => {
  // TODO: input debounce 적용, 검색어 입력 api 요청 이후 input에 focus

  const handlePriorityChange = (priority: TodoFilters["priorityFilter"]) => {
    setFilters((prev) => ({
      ...prev,
      priorityFilter: priority,
    }));
  };

  // ---------- 검색어 입력 로직 ----------
  const [searchInput, setSearchInput] = useState(filters.keyword || "");
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      keyword: debouncedSearch || undefined,
    }));
  }, [debouncedSearch, setFilters]);
  // ---------- 검색어 입력 로직 ----------

  const handleSort = (
    sort: TodoFilters["sort"],
    order: TodoFilters["order"]
  ) => {
    setFilters((prev) => ({
      ...prev,
      sort,
      order,
    }));
  };

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={filters.priorityFilter || ""}
        onChange={(e) =>
          handlePriorityChange(e.target.value as TodoFilters["priorityFilter"])
        }
      >
        <option value="">모든 우선순위</option>
        {TODO_PRIORITY_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="검색어 입력..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <select
        value={`${filters.sort}-${filters.order}`}
        onChange={(e) => {
          const [sort, order] = e.target.value.split("-");
          handleSort(
            sort as TodoFilters["sort"],
            order as TodoFilters["order"]
          );
        }}
      >
        {TODO_SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default TodoListFilter;
