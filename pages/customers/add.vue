<template>
  <v-card>
    <v-card-title>Add a customer</v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col>
            <v-text-field label="User Name" counter="15" v-model="userName"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Name" v-model="name"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="E-mail" v-model="email"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Address" v-model="address"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Phone" v-model="phone"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Website" v-model="website"></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <v-checkbox required label="E-mail verified" v-model="verified"></v-checkbox>
          </v-col>
          <v-col>
            <v-btn @click="addCustomer()">Add customer</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  private userName: string = "";
  private name: string = "";
  private email: string = "";
  private address: string = "";
  private phone: string = "";
  private websiste: string = "";
  private verified: boolean = false;

  layout() {
    return "mws";
  }
  addCustomer() {
    const id = Math.floor(Math.random() * 999);
    const user = {
      id: id,
      name: this.name,
      username: this.userName,
      email: this.email,
      address: this.address,
      phone: this.phone,
      website: this.websiste,
      company: "mws",
    };
    this.$store.commit("customer/add", user);
  }
}
</script>