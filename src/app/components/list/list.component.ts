import { Component, OnInit, ViewChild } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  todos: any = [];
  todo: any = {};
  closeResult: string = "";
  @ViewChild("content") content;
  modalRef;

  updateForm: FormGroup;

  constructor(
    private _todoService: TodoService,
    private _modalService: NgbModal,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllTodos();
    this.updateForm = this._fb.group({ title: ["", Validators.required] });
  }

  getAllTodos(): void {
    this._todoService.getTodos().subscribe(
      todos => {
        this.todos = todos;
      },
      error => {
        console.log(error);
      }
    );
  }

  editTodo(todo): void {
    this.todo = todo;
    this.updateForm.setValue({ title: this.todo.title });
    this.open(this.content);
  }

  updateTodo(todo): void {
    let upTodo = {
      id: todo.id,
      title: this.updateForm.controls["title"].value
    };
    this._todoService.updateTodo(todo.id, upTodo).subscribe(
      success => {
        this.getAllTodos();
        this.modalRef.close();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTodo(id): void {
    this._todoService.deleteTodo(id).subscribe(success => {
      this.getAllTodos();
    }, error => {
      console.log(error)
    })
  }

  open(content) {
    this.modalRef = this._modalService.open(content);
    this.modalRef.result.then(result => {
        this.closeResult = `Closed with: ${result}`;
      }, reason => {
        this.closeResult = `Dismissed ${this._getDismissReason(reason)}`;
      });
  }

  private _getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
