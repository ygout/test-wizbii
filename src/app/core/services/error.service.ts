import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  /**
   * Handle error
   * @param error
   */
  handleError(error: Error): void {
    console.error(error);
  }
}
