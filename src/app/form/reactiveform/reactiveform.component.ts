import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

function matchEmail(c: AbstractControl): { [key: string]: boolean } {
  const email = c.get('email');
  const confirmEmail = c.get('confirmEmail');
  if (email.pristine || confirmEmail.pristine) {
    return null;
  }
  if (email.value === confirmEmail.value)
    return null;
  return { 'matchEmail': true };
}

function rating(min: number, max: number): ValidatorFn {
  debugger
  return (c: AbstractControl): { [key: string]: boolean } => {
    if (c.value < min || c.value > max) {
      return { 'rating': true };

    }

    return null;
  }
}

class Customer {
  constructor(
    public customerName?: string,
    public email?: string
  ) { }
}
@Component({
  selector: 'reactive-form',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.scss']
})
export class ReactiveformComponent implements OnInit {

  customer: Customer = new Customer();
  personForm: FormGroup;
  emailMsg: string;
  private validationMessage = {
    required: 'please enter email address',
    email: 'please enter valid email address'
  }
  constructor() { }
  ngOnInit() {
    this.personForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      emailGroup: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmEmail: new FormControl('', [Validators.required, Validators.email]),
      }, { validators: matchEmail }),
      phone: new FormControl(),
      rating: new FormControl('', rating(1, 5)),
      notification: new FormControl('email'),
      sendCatalog: new FormControl(true),
      address: new FormArray([this.buildAddress()])

    });
    this.personForm.get('notification').valueChanges.subscribe(data => this.setNotifactionValidation(data))
    const emailControl = this.personForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(value => this.setMessage(emailControl))
  }
  get address(): FormArray {
    return <FormArray>this.personForm.get('address')
  }
  addAddress() {
    this.address.push(this.buildAddress());
  }
  buildAddress(): FormGroup {
    return new FormGroup({
      addressType: new FormControl(),
      street: new FormControl(),
      street1: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zipCode: new FormControl()
    })
  }
  setMessage(emailControl: AbstractControl): void {
    this.emailMsg = '';
    if (emailControl.errors && (emailControl.touched || emailControl.dirty)) {
      this.emailMsg = Object.keys(emailControl.errors).map(key => this.validationMessage[key]).join('');
    }
  }
  addMore() {
    this.address.push(this.buildAddress());
  }

  setNotifactionValidation(notification: String) {
    const phoneControl = this.personForm.get('phone');
    if (notification === 'text') {
      phoneControl.setValidators(Validators.required);
    }
    else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();

  }
  save() {
    console.log(this.personForm);
  }

}
