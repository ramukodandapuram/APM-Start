import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
name:'ConvertToSpaces'

})
export class ConvertToSpacesPipe implements PipeTransform{

    transform(value: string, character: string):string {
        //console.log(value);
        return value.replace(character,' ');
    }


}