import { IListItem } from './IListItem';  
import {IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IDetailsListBasicExampleItem } from './ReactSamplewp';    
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
  choicesselectedItems:IDropdownOption[]; 
  detitems: IDetailsListBasicExampleItem[];
  selectionDetails: string;
  allitems:IListItem[]; 
  detailslist:any[];
  errormsg:string;
  sliderval:number;
  Comments:string;
}  