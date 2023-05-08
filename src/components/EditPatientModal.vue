<template>
    <div class="modal" v-show="visible">
      <div class="modal-content">
        <h3>Edit Patient</h3>
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
            File:
            <input type="text" v-model="file" required>
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
      patient: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        name: "",
        phone: "",
        file: "",
      };
    },
    watch: {
      value(newValue) {
        if (newValue) {
          this.name = this.patient.name;
          this.phone = this.patient.phone;
          this.file = this.patient.file;
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
        const patient = {
          id: this.patient.id,
          name: this.name,
          phone: this.phone,
          file: this.file,
        };
        this.$emit("save", patient);
      },
      close() {
        this.visible = false;
        this.$emit("close");
      },
    },
  };
  </script>