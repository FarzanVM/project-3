import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

// import * as _ from 'lodash-es';

@Injectable({
    providedIn: 'root'
})

export class DateRangePickerHeaderService{
    constructor(){}

    validationList = {
        invalidStartDate: false,
        invalidEndDate: false,
        invalidDateRange: false,
        invalidDate: function(){
            return this.invalidStartDate || this.invalidEndDate;
        },
        isValidDate: function() {
            return this.invalidStartDate || this.invalidEndDate || this.invalidDateRange;
        }
    }
    public dateRange = new BehaviorSubject<Date>(undefined);
    private validationError = new BehaviorSubject<any>(this.validationList);
    
    // cloneValidationList = _.cloneDeep(this.validationList);

    setDateRange(value){
        this.dateRange.next(value);
    }

    getDateRange(){
        return this.dateRange;
    }

    setValidationError(k, v) {
        this.validationList[k] = v;
        this.validationError.next(this.validationList);
    }

    getValidationError(){
        return this.validationError;
    }

    destroyDateRange() {
        this.dateRange.next(undefined);
    }

    // resetValidation(){
    //     this.validationList = _.cloneDeep(this.cloneValidationList);
    //     this.validationError.next(this.cloneValidationList);
    // }

}