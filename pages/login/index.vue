<template>
  <div class="background">
    <v-container class="login">
      <v-row justify="center" align="center">
        <v-col justify="center" cols="7">
          <v-card raised outlined tile dark class="justify-center">
            <v-form class="login-form">
              <v-row justify="center">
                <v-col cols="8">
                  <v-text-field
                    label="username"
                    v-model="username"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="8">
                  <v-text-field
                    label="password"
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                  ></v-text-field> 
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12">
                  <v-card-actions>
                    <v-btn color="white lighten-2" text @click="login">
                      Login
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
              <!-- <v-row v-if="error.statusCode === 401">
                <v-col>
                  Invalid Credentials
                </v-col>
              </v-row> -->
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
                'x-functions-key': 'JOFewtUZYA0am9x96rh2bCICa58qwIa0OuMa75jo1aITlSBJAErkXw=='
              }
            })
            .then((response: any) => {
              if (response.status !== 200) return;
              this.$auth.setUserToken(response.data);
              this.$auth.setUser({userName: 'admin'});
            })
            .catch((error) => {
              console.error(error);
            });
  }
}
</script>

<style scoped>
.background {
  background-image: url("~assets/logo-shirt.png");
  background-position: center;
  height: 100%;
}

.v-card__actions {
  justify-content: center;
}

.login {
  padding-top: 80px;
}

.login-form {
  padding: 2rem 1rem;
}

.v-btn {
  width: 70%;
}
</style>