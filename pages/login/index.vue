<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card raised outlined tile dark>
          <v-card-text>
            <v-img :src="require('~/assets/logo-shirt.png')" contain />
            <v-form class="login-form">
              <v-row justify="center">
                <v-col cols="8">
                  <v-alert color="red" v-if="errorMessage">{{errorMessage}}</v-alert>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                          prepend-icon="mdi-account"
                          label="Username"
                          v-model="username"
                          :rules="[rules.required]"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="8">
                  <v-text-field
                          prepend-icon="mdi-lock"
                          label="Password"
                          v-model="password"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show ? 'text' : 'password'"
                          @click:append="show = !show"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="8">
                  <v-card-actions>
                    <v-btn dark @click="login" block>
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
  </div>
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

  layout() {
    return "login";
  }

  rules: Object = {
    required: (value: string) => !!value || "Required.",
    min: (v: string) => v.length >= 8 || "Min 8 characters",
  };

  private login(): void {
    this.$auth
            .loginWith('local', {
              data: {
                Username: this.username,
                Password: this.password
              },
              headers: {
                'x-functions-key': process.env.xFunctionsKey
              }
            })
            .then((response: any) => {
              if (response.status !== 200) return;
              this.$auth.setUser({userName: 'admin'});
            })
            .catch((error) => {
              this.errorMessage = 'Error occurred';
              console.error(error);
            });
  }
}
</script>
