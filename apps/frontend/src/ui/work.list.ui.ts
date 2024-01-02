export interface UiWorkListItemArgs {
  date: string;
  title: string;
  content: string;
  time: string;
  tag?: string;
}

export interface UiWorkListArgs {
  item: UiWorkListItemArgs[];
}
