export interface NavigationLink {
  label: string;
  // Supports routerLink as string or commands array; use mutable Array to satisfy Angular types
  link: string | Array<string | number | Record<string, unknown>>;
  icon?: string; // Material icon name
  external?: boolean;
  target?: string;
  rel?: string;
}
