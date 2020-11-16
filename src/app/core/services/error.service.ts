import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  /**
   * Handle error
   * @param error: Error
   */
  handleError(error: Error): void {
    console.error(error);
  }
}
