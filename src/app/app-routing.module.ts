import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'miscompras',
    loadChildren: () => import('./miscompras/miscompras.module').then( m => m.MiscomprasPageModule)
  },
  {
    path: 'direccionderetiro',
    loadChildren: () => import('./direccionderetiro/direccionderetiro.module').then( m => m.DireccionderetiroPageModule)
  },
  {
    path: 'misgananciasdeafiliado',
    loadChildren: () => import('./misgananciasdeafiliado/misgananciasdeafiliado.module').then( m => m.MisgananciasdeafiliadoPageModule)
  },
  {
    path: 'preguntas',
    loadChildren: () => import('./preguntas/preguntas.module').then( m => m.PreguntasPageModule)
  },
  {
    path: 'guia',
    loadChildren: () => import('./guia/guia.module').then( m => m.GuiaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'standarpageapp',
    loadChildren: () => import('./standarpageapp/standarpageapp.module').then( m => m.StandarpageappPageModule)
  },
  {
    path: 'direccionnueva',
    loadChildren: () => import('./modals/direccionnueva/direccionnueva.module').then( m => m.DireccionnuevaPageModule)
  },
  {
    path: 'nuevacompra',
    loadChildren: () => import('./modals/nuevacompra/nuevacompra.module').then( m => m.NuevacompraPageModule)
  },
  {
    path: 'visualizadorimagenes',
    loadChildren: () => import('./modals/visualizadorimagenes/visualizadorimagenes.module').then( m => m.VisualizadorimagenesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
