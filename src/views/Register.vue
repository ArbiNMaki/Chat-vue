<template>
    <div class="body container-fluid">
        <div class="register">
            <b-row>
                <b-col lg="12" class="form-register">
                    <b-row class="py-5 px-3">
                            <b-col lg="1" cols="1">
                                <router-link to="/login">
                                <button class="btn">
                                    <img src="../assets/img/back.png" alt="">
                                </button>
                                </router-link>
                            </b-col>
                            <b-col lg="10" cols="10" class="title text-center pt-1">
                                <h4>Register</h4>
                            </b-col>
                        <b-col lg="12" class="text-left pt-4">
                            <p>Let’s create your account!</p>
                        </b-col>
                        <b-col lg="12">
                            <form @submit.prevent="onRegister">
                                 <div class="form-group">
                                    <input v-model="form.username" type="text" class="form-control" id="exampleInputPassword1" placeholder="Username">
                                </div>
                                <div class="form-group">
                                    <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                                </div>
                                <button type="submit" class="mb-4 py-2 btn button-register text-white">Register</button>
                            </form>
                        </b-col>
                        <b-col lg="12">
                            <b-row class="py-3">
                                <b-col lg="3" cols="3">
                                    <img src="../assets/img/Line 4.png" alt="">
                                </b-col>
                                <b-col lg="5" cols="5" class="text-center mx-2 regis-with">Register With</b-col>
                                <b-col lg="3" cols="3">
                                    <img src="../assets/img/Line 4.png" alt="">
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col lg="12" class="py-4">
                            <button type="button" class="btn button-login-google btn-outline-secondary">
                                <img src="../assets/img/Group 5792.png" alt="">
                            </button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      form: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onRegister () {
      this.actionsRegister(this.form).then((response) => {
        console.log(response)
        if (response === 'Email already exist' || response === 'Username already exist') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response}`
          })
        } else {
          Swal.fire(
            'Good job!',
            'Success Register! Redirecting to login page',
            'success'
          )
          this.$router.push({
            path: '/login'
          })
        }
      }).catch((err) => {
        alert(err.message)
      })
    },
    ...mapActions({
      actionsRegister: 'auth/register'
    })
  }
}
</script>
<style scoped>
    .body{
        background: #E5E5E5;
        width: 100%;
        height: 100%;
    }
    .form-group input{
       position: relative;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    border: none;
    border-bottom: 1px solid #232323;
    }
    .form-register{
        background: white;
        background: #FFFFFF;
box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
border-radius: 30px;
    }
    .input-register{
        color: #848484;

opacity: 0.75;
    }
    .button-register{
        background: #7E98DF;
        border-radius: 70px;
        width: 100%;
    }
    .button-login-google{
        border-radius: 70px;
        width: 100%;
    }
    .register{
        padding-top: 10%;
        padding-bottom: 10%;
        padding-right: 35%;
        padding-left: 35%;
    }
    .forgot-password{
        color: #7E98DF;
        text-align: right;
    }
    .title{
        letter-spacing: -0.165px;
        color: #7E98DF;
    }
    @media only screen and (max-width: 700px) {
        .register{
        padding: 0px;
        }
        .form-register{
        background: white;
        background: #FFFFFF;
        }
        .regis-with{
            font-size:14px;
        }
    }
</style>
