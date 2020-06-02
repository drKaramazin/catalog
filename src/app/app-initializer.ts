import { MenuService } from './services/menu.service';

export function appInitializer(
  menuService: MenuService,
) {
  return () => Promise.all([menuService.init()]);
}
