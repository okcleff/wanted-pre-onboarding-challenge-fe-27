import React from "react";

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

  const handleSearch = (keyword: string) => {
    setFilters((prev) => ({
      ...prev,
      keyword: keyword || undefined, // 빈 문자열은 undefined로 처리
    }));
  };

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
        value={filters.keyword || ""}
        onChange={(e) => handleSearch(e.target.value)}
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
