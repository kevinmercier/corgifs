import {Component} from 'angular2/core';

@Component({
  selector: 'repeater',
  templateUrl: 'app/repeater.template.html'
})

export class Repeater {
  public users = [
    { name: 'Jilles', age: 21 },
    { name: 'Todd', age: 24 },
    { name: 'Lisa', age: 18 }
  ];
}
