export interface UiTodayWorkInputArgs {
  title: string;
  content: string;
  time: number;
}

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

export interface UiTodayWorkListArgs {
  item: UiTodayWorkItemArgs[];
}

export interface UiTodayWorkSearchArgs {
  date: string;
}

export interface UiTodayWorkSuggestions {
  suggestion: string[];
}
