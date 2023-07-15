export interface CheckboxItem {
  label: string;
  value: string | number | boolean;
  disabled?: boolean = false;
}

export interface RadioItem {
  label: string;
  value: string | number | boolean;
}
