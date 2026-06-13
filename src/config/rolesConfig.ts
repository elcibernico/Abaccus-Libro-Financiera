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

export interface RoleConfig {
  label: string;
  theme: string;
}

export const ROLES_DICTIONARY: Record<string, RoleConfig> = {
  root: {
    label: 'MEGA ADMIN / OWNER',
    theme: 'bg-red-500/10 text-red-500 border-red-500/20'
  },
  admin: {
    label: 'ADMINISTRADOR',
    theme: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
  },
  docente: {
    label: 'DOCENTE / CÁTEDRA',
    theme: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
  },
  profesor: {
    label: 'DOCENTE / CÁTEDRA',
    theme: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
  },
  jefe_catedra: {
    label: 'JEFE DE CÁTEDRA',
    theme: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
  },
  adjunto: {
    label: 'DOCENTE ADJUNTO',
    theme: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
  },
  ayudante: {
    label: 'AUXILIAR / AYUDANTE',
    theme: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
  },
  alumno: {
    label: 'ALUMNO',
    theme: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  },
  user: {
    label: 'ALUMNO',
    theme: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  },
  guest: {
    label: 'INVITADO (GUEST)',
    theme: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  }
};


