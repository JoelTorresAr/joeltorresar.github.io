<template>
  <div>
    <v-row fullscreen>
      <v-col cols="10">
        <v-row>
          <v-col cols="12" class="justify-space-between grey mt0">
            <v-btn
              class="ma-2 white--text"
              tile
              v-for="(item, index) in pisos"
              :key="index"
              @click="getMesas(index)"
              :color="index==pisoActual?'black':'light-green darken-4'"
            >{{item}}</v-btn>
          </v-col>
          <v-card class="d-flex flex-wrap" color="grey lighten-2" flat tile>
            <v-card
              v-for="(item, index) in mesas"
              :key="index"
              :color="item.st_mesa=='L'?'green':'red darken-4'"
              dark
              height='8rem'
              width='12rem'
              class="pa-2 mt-4 ml-4 mr-3"
              @click="newComanda(item,index)"
            >
              <v-card-title class="headline">{{item.nombre}}</v-card-title>

              <v-card-actions>
                <strong>{{item.mesero}}</strong>
              </v-card-actions>
            </v-card>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-row>
          <div class="col align-self-start">
            <div id="inspireme--body--index">
              <v-btn class="ma-2 white--text" tile min-width="8rem" color="black">CREAR</v-btn>
              <v-btn class="ma-2 white--text" tile min-width="8rem" color="black">JUNTAR</v-btn>
              <v-btn class="ma-2 white--text" tile min-width="8rem" color="black">COBRAR</v-btn>
              <v-btn class="ma-2 white--text" tile min-width="8rem" color="black">ELIMINAR</v-btn>
              <v-btn class="ma-2 white--text" tile min-width="8rem" color="black">SEPARAR</v-btn>
              <v-btn class="ma-2 white--text" tile min-width="8rem" color="black">MOVER</v-btn>
            </div>
          </div>
          <v-spacer></v-spacer>
          <div class="col align-self-end">
            <v-btn
              class="ma-2 white--text"
              tile
              min-width="8rem"
              color="purple accent-4"
              @click="logout"
            >BLOQUEAR</v-btn>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">INGRESE CANTIDAD DE COMENSALES</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  class="centered-input white--text mt-3"
                  type="number"
                  maxlength="2"
                  v-model="numcomen"
                  :counter="2"
                  :rules="[v => !!v || 'Ingrese una cantidad']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveComanda">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    ip: "",
    pisos: "",
    pisoActual: "",
    mesas: "",
    mesaId: "",
    mesaActual: "",
    pin: "",
    dialog: false,
    numcomen: 0
  }),
  watch:{
    pisos(val){
    if (Object.keys(val).length > 0) {
      var index = Object.keys(val)[0]
      this.getMesas(index)
    }
    }
  },
  created() {
    this.pisos = JSON.parse(this.$store.getters.getPISOS);
    this.pin = this.$store.getters.getPIN;
    this.ip = this.$store.getters.getIP;
  },
  methods: {
    getMesas(piso) {
      this.pisoActual = piso;
      this.$http
        .get(
          `${this.ip}/?nomFun=tb_mesas&parm_pin=${this.pin}&parm_piso=${piso}&parm_tipo=M$`
        )
        .then(({ data }) => {
          this.mesas = data.mesas;
        })
        .catch(error => {
          console.log(error);
        });
    },
    newComanda(item, index) {
      this.mesaId = index;
      this.mesaActual = item;
      this.$store.commit("SET_MESA_ACTUAL", JSON.stringify(item));
      this.$store.commit("SET_ID_MESA_ACTUAL", index);
      var id = this.$store.getters.getUSERID;
      if (item.st_cmd == "") {
        this.dialog = true;
      } else {
        var url = `${this.ip}/?nomFun=tb_revisar_cmd&parm_pin=${this.pin}&parm_piso=${this.pisoActual}&parm_id_cmd=${item.id_cmd}&parm_tipocmd=1&parm_id_mesero=${id}&parm_tipo=M$`;
        console.log(url);
        this.$http
          .get(url)
          .then(({ data }) => {
            if (data.status !== 0) {
              this.$router.push({ name: "Store" });
            } else {
              var name = this.$store.getters.getUSERNAME;
              var msg = `Comanda esta siendo Editada por mesero: ${name}`;
              if (data.msg != msg) {
                this.$swal.fire({
                  title: "Advertencia!",
                  text: data.msg,
                  icon: "warning",
                  confirmButtonText: "Cool"
                });
              } else {
                this.$router.push({ name: "Store" });
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    saveComanda() {
      var id = this.$store.getters.getUSERID;
      this.$http
        .get(
          `${this.ip}/?nomFun=tb_new_cmd&parm_pin=${this.pin}&parm_piso=${this.pisoActual}&parm_id_mesas=${this.mesaId}&parm_num=${this.numcomen}&parm_tipocmd=1&parm_id_mesero=${id}&parm_tipo=M$`
        )
        .then(({ data }) => {
          if (data.msg == "Ok") {
            console.log(data);
            //this.getMesas(this.pisoActual);
            this.mesaActual.id_cmd = data.idcmd;
            this.$store.commit(
              "SET_MESA_ACTUAL",
              JSON.stringify(this.mesaActual)
            );
            this.$router.push({ name: "Store" });
            this.dialog = false;
          } else {
            this.$swal.fire({
              title: "Advertencia!",
              text: data.msg,
              icon: "warning",
              confirmButtonText: "Cool"
            });
            this.getMesas(this.pisoActual);
            this.dialog = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    logout() {
      this.$store.commit("SET_PIN", null);
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
<style>
.centered-input input {
  text-align: center;
}
#inspireme--body--index {
  height: 70vh;
}
</style>