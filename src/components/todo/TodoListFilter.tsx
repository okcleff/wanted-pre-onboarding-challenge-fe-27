import React, { useState, useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";

import CommonInput from "../common/CommonInput";
import CommonSelect from "../common/CommonSelect";
import { useDebounce } from "../../hooks/useDebounce";
import {
  TODO_PRIORITY_OPTIONS,
  TODO_SORT_OPTIONS,
  INITIAL_TODO_FILTERS,
} from "../../constants";
import type { TodoFilters } from "../../types/todo";

interface TodoListFilterProps {
  filters: TodoFilters;
  setFilters: React.Dispatch<React.SetStateAction<TodoFilters>>;
}

const TodoListFilter: React.FC<TodoListFilterProps> = ({
  filters,
  setFilters,
}) => {
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value as TodoFilters["priorityFilter"];
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

  const handleSortValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sort, order] = e.target.value.split("-");
    setFilters((prev) => ({
      ...prev,
      sort: sort as TodoFilters["sort"],
      order: order as TodoFilters["order"],
    }));
  };

  const handleRefreshFilter = () => {
    setFilters(INITIAL_TODO_FILTERS);
    setSearchInput("");
  };

  return (
    <div className="flex justify-end items-center gap-4 mb-4">
      <CommonSelect
        value={filters.priorityFilter || ""}
        onChange={handlePriorityChange}
        options={[{ value: "", label: "전체" }, ...TODO_PRIORITY_OPTIONS]}
      />

      <CommonInput
        type="text"
        placeholder="검색어 입력..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        wrapperClassName="mt-0"
      />

      <CommonSelect
        value={`${filters.sort}-${filters.order}`}
        onChange={handleSortValueChange}
        options={TODO_SORT_OPTIONS}
      />

      <IoMdRefresh onClick={handleRefreshFilter} className="cursor-pointer" />
    </div>
  );
};
export default TodoListFilter;
