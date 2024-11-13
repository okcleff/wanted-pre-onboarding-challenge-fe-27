import React, { useState, useEffect } from "react";

import CommonInput from "../common/CommonInput";
import CommonSelect from "../common/CommonSelect";
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
  const handlePriorityChange = (priority: TodoFilters["priorityFilter"]) => {
    setFilters((prev) => ({
      ...prev,
      priorityFilter: priority,
    }));
  };

  // ---------- 검색어 입력 로직 ----------
  const [searchInput, setSearchInput] = useState(filters.keyword || "");
  const debouncedSearch = useDebounce(searchInput).trim();

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      keyword: debouncedSearch || undefined,
    }));
  }, [debouncedSearch, setFilters]);
  // ---------- 검색어 입력 로직 ----------

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
      <CommonSelect
        value={filters.priorityFilter || ""}
        onChange={(e) =>
          handlePriorityChange(e.target.value as TodoFilters["priorityFilter"])
        }
        options={[{ value: "", label: "전체" }, ...TODO_PRIORITY_OPTIONS]}
      />

      <CommonInput
        type="text"
        placeholder="검색어 입력..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        wrapperClassName="mt-0"
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
