<template>
    <div class="container">
      <h4>INGRESA LOS NUEVOS DATOS DEL CLIENTE</h4>
      <div class="form">
            <div class="alert alert-danger" role="alert" v-show="formularioIncompleto">
                Campos Incompletos
            </div>
          <label for="">Nombre:</label>
          <input type="text" class="form-control" v-model="nombre" placeholder="Escribe tu nombre(s)">
          <label for="">Apellidos</label>
          <input type="text" class="form-control" v-model="apellido_paterno" placeholder="Apellido paterno">
          <input type="text" class="form-control" v-model="apellido_materno" placeholder="Apellido materno">
          <label for="">RFC:</label>
          <input type="text" class="form-control" v-model="rfc" placeholder="Clave unica RFC">
          <label for="">CURP:</label>
          <input type="text" class="form-control" v-model="curp" placeholder="Clave unica CURP">
          <label for="">Fecha de Registro:</label>
          <input type="date" class="form-control" v-model="fecha_alta">
            <button class="btn btn-primary btn-guardar" @click="editarCliente">Actualizar</button>
      </div>
    </div>
  
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
      data(){
          return{
              nombre: "",
              apellido_paterno: "",
              apellido_materno: "",
              rfc: "",
              curp: "",
              fecha_alta: "",
              formularioIncompleto: false
          }
      },
      methods:{
          async editarCliente(){
                const obj = {
                    nombre: this.nombre, 
                    apellido_paterno: this.apellido_paterno, 
                    apellido_materno: this.apellido_materno,
                    rfc: this.rfc,
                    curp: this.curp,
                    fecha_alta: this.fecha_alta
                }
                for(const item in obj ){
                    if (!obj[item]){
                        this.formularioIncompleto = true
                        return
                    }
                }
              await axios.put(`http://localhost:3000/api/clientes/${this.$route.params.id}`, obj).then(() => {
                    this.$router.push("/")
                  })  
          },
          async obtenerCliente() {
            await axios.get(`http://localhost:3000/api/clientes/${this.$route.params.id}`).then(({data}) => {
                console.log(data[0])
                this.nombre = data[0].nombre
                this.apellido_paterno = data[0].apellido_paterno
                this.apellido_materno = data[0].apellido_materno
                this.rfc = data[0].rfc
                this.curp = data[0].curp
                this.fecha_alta = data[0].fecha_alta.substring(0, 10)
            })
          }
      },
      mounted(){
        this.obtenerCliente()
      }
  }
  </script>
  
  <style scoped>
      .form {
          width: 60%;
          margin: 0 auto;
          padding: 30px;
          border-radius: 0 0 10px 10px;
          box-shadow: 1px 5px 15px grey;
      }
  
      input {
          margin: 10px 0;
      }
  
      h4 {
          margin: 30px auto 0 auto;
          width: 60%;
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