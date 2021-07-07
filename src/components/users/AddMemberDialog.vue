<template>
  <v-dialog v-model="dialog.flag" width="500px">
    <v-card>
      <DivLoader v-if="dialog.loading" :loading_type="'article, list-item-two-line, list-item-two-line, actions'">

      </DivLoader>
      <div v-else>
        <v-form ref="add_member_form" lazy-validation @submit.prevent="addmember()">
          <v-card-title class="pl-7">
            <span class="headline">{{ dialog.title }}</span>
          </v-card-title>
          <v-card-text>

            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12" class="py-1">
                  <v-text-field
                      v-model="form.name"
                      :label="$lang.NAME"
                      :rules="$rules.NAME"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    class="py-1"
                >
                  <v-text-field
                      v-model="form.mobile"
                      :label="$lang.MOBILE"
                      :rules="$rules.MOBILE"
                      maxlength="10"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    class="py-1"
                >
                  <v-text-field
                      v-model="form.email"
                      :label="$lang.EMAIL"
                      :rules="$rules.EMAIL"

                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions class="pb-5 px-5">
            <v-spacer></v-spacer>
            <v-btn color="secondary_2" outlined rounded class="px-5  py-4 " @click="dialog.flag=false">
              <b> {{ $lang.CANCEL }}</b>
            </v-btn>
            <v-btn color="secondary_2" rounded class="px-7  py-5 " type="submit" @click="addMember">
              <b style="color: #ffff"> {{ $lang.SAVE }}</b>
            </v-btn>
          </v-card-actions>
        </v-form>
      </div>
    </v-card>

  </v-dialog>
</template>
<script>
export default {
  props: ['dialog'],
  components: {
    DivLoader: () => import("@/components/ui/DivLoader"),
  },
  data: () => ({
    id: "",
    form: {
      name: '',
      email: '',
      mobile: "",
    },
  }),
  created() {
    // this.initialize()
  },

  methods: {
    /* function to fetch data from api */
    getMemberDetails(id) {
      const self = this;
      self.id = id
      self.loading = true;
      let params = {
        "id": id
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.form = response.data.user_data
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
      };
      self.request_GET(self, self.$urls.TEAMMATE_DETAILS, params, successHandler, null,
          null, finallyHandler);
    },
    /* reset the form */
    resetForm() {
      this.$refs.add_member_form.reset()
    },
    /* function for save the member data */
    addMember() {
      const self = this;
      if (this.$refs.add_member_form.validate() == false)
        return false
      self.login_loading = true
      var form = new FormData();
      form.append("mobile", self.form.mobile);
      form.append("email", self.form.email);
      form.append("name", self.form.name);

      if (self.dialog.is_edit)
        form.append("id", self.id);


      const successHandler = (response) => {
        if (response.data.success) {
          if (self.dialog.is_edit)
            self.showSnakeBar("success", "Successfully updated")
          else
            self.showSnakeBar("success", "Successfully register")

          self.dialog.flag = false
          self.$emit("update")
        }
      };
      const finallyHandler = () => {
        self.login_loading = false
      };
      this.request_POST(self, this.$urls.REGISTER_TEAMMATE, form, successHandler, null, null, finallyHandler)
    },
  },
}
</script>
