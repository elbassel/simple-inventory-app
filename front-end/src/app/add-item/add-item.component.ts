import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import { ItemService } from '../item-service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private itemService: ItemService) { }
  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      name: ['', Validators.required],
      sku: ['', Validators.required],
      code: ['', Validators.required],
      quantity: [0, Validators.required],
    });
  }

  onSubmit() {
    if(!this.addForm.value._id)
    delete this.addForm.value._id;
    this.itemService.createItem(this.addForm.value)
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
