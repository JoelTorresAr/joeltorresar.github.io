<template>
  <div>
    <v-card color="grey" dark id="inspireme">
      <v-row>
        <v-col cols="4" class="black">
          <v-card id="inspireme">
            <v-card-title>
              <h4 class="text-center">
                <strong>Lista de articulos</strong>
              </h4>
            </v-card-title>
            <v-card-text >
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
                    <tr v-for="(item, index) in articlesEnMesa" :key="index">
                      <td>
                        <div class="shop__article__quantity">
                          <div>
                            <v-btn color="primary" fab x-small dark @click="cantidad--">
                              <v-icon>mdi-minus</v-icon>
                            </v-btn>
                          </div>
                          <div>
                            <input
                              v-model="cantidad"
                              class="shop__inp--small text-center white--text"
                              disabled
                              required
                            />
                          </div>
                          <div>
                            <v-btn color="primary" fab x-small dark @click="cantidad++">
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </td>
                      <td class="white--text">{{ item.nombre }}</td>
                      <td>
                        <v-btn color="red" fab x-small dark @click="removeItem(item)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-col cols="12" class="grey lighten-2">
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
          </v-col>
          <v-card class="d-flex flex-wrap" color="grey lighten-2" flat tile>
            <v-card
              v-for="(item, index) in articulos"
              :key="index"
              color="orange lighten-4"
              dark
              min-width="10rem"
              max-width="10rem"
              class="pa-2 mt-4 ml-4"
              @click="addToMesa(item)"
            >
              <v-card-text class="black--text height--item">{{item.nombre}}</v-card-text>

              <v-card-actions class="black">
                <strong>S/.{{item.precio}}</strong>
              </v-card-actions>
            </v-card>
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
    mesas: "",
    mesaId: "",
    pin: "",
    dialog: false,
    numcomen: 0,
    cantidad: 0
  }),
  created() {
    this.familias = JSON.parse(this.$store.getters.getFAMILIAS);
    console.log(this.familias);
    this.pin = this.$store.getters.getPIN;
    this.ip = this.$store.getters.getIP;
  },
  methods: {
    getArticles(fam) {
      this.articulos = fam.json_prod;
    },
    addToMesa(item) {
      this.articlesEnMesa.push(item);
    },
    removeItem(item) {
      const index = this.articlesEnMesa.indexOf(item);
      this.articlesEnMesa.splice(index, 1);
    }
  }
};
</script>
<style>
#inspireme {
  height: 100vh;
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