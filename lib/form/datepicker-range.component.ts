import { AfterContentChecked, Component } from '@angular/core';
import { NgdsFormComp } from './form.component';
import { NgdsFormDatePickerCompOption } from './form.config';


/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-date-range',
    template: `
    <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
        <nz-form-item nz-row>
            <nz-form-label nz-col [nzSpan]="option.labelSpan">
                {{option.label}}
            </nz-form-label>
            <nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
                <nz-range-picker [(ngModel)]="option.value" 
                (ngModelChange)="onChange()" 
                [nzShowTime]="option.showTime"
                [nzFormat]="option.showTime?option.format:'yyyy-MM-dd'"
                [style.width.%]="100"></nz-range-picker>
                
                <div class="form-item-tip" *ngIf="option.tip">{{option.tip}}</div>
                <div nz-form-explain *ngFor="let val of option.validations">
                    <span class="error-msg" *ngIf="getFormControl(option.property).errors&&
                    getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
                </div>
            </nz-form-control>
        </nz-form-item>
    </div>
    `,

})
export class NgdsFormDatePickerRange extends NgdsFormComp implements AfterContentChecked {
    constructor() {
        super();
    }

    option: NgdsFormDatePickerCompOption;
    data: Array<any>;
    oldValue: any;

    ngOnInit() {
    }

    ngAfterContentChecked() {
    }

    setValue(value: any) {
        if (value !== undefined) {
            this.option.value = value;
        }

        if (this.oldValue == undefined) {
            this.oldValue = value ? [value[0], value[1]] : null;
        }
    }

    onChange() {
        if (this.option.validations) {
            let formControl = this.option.formGroup.controls[this.option.property];
            formControl.setErrors({});
            for (let val of this.option.validations) {
                if (val.type == "required") {
                    if (this.option.value.length == 0) {
                        let formControl = this.option.formGroup.controls[this.option.property];
                        formControl.setErrors({ "required": true })
                    }
                }
            }
            if (formControl.errors && Object.keys(formControl.errors).length == 0) {
                formControl.setErrors(null);
            }
        }
        if (!this.option.showTime && this.option.value && this.option.value.length == 2) {
            let startDate = this.option.value[0];
            let endDate = this.option.value[1];
            this.option.value[0] = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            this.option.value[1] = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        }
        this.option.onChange && this.option.onChange(this.option);
    }

    getFormControl(name: string): any {
        return this.option.formGroup.controls[name];
    }

    getChangeValue(): any {
        if (this.oldValue || this.option.value) {
            if (this.oldValue && this.option.value) {
                if (this.option.value[0] == this.oldValue[0] &&
                    this.option.value[1] == this.oldValue[1]) {
                    return null;
                } else {
                    return {
                        oldValue: this.oldValue,
                        newValue: this.option.value
                    }
                }
            } else {
                return {
                    oldValue: this.oldValue,
                    newValue: this.option.value
                }
            }
        } else {
            return null;
        }
    }
}
