import React from "react";

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
    order: TodoFilters["order"],
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
        <option value="urgent">긴급</option>
        <option value="normal">보통</option>
        <option value="low">낮음</option>
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
            order as TodoFilters["order"],
          );
        }}
      >
        <option value="createdAt-desc">최신순</option>
        <option value="createdAt-asc">오래된순</option>
        <option value="updatedAt-desc">최근 수정순</option>
        <option value="updatedAt-asc">과거 수정순</option>
      </select>
    </div>
  );
};
export default TodoListFilter;
