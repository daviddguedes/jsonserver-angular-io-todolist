import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/list", pathMatch: "full" },
  { path: "list", component: ListComponent },
  { path: "add", component: AddComponent },
  { path: "**", redirectTo: "/list", pathMatch: "full" }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
