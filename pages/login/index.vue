<template>
  <v-container class="login">
    <v-row justify="center" align-content="center">
      <v-col jutsify="center" cols="7">
        <v-card raised outlined tile dark>
          <div class="login-form">
            <v-row justify="center">
              <v-col cols="8">
                <v-text-field
                  v-model="username"
                  label="username"
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
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
  layout() {
    return "default";
  }

  show: boolean = false;
  username: string = "";
  password: string = "";
  rules: Object = {
    required: (value: string) => !!value || "Required.",
    min: (v: string) => v.length >= 8 || "Min 8 characters",
  };

  private login(): void {
    console.log("Username:", this.username, "\nPassword:", this.password);
  }
}
</script>

<style>
.v-card__actions {
  justify-content: center;
  
}

.v-btn {
  width: 70%;
}
</style>