import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(type: string): any {
    let icon:string = 'fa ';
    switch (type) {
    	case "gmail":
    		icon = icon + 'fa-google';
    		break;
		case "pinterest":
			icon = icon + 'fa-pinterest';
			break;
		case "amazon":
			icon = icon + 'fa-amazon';
			break;
		case "facebook":
			icon = icon + 'fa-facebook';
			break;
		case "linkedin":
			icon = icon + 'fa-linkedin';
			break;
		case "instagram":
			icon = icon + 'fa-instagram';
			break;
		case "quora":
			icon = icon + 'fa-quora';
			break;
		case "skype":
			icon = icon + 'fa-skype';
			break;
		case "stack-overflow":
			icon = icon + 'fa-stack-overflow';
			break;
    	 
    	default:
    		// code...
    		break;
    }
    return icon;
  }

}
