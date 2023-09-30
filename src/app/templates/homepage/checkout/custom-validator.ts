import { AbstractControl } from "@angular/forms";

export class CustomValidator{
    
    static validdate(control:AbstractControl){
        const date = control.value;
        const lastdate: any = new Date(new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
        if(date>=lastdate){
            return {
                invaliddate:true
            }
        }
        return null
    }

}