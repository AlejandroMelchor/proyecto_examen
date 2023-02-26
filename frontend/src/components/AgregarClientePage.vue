<template>
  <div class="container">
    <h4>INGRESA LOS DATOS DEL CLIENTE</h4>
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
            <button class="btn btn-success btn-guardar" @click="guardarCliente">Agregar</button>
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
        async guardarCliente(){
            let fecha = new Date(this.fecha_alta)
            fecha = this.format(fecha)
            const obj = {
                nombre: this.nombre, 
                apellido_paterno: this.apellido_paterno, 
                apellido_materno: this.apellido_materno,
                rfc: this.rfc,
                curp: this.curp,
                fecha_alta: fecha
            }
            if(!this.fecha_alta){
                this.formularioIncompleto = true
                return
            }
            for(const item in obj ){
                if (!obj[item]){
                    this.formularioIncompleto = true
                    return
                }
            }
            await axios.post("http://localhost:3000/api/clientes", obj) .then(() => {
                    this.$router.push("/")
                })
        }, 
        format (inputDate) {
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