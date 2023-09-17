export interface UiTodayWorkInputArgs {
  title: string;
  content: string;
}

export interface UiTodayWorkSubItemArgs {
  id: number;
  content: string;
}

export interface UiTodayWorkItemArgs {
  id: number;
  title: string;
  subItem: UiTodayWorkSubItemArgs[];
}

export interface UiTodayWorkListArgs {
  item: UiTodayWorkItemArgs[];
}
