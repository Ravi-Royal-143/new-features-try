export interface TreeData {
  Id: number | null;
  Name: string;
  Description: string;
  Children: TreeData[];
}

export interface DialogData {
  Name: string;
  Description: string;
  Component: string;
}
