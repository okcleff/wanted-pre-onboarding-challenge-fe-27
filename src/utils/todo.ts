import type { TodoFilters, TodoPriority } from "../types/todo";

export const todoFilterSanitizer = (
  key: keyof TodoFilters,
  value: string,
): TodoFilters[keyof TodoFilters] | undefined => {
  switch (key) {
    case "priorityFilter": {
      const validPriorities: TodoPriority[] = ["urgent", "normal", "low"];
      return validPriorities.includes(value as TodoPriority)
        ? (value as TodoPriority)
        : undefined;
    }

    case "keyword": {
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    }

    case "sort": {
      const validSortFields = ["createdAt", "updatedAt"];
      return validSortFields.includes(value)
        ? (value as "createdAt" | "updatedAt")
        : undefined;
    }

    case "order": {
      const validOrders = ["asc", "desc"];
      return validOrders.includes(value)
        ? (value as "asc" | "desc")
        : undefined;
    }

    default:
      return undefined;
  }
};
