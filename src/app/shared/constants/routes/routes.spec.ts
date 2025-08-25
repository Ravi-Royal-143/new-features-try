import { ROUTES } from './index';

describe('ROUTES shape', () => {
  it('has expected top-level keys', () => {
    expect(Object.keys(ROUTES)).toEqual([
      'root',
      'material',
      'rxjs',
      'forms',
      'performance',
      'signal',
      'contentProjection',
      'routingDetails',
    ]);
  });

  it('root contains expected keys', () => {
    expect(ROUTES.root).toEqual(
      jasmine.objectContaining({ material: jasmine.any(String), forms: jasmine.any(String) }),
    );
  });
});
