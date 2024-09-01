export class Validation {
    static inputValidation(params) {
     try {
        const trimmedParams = params.trim(); 
        if (trimmedParams !== "") {
          return trimmedParams; 
        } else  {
          return "hd wallpaper"; 
        }
     } catch (error) {
            return "hd wallpaper"; 
     }
    }
  }
  
  