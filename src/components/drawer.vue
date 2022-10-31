<template>

    <v-navigation-drawer
          mini-variant
          app
          dark
          color="#2B266C"
          permanent
        >
        <template v-slot:prepend>
          <v-list>
            <v-list-item class="px-3 pt-3">
                <img src="@/assets/tecnm.png" height="42">
            </v-list-item>
          </v-list>
        </template>

        <v-sheet class="d-flex align-center" height="100%" color="rgba(0,0,0,0)" v-if="$store.state.nav">
                <v-list
                    nav
                    dense
                    width="100%"
                >
                    <v-list-item link to="/" id="step-0">
                      <v-list-item-icon>
                          <v-icon>mdi-home</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Inicio</v-list-item-title>
                    </v-list-item>

                    <v-list-item link to="/login" id="step-1">
                      <v-list-item-icon>
                          <v-icon>mdi-account-group</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Personal</v-list-item-title>
                    </v-list-item>
<!--
                    <v-list-item link to="/administrador/login" id="step-2">
                    <v-list-item-icon>
                        <v-icon>mdi-account-lock</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Administrador</v-list-item-title>
                    </v-list-item>
-->
            </v-list>
        </v-sheet>



          <template v-slot:append>
            <div class="pa-0.5">

              <!--
              <v-list-item link @click="onloadhelp">
                <v-list-item-icon>
                  <v-icon>mdi-help</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Ayuda</v-list-item-title>
              </v-list-item>
              -->
            </div>
          </template>

    </v-navigation-drawer>
</template>
<script>

export default {
  name: 'drawer',
  mounted() {
  },
  data: () => ({


  }),
  methods: {
    onloadhelp(){
      this.$tours[this.$router.history.current.name].start()
    }
  }
}
</script>