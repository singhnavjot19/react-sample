import { sp,Item,IItemAddResult } from "@pnp/sp/presets/all";
import { IReactSamplewpState } from "../webparts/reactSamplewp/components/IReactSamplewpState";
import { ChoiceGroup } from 'office-ui-fabric-react';


export class SPService {
  // method to bond value to drop down
    public static async getMasterData(): Promise<any[]> {
        let finalItems: any[] = [];
    
        let items: any[] = await sp.web.lists.getByTitle('Asset').items.select('Title').get();
        

      
        items.map(async (item) => {
          finalItems.push({
              key:item.Title,
              text:item.Title
          });
          //finalItems.push(item.approver.EMail);
        });
       
      
    
        return Promise.resolve(finalItems);
    }

    
  public static async getListItems(list: string): Promise<any[]> {
    let finalItems: any[] = [];

    let items: any[] = await sp.web.lists.getByTitle(list).items.select('ID,Asset,Title,SupplierOwner/EMail').expand('SupplierOwner').get();
 
    items.map(async (item) => {

      finalItems.push({
        key:item.ID,
        text:item.Title
    });
    });
    
  

    return Promise.resolve(finalItems);
  }

  // method to bind value to my request table
  public static async getMyRequest(list: string): Promise<any[]> {
    let finalItems: any[] = [];
    let curruser = await sp.web.currentUser.get() 
    
       
    let items: any[] = await sp.web.lists.getByTitle(list).items.select('ID,Asset,Title,SupplierOwner/EMail,SupplierOwner/Title,Author/EMail').expand('SupplierOwner,Author').filter(`Author/EMail eq '${curruser.Email}'`).get();
    
    items.map(async (item) => {

      finalItems.push({
        ID:item.ID,
        Title:item.Title,
        Asset:item.Asset,
        SupplierOwner:item.SupplierOwner[0].Title
    });
    });


    return Promise.resolve(finalItems);
  }
// method to delete item in bulk from list
  public static async deleteItems(listitems: any[],list:string,delItemsct:any[]){
    if(!confirm('Please confirm if you want to delete the form request(s)?')){return false;}
    let finalItems: any[] = [];
  
    for(let i=0;i<delItemsct.length;i++)
    {
        let items = await sp.web.lists.getByTitle(list).items.getById(delItemsct[i]).delete();   
    }
    
    
    alert('Request Deleted successfully')
    
    window.location.href =window.location.href;

  }
  // method to create item in SPList using pnp js
  public static createItem1(list:string, state:IReactSamplewpState){
    if(!confirm('Please confirm if you want to submit the form?')){return false;}
    
    sp.web.lists.getByTitle(list).items.add({  
      'Title': `${state.uname}` ,
      'Asset': `${state.choice.key}`,
      'Price': `${state.sliderval}`,
      'Comments':`${state.Comments}`,
      'SupplierOwnerId': {   
        results: state.addUsers 
    } 
        
    }).then((result: IItemAddResult):void=>{
   
      alert('Request submitted successfully')
      window.location.href =window.location.href;
      
    }, (error: any): void => {  
     
      alert('An error occurred. Please contact system administrator')
    });
  }
  
}