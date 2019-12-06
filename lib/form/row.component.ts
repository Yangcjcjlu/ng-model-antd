import { Component, ComponentFactory, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgdsFormComp } from './form.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngds-form-row',
  template: `
      <div nz-row [nzGutter]="gutter" [nzType]="nzType">
        <div #rowRef><div>
      </div>
    `
})
export class NgdsFormRow extends NgdsFormComp {
  constructor() {
    super();
  }
  @ViewChild("rowRef", { static: true, read: ViewContainerRef }) rowRef: ViewContainerRef;
  gutter: number;
  nzType: string;


  setValue(value: any) {
  }
  onChange() {
  }
  addCol(compFactory: ComponentFactory<any>): ComponentRef<any> {
    return this.rowRef.createComponent(compFactory);
  }
}
