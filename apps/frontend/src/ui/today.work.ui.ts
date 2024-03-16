export interface UiTodayWorkSubItemArgs {
  itemId: number;
  content: string;
  time: number;
}

export interface UiTodayWorkItemArgs {
  id: number;
  title: string;
  time: number;
  subItem: UiTodayWorkSubItemArgs[];
}

export interface UiTodayWorkSuggestions {
  suggestion: string[];
}
