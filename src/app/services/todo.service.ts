import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class TodoService {
  private _API_UR: string = environment.endpoint;

  constructor(private _http: HttpClient) {}

  saveTodo(todo) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this._http.post(this._API_URL, todo, { headers: headers });
  }

  getTodos() {
    return this._http.get(this._API_URL);
  }

  getTodo(id) {
    return this._http.get(this._API_URL + "/" + id);
  }

  updateTodo(id, todo) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this._http.put(this._API_URL + "/" + id, todo, { headers: headers });
  }

  deleteTodo(id) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this._http.delete(this._API_URL + "/" + id);
  }
}
