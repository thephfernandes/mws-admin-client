<template>
  <v-row class="flex-row">
    <v-col cols="12" sm="6" md="4" lg="3">
      <v-card outlined tile class="loginForm">
        <v-card-text>
          <v-img :src="require('~/assets/logo-shirt.png')" contain />
        </v-card-text>
        <v-card-text>
          <v-form class="login-form">
            <v-row justify="center">
              <v-col cols="12" v-if="errorMessage">
                <v-alert color="red" class="error-content">{{errorMessage}}</v-alert>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    prepend-icon="mdi-account"
                    label="Username"
                    v-model="username"
                    :rules="[rules.required]"
                    @keyup.enter="login"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12">
                <v-text-field
                    prepend-icon="mdi-lock"
                    label="Password"
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    @keyup.enter="login"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12">
                <v-card-actions>
                  <v-btn @click="login" block color="primary" :loading="loading">
                    Login
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
  show: boolean = false;
  username: string = "";
  password: string = "";
  errors: string[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  layout() {
    return "login";
  }

  rules: Object = {
    required: (value: string) => !!value || "Required.",
    min: (v: string) => v.length >= 8 || "Min 8 characters",
  };

  private login(): void {
    this.loading = true;
    this.$auth
            .loginWith('local', {
              data: {
                Username: this.username,
                Password: this.password
              }
            })
            .then((response: any) => {
              if (response.status !== 200) return;
              this.loading = false;
            })
            .catch((error) => {
              this.errorMessage = 'Error occurred';
              console.error(error);
              this.loading = false;
            });
  }
}
</script>
<style lang="scss" scoped>
.flex-row {
  height: 90vh;
  align-items: center;
  justify-content: center;
}
.title {
  font-size: 2rem;
}
.error-content {
  color: white;
}

.loginForm {
  background-color: rgb(241, 235, 235, .9);
}
</style>
