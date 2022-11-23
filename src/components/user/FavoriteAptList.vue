<template>
  <b-container class="bv-example-row">
    <h3><b-icon icon="heart"></b-icon> Favorite Service</h3>
    <b-row class="text-center">
      <b-col md="8" offset-md="2">
        <b-table responsive :items="favoriteApts" :fields="fields">
          <template #cell(apartmentname)="data">
            <router-link :to="``" @click.native="showModal(data.item)">{{
              data.value
            }}</router-link>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <template v-if="modal">
      <apart-info :aptCode="aptCode" @closeModal="closeModal"></apart-info>
    </template>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ApartInfo from "@/components/apart/ApartInfo";

const memberStore = "memberStore";
const apartStore = "apartStore";

export default {
  name: "FavoriteAptList",
  components: {
    ApartInfo,
  },
  data() {
    return {
      modal: false,
      aptCode: "",
      fields: [{ key: "apartmentname", label: "아파트", tdClass: "tdClass" }],
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(apartStore, ["favoriteApts"]),
  },
  methods: {
    ...mapActions(apartStore, ["getFavoriteApts"]),
    showModal(data) {
      this.modal = true;
      this.aptCode = data.aptcode + "";
    },
    closeModal() {
      this.modal = false;
      this.aptCode = "";
    },
  },
  created() {
    this.getFavoriteApts(this.userInfo.userId);
  },
};
</script>

<style></style>
