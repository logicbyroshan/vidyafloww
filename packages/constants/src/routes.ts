/**
 * @vidyamaxx/constants — Application Routes
 *
 * Centralized route definitions for web and mobile navigation.
 *
 * TODO: Expand as screens are built. Keep in sync with TanStack Router route tree.
 */

export const ROUTES = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // Dashboard
  DASHBOARD: '/dashboard',

  // Students
  STUDENTS: '/students',
  STUDENT_DETAIL: (id: string) => `/students/${id}`,
  STUDENT_NEW: '/students/new',

  // Admissions
  ADMISSIONS: '/admissions',
  ADMISSIONS_NEW: '/admissions/new',

  // Academics
  ACADEMICS: '/academics',
  TIMETABLE: '/academics/timetable',
  ATTENDANCE: '/academics/attendance',
  EXAMINATIONS: '/academics/examinations',

  // Finance
  FINANCE: '/finance',
  FEES: '/finance/fees',

  // HR
  HR: '/hr',
  STAFF: '/hr/staff',

  // Settings
  SETTINGS: '/settings',
  SETTINGS_ORGANIZATION: '/settings/organization',
  SETTINGS_USERS: '/settings/users',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
