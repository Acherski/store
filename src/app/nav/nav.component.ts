import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MainService } from '../main.service';
import { NavFormService } from './nav-form.service';
import { NavService } from './nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  protected searchForm = this.navFormService.searchForm;
  protected categories = this.navService.categories;
  protected visibleSubcategory: number | null = null;
  protected searchProductState$ = this.navService.searchProductState$;
  private destroyed$ = new Subject<boolean>();

  constructor(
    private navService: NavService,
    private mainService: MainService,
    private navFormService: NavFormService
  ) {}

  public ngOnInit(): void {
    this.searchForm.controls.productName.valueChanges
      .pipe(takeUntil(this.destroyed$), debounceTime(300))
      .subscribe((res) => {
        if (res === '') {
          this.navService.clearSearchData();
          return;
        }

        this.navService.searchProduct(res);
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.next(true);
  }

  protected onSearchResultClick(row: any) {
    this.searchForm.controls.productName.setValue(row.title, {
      emitEvent: false,
    });
    this.mainService.getSingleProduct(row.id);
  }

  protected onSearchFormBlur() {
    setTimeout(() => this.navService.clearSearchData(), 100);
  }

  protected showSubcategory(id: number | null) {
    this.visibleSubcategory = id;
  }
}
