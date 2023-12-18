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

export interface UiDialogArgs {
  header?: string;
  message: string;
  show: boolean;
}

export interface UiAuthArgs {
  isAuth: boolean;
  requiredAuth: boolean;
  userName?: string;
  uid?: string;
}
