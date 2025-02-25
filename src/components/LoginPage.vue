<template>
  <div class="loginlanding-content">
    <img class="logincontent-image" src="../assets/images/smartphone-vintage-technology-music.webp" alt="Sorry....">
    <h1 class="loginlanding-title">Ready to Log <br> Inn Folkss!!!!!</h1>
    <hr>
    <div class="Log-in">
      <h1 class="Login-title">Log In</h1>
      <hr>
      <form @submit.prevent="handleSubmit">
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

        <router-link to='/'><button class="signup">SignUp Folkss!</button></router-link>
      </form>
    </div>

  </div>

</template>

<script setup>
import { email, helpers, minLength, required } from '@vuelidate/validators'
import { useToast } from 'primevue'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'

const toast = useToast()
const router = useRouter()

const loginForm = reactive({
  email: '',
  password: '',
})

// Vuelidate validation rules
const rules = computed(() => ({
  loginForm: {
    email: {
      required: helpers.withMessage('Email required', required),
      email: helpers.withMessage('Enter valid email', email),
    },
    password: {
      required: helpers.withMessage('Password required', required),
      minLength: helpers.withMessage('Password must be at least 8 characters', minLength(8)),
    },
  },
}))

const v$ = useVuelidate(rules, { loginForm }, { $autoDirty: true })


const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    toast.add({
      severity: 'error',
      summary: 'Validation Failed',
      detail: 'Please fill in the form correctly.',
      life: 3000,
    });
    return;
  }

  // Retrieve all users from localStorage
  const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Find the user by email and password
  const user = savedUsers.find(user => user.email === loginForm.email && user.password === loginForm.password);

  if (user) {
    toast.add({
      severity: 'success',
      summary: 'Login Successful',
      detail: `Welcome back, ${user.name}!`,
      life: 3000,
    });

    // Store logged-in user
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    router.push('/home');
  } else {
    toast.add({
      severity: 'error',
      summary: 'Dont have One!!!',
      detail: 'Click on SignUp Folkss!.',
      life: 3000,
    });
  }
};


</script>