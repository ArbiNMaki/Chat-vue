<template>
    <div class="body container-fluid">
        <div class="login">
            <b-row>
                <b-col lg="12" class="form-login">
                    <b-row class="px-4">
                        <b-col lg="12" class="pt-5 title">
                            <h4>Login</h4>
                        </b-col>
                        <b-col lg="12" class="text-left pt-4">
                            <p>Hi, Welcome back!</p>
                        </b-col>
                        <b-col lg="12">
                            <form @submit.prevent="onLogin()">
                                <div class="form-group">
                                    <input v-model="form.username" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder="Username">
                                </div>
                                <div class="form-group">
                                    <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                                </div>
                                <router-link to="#">
                                <p class="py-4 forgot-password">Forgot Password?</p>
                                </router-link>
                                <button type="submit" class="mb-4 py-2 btn button-login text-white">Login</button>
                            </form>
                        </b-col>
                        <b-col lg="12">
                            <b-row class="py-3">
                                <b-col lg="4" cols="4" class="line">
                                    <img src="../assets/img/Line 4.png" alt="">
                                </b-col>
                                <b-col lg="4" cols="4">Login With</b-col>
                                <b-col lg="4" cols="4" class="line">
                                    <img src="../assets/img/Line 4.png" alt="">
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col lg="12" class="py-4">
                            <button type="button" class="btn button-login-google btn-outline-secondary">
                                <img src="../assets/img/Group 5792.png" alt="">
                            </button>
                        </b-col>
                        <b-col lg="12" class="text-center py-3">
                            <p>Don’t have an account? <router-link to="/register">Sign Up</router-link></p>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        username: ''
      }
    }
  },
  methods: {
    ...mapActions({
      actionLogin: 'auth/login'
    }),
    onLogin () {
      this.actionLogin(this.form).then((response) => {
        if (response === 'Login success') {
          localStorage.setItem('username', this.form.username)
          window.location = '/chat'
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response}`
          })
        }
      }).catch((response) => {
        console.log(response)
      })
    }
  }
}
</script>
<style scoped>
    .body{
        background: #E5E5E5;
        width: 100%;
        height: 100%;
    }
    .form-login{
        background: white;
        background: #FFFFFF;
box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
border-radius: 30px;
    }
    .input-login{
        color: #848484;

opacity: 0.75;
    }
    .button-login{
        background: #7E98DF;
        border-radius: 70px;
        width: 100%;
    }
    .button-login-google{
        border-radius: 70px;
        width: 100%;
    }
    .login{
        padding-top: 10%;
        padding-bottom: 10%;
        padding-right: 35%;
        padding-left: 35%;
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
    .forgot-password{
        color: #7E98DF;
        text-align: right;
    }
    .title{
        letter-spacing: -0.165px;
        color: #7E98DF;
    }
    @media only screen and (max-width: 700px) {
        .login{
        padding: 0px;
        }
        .form-login{
        background: white;
        background: #FFFFFF;
    }
    }
</style>
