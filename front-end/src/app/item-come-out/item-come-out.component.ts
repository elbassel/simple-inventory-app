
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import { ItemService } from '../item-service';

@Component({
  selector: 'app-item-come-out',
  templateUrl: './item-come-out.component.html',
  styleUrls: ['./item-come-out.component.css']
})
export class ItemComeOutComponent implements OnInit {

  comeOutForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private itemService: ItemService) { }

  ngOnInit() {
    let itemId = window.localStorage.getItem("editItemId");
    if(!itemId) {
      alert("Invalid action.")
      this.router.navigate(['list-items']);
      return;
    }
    this.comeOutForm = this.formBuilder.group({
      _id: [''],
      quantity: [0, Validators.required],
    });
    this.comeOutForm.setValue({_id: itemId, quantity: 0});
  }

  onSubmit() {
    this.itemService.itemsComeOut(this.comeOutForm.value)
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