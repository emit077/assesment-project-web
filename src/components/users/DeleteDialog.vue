<template>
  <v-dialog v-model="dialog.flag" width="420">
    <v-card>
      <v-card-title
          class="headline flex-column lighten-2"
          primary-title
      >
        <v-icon size="5rem" color="warning">
          mdi-help-circle-outline
        </v-icon>
        {{ $lang.ARE_YOU_SURE }}?
      </v-card-title>
      <v-card-text class="flex-column text-center mb-5 ">
        {{ $lang.ARE_YOU_SURE }} {{ $lang.WANT_TO_DELETE }}
        <p>
          <span class="fw-bold" v-if="dialog.name"> {{ dialog.name }}?</span>
        </p>
      </v-card-text>

      <v-card-actions class="pb-5 px-5">
        <v-spacer></v-spacer>
        <v-btn color="secondary_2" outlined rounded class="px-5  py-4 " @click="dialog.flag=false">
          <b> {{ $lang.CANCEL }}</b>
        </v-btn>
        <v-btn color="secondary_2" rounded class="px-7  py-2 " :loading="btn_loading" @click="addMember">
          <b style="color: #ffff"> {{ $lang.DELETE }}</b>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['dialog'],
  data: () => ({
    btn_loading: false,
  }),
  created() {
    // this.initialize()
  },

  methods: {
    /* function for delete the member data */
    addMember() {
      const self = this;
      self.btn_loading = true
      var form = new FormData();

      form.append("id", self.dialog.id);


      const successHandler = (response) => {
        if (response.data.success) {
          if (self.dialog.is_edit)
            self.showSnakeBar("success", "Successfully deleted")

          self.dialog.flag = false
          self.$emit("update")
        }
      };
      const finallyHandler = () => {
        self.btn_loading = false
      };
      this.request_POST(self, this.$urls.DELETE_TEAMMATE, form, successHandler, null, null, finallyHandler)
    },
  },
}
</script>
