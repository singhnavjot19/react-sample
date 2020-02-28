import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import styles from './ReactSamplewp.module.scss';
import { IReactSamplewpProps } from './IReactSamplewpProps';
import { IReactSamplewpState } from './IReactSamplewpState';
import { escape } from '@microsoft/sp-lodash-subset';
import { IListItem } from './IListItem';
import { SPService } from '../../../service/SPService';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { DefaultButton, PrimaryButton, IStackTokens,autobind } from 'office-ui-fabric-react';
import { getGUID } from "@pnp/common"; 

import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 }
};
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } }
  
};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 }
};
const stackTokens: IStackTokens = { childrenGap: 40 };

export default class ReactSamplewp extends React.Component<IReactSamplewpProps, IReactSamplewpState> {

  constructor(props: IReactSamplewpProps, state: IReactSamplewpState) {
    super(props);

    this.state = {
      status: 'Ready',
      ddlvalue:'',
      pplusers:[],
      items: [],
      uname: '',
      operation: '',
      choice: undefined,
      addUsers:[]
    };
  }
  public render(): React.ReactElement<IReactSamplewpProps> {
    
    const { disabled, checked } = this.props;
    const { choice } = this.state;
    return (
      
      <Pivot aria-label="Basic Pivot Example">
      <PivotItem
        headerText="My Files"
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'My Files Title'
        }}
      >
        <Label styles={labelStyles}>11+{this.props.listNameReactProp}</Label>
        <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }}>
      <Stack {...columnProps}>
        <TextField label="Standard" value={this.state.uname} onChanged={e => this.setState({ uname: e })}   />
        <PeoplePicker    
                context={this.props.context}    
                titleText="People Picker"    
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

      </Stack>

      <Stack {...columnProps}>
      
      <Dropdown
          label="View"
          options={[
            { key: 'All live projects', text: 'All live projects' },
            { key: 'Proposal submitted', text: 'Proposal submitted' },
            { key: 'Project archive', text: 'Project archive' }
          ]}
          selectedKey={choice ? choice.key : undefined}
       
          onChange={this._handleChoices}
          
          styles={{ dropdown: { width: 300 } }}
          />
 

      </Stack>
    </Stack>
    <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }} >
      <DefaultButton text="Standard" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
      <PrimaryButton text="Primary" onClick={() => SPService.createItem1(this.props.listNameReactProp, this.state)} allowDisabledFocus disabled={disabled} checked={checked} />
    </Stack>
      </PivotItem>
      <PivotItem headerText="Recent">
        <Label styles={labelStyles}>Pivot #2</Label>
      </PivotItem>
      
    </Pivot> 
    );
  }
  private _handleChoices = (event: React.FormEvent<HTMLDivElement>,item: IDropdownOption): void => {
    console.log('here is the things updating...' + item.key + ' ' + item.text);
     return this.setState({ choice: item });
 }
 @autobind 
  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);

    let selectedUsers = [];
    for (let item in items) {
      selectedUsers.push(items[item].id);
    }

    this.setState({ addUsers: selectedUsers });
  } 
  
}


function _alertClicked(): void {
  alert('Clicked');
}

  