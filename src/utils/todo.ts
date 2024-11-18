import { TODO_PRIORITY_OPTIONS } from "../constants";
import type { TodoFilters, TodoPriority } from "../types/todo";

export const todoFilterValidator = (
  key: keyof TodoFilters,
  value: string,
): TodoFilters[keyof TodoFilters] | false => {
  switch (key) {
    case "priorityFilter": {
      const validPriorities: TodoPriority[] = TODO_PRIORITY_OPTIONS.map(
        (option) => option.value,
      );

      return validPriorities.includes(value as TodoPriority)
        ? (value as TodoPriority)
        : false;
    }

    case "keyword": {
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : false;
    }

    case "sort": {
      const validSortFields = ["createdAt", "updatedAt"];
      return validSortFields.includes(value)
        ? (value as "createdAt" | "updatedAt")
        : false;
    }

    case "order": {
      const validOrders = ["asc", "desc"];
      return validOrders.includes(value) ? (value as "asc" | "desc") : false;
    }

    default:
      return false;
  }
};
