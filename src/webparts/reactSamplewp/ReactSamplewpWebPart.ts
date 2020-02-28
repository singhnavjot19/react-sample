import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactSamplewpWebPartStrings';
import ReactSamplewp from './components/ReactSamplewp';
import { IReactSamplewpProps } from './components/IReactSamplewpProps';

export interface IReactSamplewpWebPartProps {
  description: string;
  listNameWPProp: string;
}

export default class ReactSamplewpWebPart extends BaseClientSideWebPart<IReactSamplewpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactSamplewpProps > = React.createElement(
      ReactSamplewp,
      {
        description: this.properties.description,
        listNameReactProp: this.properties.listNameWPProp,
        context: this.context   
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listNameWPProp', {
                  label: strings.ListNameFieldLabel  
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
