import { ROUTES } from '../shared/constants';

import type { NavigationLink } from '../shared/types';

export const FORMS_SECTION_TITLE = 'Forms';
export const FORMS_SECTION_DESCRIPTION = 'Experiment with modern Angular forms patterns.';

export const FORMS_NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'FormRecord', link: ROUTES.forms.formRecord },
  { label: 'FormGroup Directive', link: ROUTES.forms.formGroupDirective },
];
