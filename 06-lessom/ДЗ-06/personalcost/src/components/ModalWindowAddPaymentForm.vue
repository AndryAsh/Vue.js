<template>
  <div class="wrapper">
    <div class="form-header">Add new Payment</div>
    <div class="form-content">
      <NewCost />
    </div>
    <div class="form-footer">
      <!-- <button @click="onCloseClck">Close</button> -->
    </div>
  </div>
</template>

<script>
import NewCost from "@/components/NewCost";

export default {
  name: "ModalWindowAddPaymentForm",
  components: {
    NewCost,
  },
  methods: {
    /* onCloseClick() {
      this.$emit("close");
    }, */
  },
};
</script>
