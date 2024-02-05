import { gql } from '@apollo/client/core';

const MENUS_QUERY = gql`
  query Menus($input: MenusInput) {
    menus(input: $input) {
      label
      icon
      to
      component
      class
      url
      target
      badge
      preventExact
      order
      children {
        label
        icon
        to
        component
        class
        url
        target
        badge
        preventExact
        order
        children {
          label
          icon
          to
          component
          class
          url
          target
          badge
          preventExact
          order
        }
      }
    }
  }
`;

const MENU_PERMISSION_QUERY = gql`
  query MenuPermission($input: MenuPermissionInput!) {
    menuPermission(input: $input) {
      hasAccess
      message
      redirectUrl
    }
  }
`;

export { MENUS_QUERY, MENU_PERMISSION_QUERY };
