import { AbstractControl } from "@angular/forms";

export class CustomValidator{
    static validname(control:AbstractControl){
        const name = control.value;
        if(name.includes("far")){
            return {
                invalidname:true
            }
        }
        return null
    }

    static validEmail(control:AbstractControl){
        const email = control.value;
        if(email?.includes("@gmail.com")){
            return null
        }
        return {
            invalidemail:true
        }
    }
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