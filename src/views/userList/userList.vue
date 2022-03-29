<template>
  <b-container fluid style="padding: 0">
    <b-row align-h="center">
      <b-col md="3" lg="3" xl="3">
        <b-sidebar
          id="sidebar-1"
          z-index="0"
          :visible="true"
          :no-header-close="true"
          width="400px"
          bg-variant="dark"
        ></b-sidebar>
      </b-col>
      <b-col md="9" lg="9" xl="9">
        <b-row>
          <b-col offset="10">
            <section style="padding-top: 14px">
              <b-button variant="danger" @click="logOut">Logout</b-button>
            </section>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <section class="button">
              <b-button variant="primary" @click="$bvModal.show('modalAdd')"
                >Add User</b-button
              >
            </section>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12" lg="12" xl="12">
            <section class="table">
              <b-table
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                stacked="md"
                responsive
                show-empty
                small
                @filtered="onFiltered"
                bordered
                striped
                hover
                :busy="tableBusy"
                style="width: 90%"
              >
                <template #cell(action)="item">
                  <b-button
                    variant="warning"
                    class="mr-1"
                    title="'Edit Data'"
                    v-b-modal.modalEdit
                    @click="(data = item.item), (edit = !edit)"
                    ><b-icon icon="pencil-fill" />
                  </b-button>

                  <b-button
                    variant="danger"
                    class="mr-1"
                    title="'Hapus Data'"
                    v-b-modal.modalDelete
                    @click="user = item.item.name"
                    ><b-icon icon="trash-fill" />
                  </b-button>
                </template>
              </b-table>
            </section>
          </b-col>
        </b-row>

        <b-row>
          <b-col offset="8">
            <section style="padding-right: 16%">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
              ></b-pagination>
            </section>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <ModalEdit />
    <ModalDelete :user="user" />
    <ModalAdd />
  </b-container>
</template>

<script>
import ModalEdit from "./modalEdit";
import ModalDelete from "./modalDelete";
import ModalAdd from "./modalAdd";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import {db} from '../../firebaseInit'

// const auth = getAuth();

const fields = [
  {
    key: "no",
    label: "No",
    sortDirection: "desc",
    sortable: true,
    class: "table-number text-center",
  },
  {
    key: "name",
    label: "Full Name",
    sortable: true,
    sortDirection: "desc",
  },
  {
    key: "username",
    label: "Username",
    sortable: true,
    sortDirection: "desc",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default {
  components: {
    ModalEdit,
    ModalDelete,
    ModalAdd,
  },
  data() {
    return {
      fields,
      showing: false,
      edit: false,
      variant: "success",
      msg: "",
      loker: "",
      data: "",
      items: [
        {
          no: 1,
          name: "Name",
          username: "username",
        },
      ],
      fields: fields,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      tableBusy: false,
      user: "",
      // isLoggedIn: false,
    };
  },
  mounted() {
    let vm = this;

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     vm.isLoggedIn = true;
    //   } else {
    //     vm.isLoggedIn = false;
    //   }
    // });
    vm.getData();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    logOut() {},
    async getData() {},
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  display: flex;
  justify-content: center;
}
.button {
  padding-top: 3%;
  padding-bottom: 3%;
  display: flex;
  padding-left: 5%;
}
</style>
