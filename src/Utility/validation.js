export class Validation {
    static inputValidation(params) {
     try {
        const trimmedParams = params.trim(); 
        if (trimmedParams !== "") {
          return trimmedParams; 
        } else  {
          return "random"; 
        }
     } catch (error) {
            return "random"; 
     }
    }
  }
  
  