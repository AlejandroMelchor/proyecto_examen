<template>
    <div class="container">
      <h4>CUENTAS DEL CLIENTE: &nbsp;{{ nombre_cliente }} </h4>
      <div class="form">
        <table class="table table-striped">
            <thead class="table-dark">
                <tr>
                    <th>Tipo de Cuenta</th>
                    <th>Saldo Actual</th>
                    <th>Fecha Contratacion</th>
                    <th>Ultimo Movimiento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody v-if="cuentasCliente">
                <tr v-for="cuenta in cuentasCliente" v-bind:key="cuenta" >
                    <td>{{ cuenta.nombre_cuenta }}</td>
                    <td>{{ cuenta.saldo_actual }}</td>
                    <td>{{ formatearFecha(cuenta.fecha_contratacion) }}</td>
                    <td>{{ formatearFecha(cuenta.fecha_ultimo_movimiento) }}</td>
                    <td>
                        <button class="btn btn-danger" @click="eliminarCuentaCliente(cuenta.id_cliente_cuenta)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>  
        <button class="btn btn-success btn-guardar" data-bs-toggle="modal" data-bs-target="#agregarCuenta">Agregar Cuenta</button>
      </div>
    </div>

    <!-- MODALES -->
    <!-- MODAL AGREGAR CUENTA -->
    <div class="modal fade" id="agregarCuenta" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Agregar Cuenta</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="alert alert-danger" role="alert" v-show="formularioIncompleto">
                Campos Incompletos
            </div>
            
            <label for="">Tipo de Cuenta:</label>
            <select class="form-select" v-model="cuentaSeleccionada">
                <option v-for="cuenta in cuentas" v-bind:key="cuenta" :value="cuenta.id_cuenta"> {{ cuenta.nombre_cuenta }} </option>
            </select>

            <label for="">Saldo:</label>
            <input type="number" class="form-control" v-model="saldo">

            <label for="">Fecha de Contratacion:</label>
            <input type="date" class="form-control" v-model="fecha_contratacion">
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
            nombre_cliente: "",
            cuentas: [],
            saldo: "",
            cuentasCliente: [],
            cuentaSeleccionada: "", 
            fecha_contratacion: "",
            formularioIncompleto: false
        }
    },
    methods:{
        async obtenerCliente() {
            await axios.get(`http://localhost:3000/api/clientes/${this.$route.params.id}`).then(({data}) => {
                this.nombre_cliente = data[0].nombre
            })
        }, async obtenerCuentas() {
            await axios.get("http://localhost:3000/api/cuentas").then(({data}) => {
                this.cuentas = data[0]
            })
        },
        async obtenerCuentasCliente() {
            await axios.get(`http://localhost:3000/api/cuentas_cliente/${this.$route.params.id}`).then(({data}) => {
                this.cuentasCliente = data[0]
            })
        },
        async guardarCuenta(){
            if(!this.cuentaSeleccionada || !this.saldo || !this.fecha_contratacion){
                this.formularioIncompleto = true
                return
            }
            await axios.post("http://localhost:3000/api/cuentas_cliente", {
                id_cliente: this.$route.params.id,
                id_cuenta: this.cuentaSeleccionada,
                saldo_actual: this.saldo,
                fecha_contratacion: this.format(this.fecha_contratacion)
            })
            document.querySelector(".btn-close").click()
            this.obtenerCuentasCliente()
            this.cuentaSeleccionada = ""
            this.saldo = ""
            this.fecha_contratacion = ""
        },
        async eliminarCuentaCliente(id){
            await axios.delete(`http://localhost:3000/api/cuentas_cliente/${id}`)
            this.obtenerCuentasCliente()
        },
        actualizarCuentaSeleccionada(e){
            console.log(e)
        },  
        formatearFecha(fechaString){
            let inputDate = new Date(fechaString)
            let dateNumber, month, year;
            dateNumber = inputDate.getDate();
            month = inputDate.getMonth() + 1;
            year = inputDate.getFullYear();

            dateNumber = dateNumber
                .toString()
                .padStart(2, '0');

            month = month
                .toString()
                .padStart(2, '0');

            return `${dateNumber}-${month}-${year}`;
        },
        format(fechaString){
            let inputDate = new Date(fechaString)
            let dateNumber, month, year;
            dateNumber = inputDate.getDate();
            month = inputDate.getMonth() + 1;
            year = inputDate.getFullYear();

            dateNumber = dateNumber
                .toString()
                .padStart(2, '0');

            month = month
                .toString()
                .padStart(2, '0');

            return `${year}-${month}-${dateNumber}`;
        }
    },
    mounted(){
        this.obtenerCliente()
        this.obtenerCuentas()
        this.obtenerCuentasCliente()
    }
  }
  </script>
  
  <style scoped>
      .form {
          width: 80%;
          margin: 0 auto;
          padding: 30px;
          border-radius: 0 0 10px 10px;
          box-shadow: 1px 5px 15px grey;
      }
  
      input, select {
          margin: 10px 0;
      }
  
      h4 {
          margin: 30px auto 0 auto;
          width: 80%;
          background: #000;
          color: white;
          text-align: center;
          padding: 20px;
  
      }
  
      .btn-guardar {
          width: 80%;
          margin: 10px 10%;
      }
  </style>