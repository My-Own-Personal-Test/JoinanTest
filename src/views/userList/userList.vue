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
          title="Joinan Test"
        >
          <section class="sideBar">
            <router-link to="/">Dashboard</router-link>
            <router-link to="/userLists">User List</router-link>
          </section>
        </b-sidebar>
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
                    @click="openEdit(item.item)"
                    ><b-icon icon="pencil-fill" />
                  </b-button>

                  <b-button
                    variant="danger"
                    class="mr-1"
                    title="'Hapus Data'"
                    @click="openDelete(item.item)"
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
        <Alert :show="show" :variant="variant" :msg="msg" />
      </b-col>
    </b-row>
    <ModalEdit :data="data" @alertFromChild="triggerAlert($event)" />
    <ModalDelete :data="data" @alertFromChild="triggerAlert($event)" />
    <ModalAdd @alertFromChild="triggerAlert($event)" />
    <ModalLogout />
  </b-container>
</template>

<script>
import ModalEdit from "./modalEdit";
import ModalDelete from "./modalDelete";
import ModalAdd from "./modalAdd";
import ModalLogout from "./modalLogout";
import axios from "@/baseURL";
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
    key: "nama",
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
    key: "email",
    label: "Email",
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
    ModalLogout,
  },
  data() {
    return {
      fields,
      edit: false,
      variant: "success",
      msg: "",
      loker: "",
      data: {},
      items: [],
      fields: fields,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      tableBusy: false,
      user: "",
      msg: "",
      show: false,
      variant: "",
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
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    logOut() {
      this.$bvModal.show("modalLogout");
    },
    async getData() {
      try {
        let vm = this;
        vm.tableBusy = true;

        let get = await axios.get("user/ALL", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        if (get.data.message === "sukses" && get.data.data.length > 0) {
          vm.tableBusy = false;
          vm.items = get.data.data;
          vm.totalRows = vm.items.length;

          for (let index = 0; index < vm.items.length; index++) {
            vm.items[index].no = index + 1;
          }
        }
      } catch (error) {
        vm.tableBusy = false;
        vm.msg = "GANGGUAN KONEKSI PADA SERVER! COBA BEBERAPA SAAT LAGI";
        vm.variant = "danger";
        vm.show = true;

        setTimeout(() => {
          vm.show = false;
        }, 3000);
      }
    },
    openEdit(item) {
      this.data = item;
      if (this.data != {}) {
        this.$bvModal.show("modalEdit");
      }
    },
    openDelete(item) {
      this.data = item;
      if (this.data != {}) {
        this.$bvModal.show("modalDelete");
      }
    },
    triggerAlert(payload) {
      let vm = this;
      vm.msg = payload.msg;
      vm.variant = payload.variant;
      vm.show = payload.show;
      vm.getData();
      setTimeout(() => {
        vm.show = false;
      }, 3000);
    },
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
.alert {
  margin: auto;
  position: absolute;
  width: 32%;
  left: 0;
  right: 0;
  bottom: 0;
}
.sideBar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 20px;
}
.sideBar a {
  text-decoration: none;
  color: black;
  margin-bottom: 4%;
}
.sideBar a:hover {
  color: rgb(66, 120, 238);
}
</style>
