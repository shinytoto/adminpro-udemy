import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit {
  public title: string;
  public description: string;

  constructor(
    private _router: Router,
    private _title: Title,
    private _meta: Meta
  ) {
    this.getDataRoute().subscribe((response) => {
      this.title = response.title;
      this.description = response.description;

      this._title.setTitle(this.title);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.description,
      };

      this._meta.updateTag(metaTag);
    });
  }

  ngOnInit(): void {}

  getDataRoute() {
    return this._router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
