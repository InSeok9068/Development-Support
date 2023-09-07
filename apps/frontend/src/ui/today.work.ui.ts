export interface UiTodayWorkInputArgs {
  title: string;
  desc: string;
}

export interface UiTodayWorkSubItemArgs {
  desc: string;
}

export interface UiTodayWorkItemArgs {
  title: string;
  subItem: UiTodayWorkSubItemArgs[];
}

export interface UiTodayWorkListArgs {
  item: UiTodayWorkItemArgs[];
}
