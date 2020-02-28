import { sp,Item,IItemAddResult } from "@pnp/sp/presets/all";
import { IReactSamplewpState } from "../webparts/reactSamplewp/components/IReactSamplewpState";



export class SPService {
  

  public static async getListItems(list: string): Promise<any[]> {
    let finalItems: any[] = [];

    let items: any[] = await sp.web.lists.getByTitle(list).items.select('Title,approver/EMail').expand('approver').get();
    console.log(items);
    items.map(async (item) => {
      finalItems.push(item.approver[0].EMail);
      //finalItems.push(item.approver.EMail);
    });
    console.log(finalItems)
  /*  await Promise.all(
      items.map(async (item) => {
        /* finalItems.push(item.Title); */
        //finalItems.push(item);
       // let name = await sp.web.lists.getByTitle('EmplayeeName').items/* .select('Title', 'Initials') */.filter(`Initials eq '${item.Title}'`).get();
        /* finalItems.push(name[0].Title); */
        //finalItems.push(name[0]);
      //})
    //);

    return Promise.resolve(finalItems);
  }
  public static createItem1(list:string, state:IReactSamplewpState){
      console.log('11'+state.choice)
    sp.web.lists.getByTitle(list).items.add({  
      'Title': `${state.uname}` ,
      'Initials': `${state.choice.key}`,
      'empnameId': {   
        results: state.addUsers 
    } 
        
    }).then((result: IItemAddResult):void=>{
      console.log(result.data.Id);
    }, (error: any): void => {  
      console.log('error'+error); 
    });
  }
  
}