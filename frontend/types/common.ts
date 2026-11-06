export type ID = string;
export type ISODate = string;
export interface Owned { id: ID; universityId: string; ownerId: ID; createdAt: ISODate }
