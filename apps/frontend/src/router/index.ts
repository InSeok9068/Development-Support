import { MENU_PERMISSION_QUERY } from '@/graphql/operations/menu.operation';
import type { MenuPermissionQuery, QueryMenuPermissionArgs } from '@support/shared/types';
import { useQuery } from '@vue/apollo-composable';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeResolve((to, from, next) => {
  const openRoutes = ['/', '/login'];

  if (openRoutes.includes(to.path)) {
    return next();
  }

  const { onResult } = useQuery<MenuPermissionQuery, QueryMenuPermissionArgs>(MENU_PERMISSION_QUERY, {
    input: {
      to: to.path,
    },
  });

  onResult((result) => {
    if (!result.loading) {
      if (result.data) {
        if (result.data.menuPermission.hasAccess) {
          next();
        } else {
          next(result.data.menuPermission.redirectUrl ?? '/');
        }
      }
    }
  });
});

export default router;
