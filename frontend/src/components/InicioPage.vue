<template>
  <div class="container">
    <div class="container-tabla">
        <table class="table table-striped">
            <thead class="table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>RFC</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cliente in clientes" v-bind:key="cliente">
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.apellido_paterno }} {{ cliente.apellido_materno }}</td>
                    <td>{{ cliente.rfc }}</td>
                    <td class="d-flex justify-content-evenly wrap">
                        <router-link :to="'/editar_cliente/' + cliente.id_cliente">
                            <button class="btn btn-primary item">Editar</button>
                        </router-link>
                        <router-link :to="'/cuentas_cliente/' + cliente.id_cliente">
                            <button class="btn btn-warning item">Cuentas</button>
                        </router-link>
                        <button class="btn btn-danger item" @click="eliminarCliente(cliente)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="container-botones">
        <router-link to="/agregar_cliente">
            <button class="btn btn-primary btn-agregar">Agregar Cliente</button>
        </router-link>
        <button class="btn btn-primary btn-cuenta" data-bs-toggle="modal" data-bs-target="#agregarCuenta">Agregar Tipo de Cuenta</button>
    </div>
  </div>

  <!-- MODALES -->
  <!-- MODAL AGREGAR CUENTA -->
  <div class="modal fade" id="agregarCuenta" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Agregar Tipo de Cuenta</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table class="table table-striped" style="text-align: center;">
            <thead class="table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cuenta in cuentas" v-bind:key="cuenta">
                    <td>{{ cuenta.nombre_cuenta }}</td>
                    <td>
                        <button class="btn btn-danger" @click="eliminarCuenta(cuenta.id_cuenta)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <hr>
        <div class="alert alert-danger" role="alert" v-show="formularioIncompleto">
            Campos Incompletos
        </div>
        <label for="">Tipo de Cuenta:</label>
        <input type="text" class="form-control" placeholder="Ingrese el nombre de la cuenta" v-model="nombre_cuenta">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" @click="guardarCuenta">Guardar</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            clientes: [],
            clienteSeleccionado: "",
            nombre_cuenta: "",
            cuentas: [], 
            formularioIncompleto: false
        }
    },
    methods:{
        // METODOS PARA LOS CLIENTES
        async obtenerClientes(){
            await axios.get("http://localhost:3000/api/clientes").then(({data}) => {
                this.clientes = data[0]
            })
        },
        async eliminarCliente(cliente){
            this.clienteSeleccionado = cliente
            await axios.delete(`http://localhost:3000/api/clientes/${this.clienteSeleccionado.id_cliente}`)
            this.obtenerClientes()
        },
        // METODOS PARA LAS CUENTAS
        async guardarCuenta(){
            if(!this.nombre_cuenta){
                this.formularioIncompleto = true
                return
            }
            await axios.post("http://localhost:3000/api/cuentas", {nombre_cuenta: this.nombre_cuenta})
            document.querySelector(".btn-close").click()
            this.nombre_cuenta = ""
            this.obtenerCuentas()
        },
        async obtenerCuentas(){
            await axios.get("http://localhost:3000/api/cuentas").then(({data}) => {
                this.cuentas = data[0]
            })
        },
        async eliminarCuenta(id){
            await axios.delete(`http://localhost:3000/api/cuentas/${id}`)
            this.obtenerCuentas()
        }
    },
    mounted(){
        this.obtenerClientes()
        this.obtenerCuentas()
    },
}
</script>

<style scoped>
    .container-tabla {
        width: 100%;
        margin: 30px auto;
        text-align: center;
    }
    .btn-agregar {
        position: fixed;
        bottom: 50px;
        right: 50px;
        padding: 10px 20px;
    }
    .btn-cuenta {
        position: fixed;
        bottom: 50px;
        right: 250px;
        padding: 10px 20px;
    }

</style>