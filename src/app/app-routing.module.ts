import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMultaComponent } from './components/crear-multa/crear-multa.component';
import { MultasComponent } from './components/multas/multas.component';

const routes: Routes = [
  { path: '', redirectTo: 'multas', pathMatch: 'full'},
  { path: 'multas', component: MultasComponent }, 
  { path: '**', redirectTo: 'multas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
