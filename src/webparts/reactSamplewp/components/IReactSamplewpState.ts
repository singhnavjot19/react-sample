import { IListItem } from './IListItem';  
  
export interface IReactSamplewpState {  
  status: string;  
  items: IListItem[];  
  pplusers: any[];
  addUsers: string[]; 
  uname:string;
  ddlvalue:string;
  operation: string;
  selectedItem?: { key: string | number | undefined };
  choice?: {  key: string | number | undefined};
}  