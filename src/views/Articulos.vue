<template>
  <div>
    <v-card color="grey" dark id="inspireme">
      <v-row>
        <v-col cols="4" class="black">
          <v-card id="inspireme">
            <v-card-title>
              <h4 class="text-center">
                <strong>{{mesa.nombre}}</strong>
              </h4>
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left"></th>
                      <th class="text-left">Nombre</th>
                      <th class="text-left">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in artList" :key="index">
                      <td>
                        <div class="shop__article__quantity">
                          <div>
                            <v-btn
                              color="primary"
                              fab
                              x-small
                              dark
                              @click="alterList(item,'minus')"
                            >
                              <v-icon>mdi-minus</v-icon>
                            </v-btn>
                          </div>
                          <div>
                            <span class="mr-2 ml-2">{{item.cant}}</span>
                          </div>
                          <div>
                            <v-btn color="primary" fab x-small dark @click="alterList(item,'plus')">
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </td>
                      <td class="white--text">{{ item.name }}</td>
                      <td>
                        <v-btn color="red" fab x-small dark @click="alterList(item,'remove')">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-card-actions class="justify-space-between">
              <div>Total:</div>
              <div>{{total}}</div>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card id="inspireme" class="grey lighten-2">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn @click="salir">
                <v-icon>mdi-arrow-left-bold</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-title>
              <v-slide-group multiple show-arrows>
                <v-slide-item
                  v-for="(item, index) in familias"
                  :key="index"
                  v-slot:default="{ active }"
                >
                  <v-btn
                    class="ma-2 white--text card card-block"
                    tile
                    :input-value="active"
                    color="light-blue darken-4"
                    @click="getArticles(item)"
                  >{{item.nombre}}</v-btn>
                </v-slide-item>
              </v-slide-group>
            </v-card-title>
            <v-card-text id="inspireme--body">
              <v-card class="d-flex flex-wrap" color="grey lighten-2" flat tile>
                <v-card
                  v-for="(item, index) in articulos"
                  :key="index"
                  color="orange lighten-4"
                  dark
                  min-width="10rem"
                  max-width="10rem"
                  class="pa-2 mt-4 ml-4"
                  @click="addToMesa(item,index)"
                >
                  <v-card-text class="black--text height--item">{{item.nombre}}</v-card-text>
                  <v-card-actions class="black">
                    <strong>S/.{{item.precio}}</strong>
                  </v-card-actions>
                </v-card>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="sendKitchen">Enviar a cocina</v-btn>
              <v-btn @click="sendPrecuenta">Pre-cuenta</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    ip: "",
    familias: "",
    articulos: [],
    articlesEnMesa: [],
    mesa: "",
    mesaId: "",
    total: "",
    pin: "",
    dialog: false,
    numcomen: 0,
    cantidad: 0,
    userID: 0
  }),
  computed: {
    artList() {
      return this.articlesEnMesa;
    }
  },
  created() {
    this.familias = JSON.parse(this.$store.getters.getFAMILIAS);
    this.mesa = JSON.parse(this.$store.getters.get_MESA_ACTUAL);
    this.mesaId = this.$store.getters.get_ID_MESA_ACTUAL;
    this.pin = this.$store.getters.getPIN;
    this.ip = this.$store.getters.getIP;
    this.userID = this.$store.getters.getUSERID;
    this.getArticlesinMesa();
  },
  methods: {
    getArticles(fam) {
      this.articulos = fam.json_prod;
    },
    getArticlesinMesa() {
      var url = `${this.ip}/?nomFun=tb_item_3p&parm_pin=${this.pin}&parm_piso=20&parm_id_mesas=${this.mesaId}&parm_id_cmd=${this.mesa.id_cmd}&parm_id_mesero=${this.userID}&parm_tipo=M$`;
      this.$http
        .get(url)
        .then(({ data }) => {
          if (data.msg == "Ok") {
            console.log("producto en mesa");
            console.log(data);
            this.articlesEnMesa = data.prod;
            this.total = data.total;
          } else {
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
    addToMesa(item, index) {
      var url = `${this.ip}/?nomFun=tb_item&parm_pin=${this.pin}&parm_piso=20&parm_id_mesas=${this.mesaId}&parm_id_prod=${index}&parm_cant=1&parm_id_cmd=${this.mesa.id_cmd}&parm_id_mesero=${this.userID}&parm_tipo=M$`;
      this.$http
        .get(url)
        .then(({ data }) => {
          if (data.msg == "Ok") {
            this.articlesEnMesa = data.prod;
            this.total = data.total;
          } else {
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
    alterList(item, action) {
      var cant = 1;
      if (action == "minus") {
        cant = -1;
      }
      if (action == "remove") {
        cant = 0;
      }
      if (item.print === 1 && action != "plus") {
        this.$swal.fire({
          title: "Advertencia!",
          text: "Esta accion solo la puede ejecutar un administrador",
          icon: "warning",
          confirmButtonText: "Cool"
        });
      } else {
        var url = `${this.ip}/?nomFun=tb_item&parm_pin=${this.pin}&parm_piso=20&parm_id_mesas=${this.mesaId}&parm_id_prod=${item.idprod}&parm_cant=${cant}&parm_id_cmd=${this.mesa.id_cmd}&parm_id_mesero=${this.userID}&parm_tipo=M$`;
        this.$http
          .get(url)
          .then(({ data }) => {
            if (data.msg == "Ok") {
              this.articlesEnMesa = data.prod;
              this.total = data.total;
            } else {
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
      }
    },
    sendKitchen() {
      var url = `http://192.168.0.2:7000/?nomFun=tb_enviar_cmd&parm_pin=${this.pin}&parm_piso=20&parm_id_mesas=${this.mesaId}&parm_id_cmd=${this.mesa.id_cmd}&parm_id_mesero=${this.userID}&parm_tipo=M$`;
      this.$http
        .get(url)
        .then(({ data }) => {
          if (data.msg == "OK") {
            this.$store.dispatch("BREAK");
            this.$router.push({ name: "Home" });
            this.$swal.fire({
              title: "Enviado a cocina!",
              text: data.msg,
              icon: "success",
              confirmButtonText: "Cool"
            });
          } else {
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
    sendPrecuenta() {
      var url = `${this.ip}/?nomFun=tb_cobrar_mesa&parm_pin=${this.pin}&parm_piso=20&parm_id_mesas=${this.mesaId}&parm_id_cmd=${this.mesa.id_cmd}&parm_dade=1&parm_id_mesero=${this.userID}&parm_tipo=M$`;
      this.$http
        .get(url)
        .then(({ data }) => {
          if (data.msg == "Ok") {
            this.$store.dispatch("BREAK");
            this.$router.push({ name: "Home" });
            this.articlesEnMesa = data.prod;
            this.total = data.total;
          } else {
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
    salir() {
      this.$store.dispatch("BREAK");
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style>
#inspireme {
  height: 100vh;
}
#inspireme--body {
  height: 60vh;
}
.height--item {
  height: 6rem;
}
.shop__article__quantity {
  display: flex;
  width: 95%;
  justify-content: flex-start;
}
.shop__inp--small {
  width: 50px !important;
}
</style>