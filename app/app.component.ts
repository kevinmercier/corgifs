import {Component} from 'angular2/core';
import {Repeater} from './repeater.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>Ayyy My First Angular 2 Apzzzzzpppzzkkzzzzzzpp</h1>
    <repeater></repeater>
  `,
  directives: [Repeater]
})

export class AppComponent { }
