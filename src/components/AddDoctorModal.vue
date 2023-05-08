<template>
  <div class="modal" v-show="visible">
    <div class="modal-content">
      <h3>Add Doctor</h3>
      <form @submit.prevent="save">
        <label>
          Name:
          <input type="text" v-model="name" required>
        </label>
        <label>
          Phone:
          <input type="tel" v-model="phone" required>
        </label>
        <label>
          Specialty:
          <input type="text" v-model="specialty" required>
        </label>
        <button type="submit">Save</button>
        <button type="button" @click="close">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      phone: "",
      specialty: "",
    };
  },
  watch: {
    value(newValue) {
      if (newValue) {
        this.name = "";
        this.phone = "";
        this.specialty = "";
      }
    },
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    save() {
      const doctor = {
        name: this.name,
        phone: this.phone,
        specialty: this.specialty,
      };
      this.$emit("save", doctor);
    },
    close() {
      this.visible = false;
      this.$emit("close");
    },
  },
};
</script>