export interface MenuItem {
  label: string;
  cssClass: string;
  link?: string;
  holder?: () => void;
}
