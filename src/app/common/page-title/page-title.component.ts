import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pwd-page-title',
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><h5>{{title}}</h5></li>
      </ol>
    </nav>
  `,
  styles: ['.breadcrumb{background-color : white; padding: 2px 0;}']
})
export class PageTitleComponent implements OnInit {
  @Input('title') title : string;
  constructor() { }

  ngOnInit() {
  }

}
