import { createRouter, createWebHistory } from "vue-router";
import InicioPage from '../components/InicioPage';
import AgregarClientePage from '../components/AgregarClientePage';
import EditarClientePage from '../components/EditarClientePage';
import CuentasClientePage from '../components/CuentasClientePage';

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
      { path: '/', component: InicioPage },
      { path: '/agregar_cliente', component: AgregarClientePage },
      { path: '/editar_cliente/:id', component: EditarClientePage },
      { path: '/cuentas_cliente/:id', component: CuentasClientePage },
    ]
  })