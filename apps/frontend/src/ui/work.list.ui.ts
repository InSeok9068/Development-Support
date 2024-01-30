export interface UiWorkListSearchArgs {
  startDate: string;
  endDate: string;
}

export interface UiWorkItemArgs {
  date: string;
  title: string;
  content: string;
  time: number;
  tag?: string;
}

export interface UiWorkListArgs {
  item: UiWorkItemArgs[];
}
