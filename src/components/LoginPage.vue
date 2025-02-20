<template>
  <div class="loginlanding-content">
    <img class="logincontent-image" src="../assets/images/coldplay-4.jpg" alt="Sorry....">
    <h1 class="loginlanding-title">Ready to Log <br> Inn Folkss!!!!!</h1>
    <hr>
    <div class="Log-in">
      <h1 class="Login-title">Log In</h1>
      <hr>
      <form @submit.prevent = "handleSubmit">
        <div class="input-group">
          <label for="email">Email:</label>
          <InputText id="email" placeholder="Enter your email " type="email" v-model="loginForm.email" />
          <small v-for="(error, index) in v$.loginForm.email.$errors" :key="index">{{ error.$message }}</small>
          
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <InputText id="password" placeholder="Enter your Password" type="password" v-model="loginForm.password" />
          <small v-for="(error, index) in v$.loginForm.password.$errors" :key="index">{{ error.$message }}</small>

        </div>
        <button type="submit">Log In</button>
      </form>
    </div>

  </div>

</template>

<script setup>
import { email, helpers, minLength, required } from '@vuelidate/validators'
import { useToast } from 'primevue'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core';

const toast = useToast()
const router = useRouter()
const loginForm = reactive({
  email: "",
  password: "",
})

const rules = computed (() => ({
  loginForm : {
  email:{
      required: helpers.withMessage("Email required",required),
      email: helpers.withMessage("Enter valid email",email),
    },
    password:{
      required: helpers.withMessage("Password required",required),
      minLength: helpers.withMessage("8 characters must",minLength(8)),
    },
  }
}))


const v$ = useVuelidate(rules, { loginForm },{ $autoDirty:true })
const handleSubmit = () => {
  if(loginForm.email === 'abcd@gmail.com' && loginForm.password === 'qwertykeypad'){
    toast.add({
    severity: "success",
    summary: "Sign in successful",
    detail: `Welcome, ${loginForm.name},Login with your Details`,
    life: 3000,
  })
  router.push("/home")
  } else{
    toast.add({
      severity: "error",
      summary: "Validation Failed",
      detail: "Please fill the details.",
      life: 3000,
    })
  }
}

</script>