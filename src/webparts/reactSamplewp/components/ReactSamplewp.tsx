import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import styles from './ReactSamplewp.module.scss';
import { IReactSamplewpProps } from './IReactSamplewpProps';
import { IReactSamplewpState } from './IReactSamplewpState';
import { escape } from '@microsoft/sp-lodash-subset';
import { IListItem } from './IListItem';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { DefaultButton, PrimaryButton, IStackTokens } from 'office-ui-fabric-react';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 }
};
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } }
};
const stackTokens: IStackTokens = { childrenGap: 40 };

export default class ReactSamplewp extends React.Component<IReactSamplewpProps, IReactSamplewpState> {

  constructor(props: IReactSamplewpProps, state: IReactSamplewpState) {
    super(props);

    this.state = {
      status: 'Ready',
      items: [],
      uname: '',
      operation: ''
    };
  }
  public render(): React.ReactElement<IReactSamplewpProps> {
    const { disabled, checked } = this.props;
    return (
      
      <Pivot aria-label="Basic Pivot Example">
      <PivotItem
        headerText="My Files"
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'My Files Title'
        }}
      >
        <Label styles={labelStyles}>Pivot #1</Label>
        <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }}>
      <Stack {...columnProps}>
        <TextField label="Standard" />
        <TextField label="Disabled" disabled defaultValue="I am disabled" />
        <TextField label="Read-only" readOnly defaultValue="I am read-only" />
        <TextField label="Required " required />
        <TextField ariaLabel="Required without visible label" required />
        <TextField label="With error message" errorMessage="Error message" />
      </Stack>

      <Stack {...columnProps}>
      <TextField label="With an icon" iconProps={{ iconName: 'Calendar' }} />

        <TextField label="With an icon" iconProps={{ iconName: 'Calendar' }} />

        <TextField label="With placeholder" placeholder="Please enter text here" />
        <TextField label="Disabled with placeholder" disabled placeholder="I am disabled" />
      </Stack>
    </Stack>
    <Stack horizontal tokens={stackTokens}>
      <DefaultButton text="Standard" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
      <PrimaryButton text="Primary" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
    </Stack>
      </PivotItem>
      <PivotItem headerText="Recent">
        <Label styles={labelStyles}>Pivot #2</Label>
      </PivotItem>
      
    </Pivot> 
    );
  }
  
}
function _alertClicked(): void {
  alert('Clicked');
}

  