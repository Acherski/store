import { Injectable } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class NavFormService {
  public searchForm = this.fb.group({
    productName: this.fb.control<string>('')
  })

  constructor(private fb: NonNullableFormBuilder) {}
}
