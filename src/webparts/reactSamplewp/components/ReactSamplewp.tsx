import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import styles from './ReactSamplewp.module.scss';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { IReactSamplewpProps } from './IReactSamplewpProps';
import { IReactSamplewpState } from './IReactSamplewpState';
import { SPService } from '../../../service/SPService';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { DefaultButton, PrimaryButton, IStackTokens,autobind } from 'office-ui-fabric-react';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';


import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
// Defining custom CSS for various Microsoft UI fabric controls
const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
  
};
const labelStyles1: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10,color:"red" },
  
};
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } }
  
};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 }
};
const stackTokens: IStackTokens = { childrenGap: 40 };

const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px'
});

//interface for my request dashboard
export interface IDetailsListBasicExampleItem {
  ID: number;
  Title: string;
  Asset: string;
  SupplierOwner:string;
}


let flag=0;
export default class ReactSamplewp extends React.Component<IReactSamplewpProps, IReactSamplewpState> {
  
  private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];
  constructor(props: IReactSamplewpProps, state: IReactSamplewpState) {
    super(props);
    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    
    this._allItems = [];
    

    this._columns = [
      { key: 'column1', name: 'ID', fieldName: 'ID', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column2', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column3', name: 'Asset', fieldName: 'Asset', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column4', name: 'SupplierOwner', fieldName: 'SupplierOwner', minWidth: 100, maxWidth: 200, isResizable: true }
      
    ];
//iniilizing state variables
    this.state = {
      status: 'Ready',
      errormsg:'',
      ddlvalue:'',
      pplusers:[],
      items: [],
      uname: '',
      operation: '',
      choice: undefined,
      addUsers:[],
      choicesselectedItems: this._choices,
      detitems: this._allItems,
      selectionDetails: this._getSelectionDetails(),
      allitems:[],
      detailslist:[],
      sliderval:0,
      Comments:''
        //selectionDetails: ''
    };
    
    
  
  }

  public componentDidMount() {
    
    SPService.getMasterData().then((data) => {
      this.setState({ choicesselectedItems: data });
    });
    SPService.getMyRequest(this.props.listNameReactProp).then((data) => {

      this._allItems=data;
      
      this.setState({ detitems: data });
     // this._allItems=data;
    });
    
  }
  public render(): React.ReactElement<IReactSamplewpProps> {
    const { detitems, selectionDetails,allitems } = this.state;
    const { disabled, checked } = this.props;
    const { choice } = this.state;

    return (
      //Microsoft UI fabric control pivot is used
      <Pivot aria-label="Pivot Example">
        
        
      <PivotItem
        headerText="New Purchase"
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'New Purchase Form'
        }}
      >
        <Label styles={labelStyles}>New Purchase Form</Label>
        <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }}>
      <Stack {...columnProps}>
        <TextField label="Purchase Title" value={this.state.uname} required={true} onChanged={e => this.setState({ uname: e })}   />
        <PeoplePicker    
                context={this.props.context}    
                titleText="Supplier Owner"    
                personSelectionLimit={3} 
                defaultSelectedUsers={this.state.pplusers}   
                groupName={""} // Leave this blank in case you want to filter from all users    
                showtooltip={true}    
                isRequired={true}    
                disabled={false}                    
                ensureUser={true}    
                selectedItems={this._getPeoplePickerItems}    
                showHiddenInUI={false}    
                principalTypes={[PrincipalType.User]}    
                resolveDelay={1000} />
<Label styles={labelStyles1}   >{this.state.errormsg}</Label>
      
      <TextField label="Comments" value={this.state.Comments} multiline rows={3} required={true} onChanged={e => this.setState({ Comments: e })}   />
      </Stack>
      <Stack {...columnProps}>
      
      <Dropdown
          label="Asset"
          options={this.state.choicesselectedItems}
          selectedKey={choice ? choice.key : undefined}
          placeholder="Select an option"
          onChange={this._handleChoices}
          required={true}
          styles={{ dropdown: { width: 300 } }}
          />
 

      
      <Slider
          label="Price(0$-100$)"
          max={100}
          value={this.state.sliderval}
          onChange={(sliderval: number) => this.setState({ sliderval })}
          showValue={true}
        />
        </Stack>
    </Stack>
    <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }} >
    
    {/* <img src="/_layouts/15/userphoto.aspx?size=M&username=navjot.w92@ukliverpool.onmicrosoft.com"/> */}
      <DefaultButton text="Cancel" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
      <PrimaryButton text="Submit" onClick={() => this._Validation()}  allowDisabledFocus disabled={disabled} checked={checked} />
    </Stack>

      </PivotItem>
      <PivotItem headerText="My Request">
        <Label styles={labelStyles}></Label>
        <Fabric>
        <div className={exampleChildClass}>{selectionDetails}</div>
        <Announced message={selectionDetails} />
        <TextField
          className={exampleChildClass}
          label="Filter by Purchase Name:"
          onChange={this._onFilter}
          styles={{ root: { maxWidth: '300px' } }}
        />
        <PrimaryButton text="Delete" onClick={() => SPService.deleteItems(this.state.detailslist,this.props.listNameReactProp,this.state.detailslist)} allowDisabledFocus disabled={disabled} checked={checked} />
        {/* <PrimaryButton text="Delete" onClick={() => this._Validation()} allowDisabledFocus disabled={disabled} checked={checked} /> */}
        <Announced message={`Number of items after filter applied: ${detitems.length}.`} />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={detitems}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            onItemInvoked={this._onItemInvoked}
          />
        </MarqueeSelection>
      </Fabric>
      </PivotItem>
      
    </Pivot> 
    );
  }
  private _choices: IDropdownOption[] = [];
  private _handleChoices = (event: React.FormEvent<HTMLDivElement>,item: IDropdownOption): void => {

     return this.setState({ choice: item });
 }
 @autobind 
  private _getPeoplePickerItems(items: any[]) {


    let selectedUsers = [];
    for (let item in items) {
      selectedUsers.push(items[item].id);
    }

    this.setState({ addUsers: selectedUsers });
  } 
  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();
    if(flag > 0)
    this.state.detailslist.length=0
 flag++;
for(let i=0;i<selectionCount;i++)
    {
      this.state.detailslist.push((this._selection.getSelection()[i] as IDetailsListBasicExampleItem).ID);
    }
    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).Title;
      default:
        return `${selectionCount} items selected`;
    }
    
  }

  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      detitems: text ? this._allItems.filter(i => i.Title.toLowerCase().indexOf(text) > -1) : this._allItems
      //detitems: text ? detitems.filter(i => i.name.toLowerCase().indexOf(text) > -1) : this._allItems
    });
  };

  private _Validation() {

let errmsg='';
    if(this.state.uname==''){
      errmsg+='Please enter Purchase Title\n';
    }
    if(this.state.choice===undefined){
      errmsg+='Please select Asset\n';
    }
    this.setState({ errormsg: errmsg });
    if(errmsg.length>0){
      this.setState({ errormsg: errmsg });
    }
    else{
      SPService.createItem1(this.props.listNameReactProp, this.state);
    }

    
  } 

  private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
    alert(`Item invoked: ${item.Title}`);
  };
  
}


function _alertClicked(): void {
  alert('Clicked');
}

  