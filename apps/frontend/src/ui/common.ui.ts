export interface UiToastArgs {
  severity?: 'success' | 'info' | 'warn' | 'error';
  summary?: string;
  detail: string;
  life: number;
}

export interface UiConfirmDialogArgs {
  header?: string;
  message: string;
  icon?: string;
  accept?: () => void;
  reject?: () => void;
}
