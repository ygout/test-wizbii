import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "transformToUntilDate",
})
export class TransformToUntilDatePipe implements PipeTransform {
  transform(dateStr: string): string {
    let untildDateResult: string;
    let date = new Date(dateStr);
    let diffTotalSecond: number =
      (new Date().getTime() - date.getTime()) / 1000;
    let daydiff: number = Math.floor(diffTotalSecond / 86400);

    if (isNaN(daydiff) || daydiff < 0) return null;

    if (daydiff === 0) {
      if (diffTotalSecond < 60) untildDateResult = "à l'instant";
      else if (diffTotalSecond > 60 && diffTotalSecond < 120)
        untildDateResult = "il y a 1 minute";
      else if (diffTotalSecond > 120 && diffTotalSecond < 3600)
        untildDateResult = `il y a ${Math.floor(diffTotalSecond / 60)} minutes`;
      else if (diffTotalSecond > 3600 && diffTotalSecond < 7200)
        untildDateResult = "il y a 1 heure";
      else if (diffTotalSecond > 7200 && diffTotalSecond < 86400)
        `il y a ${Math.floor(diffTotalSecond / 3600)} heures`;
    } else if (daydiff === 1) untildDateResult = "hier";
    else if (daydiff < 7) untildDateResult = `il y a ${daydiff} jours`;
    else if (daydiff > 7 && daydiff < 31)
      untildDateResult = `il y a ${Math.ceil(daydiff / 7)} semaine(s)`;

    return untildDateResult;
  }
}
