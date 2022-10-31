export interface Course {
  id?: number;
  created?: Date;
  modified?: Date;
  description: string;
  authorId: number;
  authorLogin: number;
  name: string;
  statusName: string;
  categoryName: string
}
