
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  CASE_OFFICER = 'CASE_OFFICER',
  SUPPORT_STAFF = 'SUPPORT_STAFF',
  CLIENT = 'CLIENT'
}

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  IN_REVIEW = 'IN_REVIEW',
  DOCUMENTS_REQUIRED = 'DOCUMENTS_REQUIRED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface VisaApplication {
  id: string;
  clientId: string;
  country: string;
  visaType: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  progress: number;
}

export interface Document {
  id: string;
  applicationId: string;
  name: string;
  type: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  uploadDate: string;
  comment?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
}
