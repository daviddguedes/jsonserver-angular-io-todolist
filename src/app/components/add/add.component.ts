import { TodoService } from "./../../services/todo.service";
import { Component, OnInit } from "@angular/core";

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  todoForm: FormGroup;

  constructor(private _fb: FormBuilder, private _todoService: TodoService) {}

  ngOnInit() {
    this.todoForm = this._fb.group({
      title: ["", Validators.required]
    });
  }

  add() {
    this._todoService.saveTodo(this.todoForm.value).subscribe(
      todo => {
        this.todoForm.reset();
      },
      error => console.log(error.message)
    );
  }
}
