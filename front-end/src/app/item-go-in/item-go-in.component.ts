import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import { ItemService } from '../item-service';

@Component({
  selector: 'app-item-go-in',
  templateUrl: './item-go-in.component.html',
  styleUrls: ['./item-go-in.component.css']
})
export class ItemGoInComponent implements OnInit {
  goInForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private itemService: ItemService) { }

  ngOnInit() {
    let itemId = window.localStorage.getItem("editItemId");
    if(!itemId) {
      alert("Invalid action.")
      this.router.navigate(['list-items']);
      return;
    }
    this.goInForm = this.formBuilder.group({
      _id: [''],
      quantity: [0, Validators.required],
    });
    this.goInForm.setValue({_id: itemId, quantity: 0});
  }

  onSubmit() {
    this.itemService.itemsGoIn(this.goInForm.value)
    .subscribe(data => this.router.navigate(['list-items']), (err) => {
      const errorMessage = err.error.message;
      let validationError = '';
      if(err.error.errors) {
        validationError = err.error.errors.reduce((allMsgs, error) => allMsgs += `${error.dataPath} ${error.message}\n`,'')
      }
      alert(`${errorMessage}\n${validationError}`);
    });
  }
}