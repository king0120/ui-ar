
export interface IProject {
  id: number;
  name: string;
  shortName: string;
  director: string;
  writer: string;
  auditionDate: string;
  callbackDate: string;
  projectSummary: string;
  projectNotes: string;
  roles?: any[]
  auditions?: any[]
}