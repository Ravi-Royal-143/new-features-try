import { ROUTES } from '../shared/constants';

import type { NavigationLink } from '../shared/types';

export const MATERIAL_SECTION_TITLE = 'Material';
export const MATERIAL_SECTION_DESCRIPTION = 'Angular Material components and custom tree demos.';

export const MATERIAL_NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'Mat Tree (Mine)', link: ROUTES.material.matTreeMine, icon: 'account_tree' },
  { label: 'Mat Tree (Net)', link: ROUTES.material.matTreeNet, icon: 'account_tree' },
  { label: 'Mat Tree (Net Copied)', link: ROUTES.material.matTreeNetCopied, icon: 'content_copy' },
  {
    label: 'Mat Tree (Parent Mine Custom)',
    link: ROUTES.material.matTreeParentMineCustom,
    icon: 'device_hub',
  },
];
