<template>
  <v-row class="lime darken-4">
    <v-col cols="12" sm="8"></v-col>
    <v-col cols="12" sm="4">
      <v-card color="rgb(0, 0, 0, 0.4)" dark class="pa-2 mt-4">
        <v-card-title class="text-center headline mt-10">
          <v-text-field
            class="centered-input white--text mt-3"
            type="password"
            maxlength="4"
            v-model="password"
            :counter="4"
            :rules="[v => !!v || 'PIN requerido']"
            required
            disabled
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="justify-space-between" cols="12">
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="addNumber(7)">7</v-btn>
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="addNumber(8)">8</v-btn>
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="addNumber(9)">9</v-btn>
            </v-col>
            <v-col class="justify-space-between" cols="12">
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="addNumber(4)">4</v-btn>
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="addNumber(5)">5</v-btn>
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="addNumber(6)">6</v-btn>
            </v-col>
            <v-col class="justify-space-between" cols="12">
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="addNumber(1)">1</v-btn>
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="addNumber(2)">2</v-btn>
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="addNumber(3)">3</v-btn>
            </v-col>
            <v-col class="justify-space-between" cols="12">
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="removeNumber">DEL</v-btn>
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="addNumber(0)">0</v-btn>
              <v-btn class="mx-2" fab dark large color="rgb(0, 0, 0, 0.4)" @click="loggin">Ok</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    password: "",
    ip: ""
  }),
  created() {
    this.ip = this.$store.getters.getIP;
  },
  methods: {
    addNumber(num) {
      if (this.password.length < 4) {
        this.password = this.password + num;
      }
    },
    removeNumber() {
      this.password = this.password.substring(0, this.password.length - 1);
    },
    loggin() {
      this.$http
        .get(
          `${this.ip}/?nomFun=tb_login&parm_cod=Xyfk8Gixnf&parm_new=0&parm_pin=${this.password}&parm_tipo=M$`
        )
        .then(({ data }) => {
          if(data.status===1){
          this.$store.commit("SET_PIN", this.password);
          this.$store.commit("SET_PISOS", JSON.stringify(data.pisos));
          this.$store.commit("SET_FAMILIAS", JSON.stringify(data.fam));
          this.$store.commit("SET_USER_NAME", data.nombre);
          this.$store.commit("SET_USER_ID", data.id_usr);
          this.$router.push({ name: "Home" });
          }else{
            this.password = ""
            this.$swal.fire({
              title: "Advertencia!",
              text: data.msg,
              icon: "warning",
              confirmButtonText: "Cool"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loggin2() {
      fetch(
        `${this.ip}/?nomFun=tb_login&parm_cod=Xyfk8Gixnf&parm_new=0&parm_pin=${this.password}&parm_tipo=M$`
      )
        .then(response => response.json())
        .then(({ data }) => {
          this.$store.commit("SET_PIN", this.password);
          this.$store.commit("SET_PISOS", JSON.stringify(data.pisos));
          this.$store.commit("SET_USER_NAME", data.nombre);
          this.$store.commit("SET_USER_ID", data.id_usr);
          console.log(data);
          this.$router.push({ name: "Home" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.centered-input input {
  text-align: center;
}
</style>