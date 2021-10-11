export interface IAccessToken {
  status?: any;
  message?: any;
  accessToken?: any;
  accessTokenExpiresAt?: any;
}

export interface IPerson {
  _id: string;
  role: string;
  customFields: CustomField[];
  name: Name;
  contactEmails: ContactEmail[];
  status: string;
  invitedBy: InvitedBy;
  nameSortKey: string;
  avatar: any;
  locale: Locale;
  contactPhones: any[];
  address: Address;
  websiteLinks: any[];
  isOnboarded: boolean;
  companies: any[];
  badgeCounts: BadgeCounts;
  favoriteLinks: any[];
  timeTracking: any;
  createdAt: Date;
  createdBy: string;
  businessId: string;
  updatedAt: Date;
  userId: string;
  lastLogin: Date;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface BadgeCounts {
  notification: number;
  conversation: any[];
}

export interface ContactEmail {
  address: string;
  type: string;
}

export interface CustomField {
  _id: string;
}

export interface InvitedBy {
  _id: string;
  name: string;
}

export interface Locale {
  timezone: string;
  weekStartDay: string;
  dateFormat: string;
  timeFormat: string;
  timestampFormat: string;
}

export interface Name {
  first: string;
  last: string;
}
