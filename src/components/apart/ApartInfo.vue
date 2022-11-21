<template>
  <div>
    아파트 정보!!!!!!!!!
    {{ apartInfo }}
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const apartStore = "apartStore";

export default {
  name: "AptInfo",
  computed: {
    ...mapState(apartStore, ["apartInfo"]),
  },
  props: {
    aptCode: { type: String },
  },
  methods: {
    ...mapActions(apartStore, ["getApartInfo"]),
  },
  created() {
    this.getApartInfo(this.props.aptCode);
  },
};
</script>

<style></style>
