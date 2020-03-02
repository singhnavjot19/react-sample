import { SPHttpClient } from '@microsoft/sp-http';  
import { WebPartContext } from '@microsoft/sp-webpart-base';  
export interface IReactSamplewpProps {
  description: string;
  listNameReactProp: string;
  context: WebPartContext; 
  disabled?: boolean;
  checked?: boolean;
 
}
