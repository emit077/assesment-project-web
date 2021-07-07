<template>
  <div>

    <v-row class="ma-4" justify="end">
      <v-col class="text-right" md="6">
        <p class="" @click="dialog_data.flag=true">
          Add Members
          <v-btn color="secondary_2" depressed fab rounded small>
            <v-icon color="white">
              mdi-plus
            </v-icon>
          </v-btn>
        </p>

      </v-col>
    </v-row>

    <v-card flat>
      <v-data-table
          :disable-sort="true"
          :headers="headers"
          :items="user_data_list"
          :items-per-page="$keys.PAGE_LENGTH"
          :loading="table_loading"
          class="border-a border-0 custome-header-bg"
          hide-default-footer
      >

        <template v-slot:item.action="{ item }">
          <v-btn class="mr-2" fab small text @click="openEditDialog(item.id)">
            <img alt="" src="@/assets/images/edit.svg" width="20">
          </v-btn>
          <v-btn fab small text @click="openDeleteDialog(item)">
            <img alt="" src="@/assets/images/delete.svg" width="20">
          </v-btn>
        </template>

      </v-data-table>
    </v-card>

    <v-pagination
        v-model="page_number"
        :length="total_page_count"
        :total-visible="7"
        class="custome-pagination"
        @input="getTeammateList"
    ></v-pagination>
    <!--  add/edit dialog -->
    <AddMemberDialog ref="add_member_dialog" :dialog="dialog_data" @update="getTeammateList"></AddMemberDialog>
    <!--    delete dialog-->
    <DeleteDialog :dialog="delete_dialog" @update="getTeammateList"></DeleteDialog>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  components: {
    AddMemberDialog: () => import("@/components/team/AddMemberDialog"),
    DeleteDialog: () => import("@/components/team/DeleteDialog"),
  },
  data() {
    return {
      table_loading: false,
      page_number: 1,
      total_page_count: 2,
      user_data_list: [],
      headers: [
        {text: 'Name', value: 'name'},
        {text: 'Mobile No.', value: 'mobile'},
        {text: 'Email', value: 'email'},
        {text: '', value: 'action', align: 'end'},
      ],
      /*dialog data*/
      dialog_data: {
        flag: false,
        title: "",
        is_edit: false,
        loading: false,
      },
      delete_dialog: {
        flag: false,
        id: "",
        name: "",
      }
    }
  },
  computed: {
    ...mapGetters({
      search_query: 'getSearchText'
    })
  },
  watch: {
    search_query(new_search_query, old_search_query) {
      if (new_search_query != old_search_query) {
        this.getTeammateList()
      }

    }
  },
  created() {
    console.log(this.$route.meta.show_back_btn)
    this.getTeammateList()
  },
  methods: {
    /* fetching the customer list form server*/
    getTeammateList() {
      const self = this;
      self.table_loading = true;
      self.toggle_loading()
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
      };
      console.log(params);
      const successHandler = (response) => {
        if (response.data.success) {
          self.user_data_list = response.data.user_data;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        // self.toggle_loading()
      };

      self.request_GET(self, self.$urls.TEAMMATE_LIST, params, successHandler, null,
          null, finallyHandler);
    },
    /* Open the Add member dialog form */
    openAddDialog() {
      this.dialog_data.title = this.$lang.ADD_MEMBER
      this.dialog_data.is_edit = false
      this.dialog_data.flag = true
      setTimeout(() => {
        this.$refs.add_member_dialog.resetForm()
        this.$refs.add_member_dialog.id = null
      }, 80);


    },
    /*Open the edit dialog form*/
    openEditDialog(id) {
      this.dialog_data.title = this.$lang.EDIT_MEMBER
      this.$refs.add_member_dialog.getMemberDetails(id)
      this.dialog_data.is_edit = true
      this.dialog_data.flag = true
    },
    openDeleteDialog(item) {
      this.delete_dialog.id = item.id
      this.delete_dialog.name = item.name
      this.delete_dialog.flag = true
    }
  }
}

</script>