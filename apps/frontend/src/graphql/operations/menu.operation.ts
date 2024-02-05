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

export { MENUS_QUERY };
