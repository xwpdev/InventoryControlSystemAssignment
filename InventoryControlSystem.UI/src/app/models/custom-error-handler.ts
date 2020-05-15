import { throwError as observableThrowError } from 'rxjs';

export class CustomErrorHandler {
  public static handle = (error: any) => {
    console.error(error);
    return observableThrowError(error || 'Server error');
  }
}
