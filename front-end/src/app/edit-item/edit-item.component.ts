import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { ItemService } from '../item-service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private itemService: ItemService) { }

   ngOnInit() {
    let itemId = window.localStorage.getItem("editItemId");
    if(!itemId) {
      alert("Invalid action.")
      this.router.navigate(['list-items']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [],
      name: ['', Validators.required],
      sku: ['', Validators.required],
      code: ['', Validators.required],
      quantity: [0, Validators.required],
      createdAt: [''],
      updatedAt: ['']
    });
    this.itemService.getItemById(itemId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    if(!this.editForm.value._id)
      delete this.editForm.value._id;
    this.itemService.updateItem(this.editForm.value)
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