import { MenuService } from './services/menu.service';

export function appInitializer(
  menuService: MenuService,
) {
  return () => {
    return new Promise((resolve) => {
      menuService.init();
      resolve();
    });
  }
}
