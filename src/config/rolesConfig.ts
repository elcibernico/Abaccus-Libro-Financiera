export interface UserPermissions {
  may_export_pdf: boolean;
  may_edit_records: boolean;
  may_view_advanced_charts: boolean;
}

export const ROLE_HIERARCHY: Record<string, number> = {
  root: 5,
  admin: 4,
  docente: 3,
  user: 2,
  alumno: 2,
  guest: 1
};

export const DEFAULT_ROLE_PERMISSIONS: Record<string, UserPermissions> = {
  root: {
    may_export_pdf: true,
    may_edit_records: true,
    may_view_advanced_charts: true,
  },
  admin: {
    may_export_pdf: true,
    may_edit_records: true,
    may_view_advanced_charts: true,
  },
  docente: {
    may_export_pdf: true,
    may_edit_records: false,
    may_view_advanced_charts: true,
  },
  user: {
    may_export_pdf: false,
    may_edit_records: false,
    may_view_advanced_charts: false,
  },
  alumno: {
    may_export_pdf: false,
    may_edit_records: false,
    may_view_advanced_charts: false,
  },
  guest: {
    may_export_pdf: false,
    may_edit_records: false,
    may_view_advanced_charts: false,
  },
};

export function getDefaultPermissionsForRole(role: string): UserPermissions {
  return DEFAULT_ROLE_PERMISSIONS[role] || DEFAULT_ROLE_PERMISSIONS.guest;
}

