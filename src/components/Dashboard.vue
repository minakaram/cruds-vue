<template>
  <div class="main">
    <h1>Dashboard</h1>
    <div class="grid">
      <section>
        <h2>Doctors</h2>
        <button @click="openAddDoctorModal">Add Doctor</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Specialty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doctor in doctors" :key="doctor.id">
              <td>{{ doctor.name }}</td>
              <td>{{ doctor.phone }}</td>
              <td>{{ doctor.specialty }}</td>
              <td>
                <button
                  @click="
                    editDoctorModalVisible = true;
                    editDoctor = doctor;
                  "
                >
                  Edit
                </button>
                <button @click="deleteDoctor(doctor)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <add-doctor-modal
          v-if="(openAddDoctorModal)"
          :value="addDoctorModalVisible"
          @save="addDoctor"
          @close="closeAddDoctorModal"
        ></add-doctor-modal>
        <edit-doctor-modal
          v-if="editDoctorModalVisible"
          v-bind:value="editDoctorModalVisible"
          :doctor="editDoctor"
          @save="updateDoctor"
          @close="closeEditDoctorModal"
        ></edit-doctor-modal>
      </section>
      <section>
        <h2>Patients</h2>
        <button @click="openAddPatientModal">Add Patient</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in patients" :key="patient.id">
              <td>{{ patient.name }}</td>
              <td>{{ patient.phone }}</td>
              <td>{{ patient.file }}</td>
              <td>
                <button
                  @click="
                    editPatientModalVisible = true;
                    editPatient = patient;
                  "
                >
                  Edit
                </button>
                <button @click="deletePatient(patient)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <add-patient-modal
          v-if="addPatientModalVisible"
          :value="addPatientModalVisible"
          @save="addPatient"
          @close="addPatientModalVisible = false"
        ></add-patient-modal>
        <edit-patient-modal
          v-if="editPatientModalVisible"
          v-model:value="editPatientModalVisible"
          :patient="editPatient"
          @save="updatePatient"
          @close="closeEditPatientModal"
        ></edit-patient-modal>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddDoctorModal from "./AddDoctorModal.vue";
import EditDoctorModal from "./EditDoctorModal.vue";
import AddPatientModal from "./AddPatientModal.vue";
import EditPatientModal from "./EditPatientModal.vue";

export default {
  components: {
    AddDoctorModal,
    EditDoctorModal,
    AddPatientModal,
    EditPatientModal,
  },
  data() {
    return {
      doctors: [],
      addDoctorModalVisible: false,
      patients: [],
      editDoctorModalVisible: false,
      editDoctorData: null,
      addPatientModalVisible: false,
      editPatientModalVisible: false,
      editPatient: null,
    };
  },
  async mounted() {
    try {
      const response1 = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      this.doctors = response1.data.map((item) => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        specialty: item.company.bs,
      }));
      const response2 = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      this.patients = response2.data.slice(0, 10).map((item) => ({
        id: item.id,
        name: item.title,
        phone: item.id.toString().padStart(10, "0"),
        file: item.url,
      }));
    } catch (error) {
      console.error(error);
      // Handle the error here (e.g. show an error message to the user)
    }
  },
  methods: {
    openAddDoctorModal() {
      console.log("Opening add doctor modal");
      this.addDoctorModalVisible = true;
    },
    openAddPatientModal(){
      this.addPatientModalVisible = true
      scrollTo({
        top: document.body.scrollHeight,
        behavior:"smooth"
      })
    },
    closeAddDoctorModal() {
      this.addDoctorModalVisible = false;
    },

    async editDoctor(doctor) {
      this.editDoctorData = doctor;
      this.editDoctorModalVisible = true;
    },
    closeEditDoctorModal() {
      this.editDoctorModalVisible = false;
      this.editDoctorData = null;
    },
    async addDoctor(doctor) {
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          {
            name: doctor.name,
            phone: doctor.phone,
            company: {
              bs: doctor.specialty,
            },
          }
        );
        this.doctors.push({
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone,
          specialty: response.data.company.bs,
        });
        this.addDoctorModalVisible = false;
      } catch (error) {
        console.error(error);
      }
    },
    async updateDoctor(updatedDoctor) {
      try {
        await axios.put(
          `https://jsonplaceholder.typicode.com/users/${updatedDoctor.id}`,
          {
            name: updatedDoctor.name,
            phone: updatedDoctor.phone,
            company: {
              bs: updatedDoctor.specialty,
            },
          }
        );

        const index = this.doctors.findIndex((d) => d.id === updatedDoctor.id);
        if (index !== -1) {
          this.doctors.splice(index, 1, {
            id: updatedDoctor.id,
            name: updatedDoctor.name,
            phone: updatedDoctor.phone,
            specialty: updatedDoctor.specialty,
          });
        }

        this.editDoctorModalVisible = false;
      } catch (error) {
        console.error(error);
        // Handle the error here (e.g. show an error message to the user)
      }
    },
    async deleteDoctor(doctor) {
      try {
        await axios.delete(
          `https://jsonplaceholder.typicode.com/users/${doctor.id}`
        );
        const index = this.doctors.findIndex((d) => d.id === doctor.id);
        if (index !== -1) {
          this.doctors.splice(index, 1);
        }
      } catch (error) {
        console.error(error);
        // Handle the error here (e.g. show an error message to the user)
      }
    },
    async addPatient(patient) {
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/photos",
          {
            title: patient.name,
            url: patient.file,
          }
        );
        this.patients.push({
          id: response.data.id,
          name: response.data.title,
          phone: response.data.id.toString().padStart(10, "0"),
          file: response.data.url,
        });
        this.addPatientModalVisible = false;
      } catch (error) {
        console.error(error);
        // Handle the error here (e.g. show an error message to the user)
      }
    },
    async updatePatient(updatedPatient) {
      try {
        await axios.put(
          `https://jsonplaceholder.typicode.com/photos/${updatedPatient.id}`,
          {
            title: updatedPatient.name,
            url: updatedPatient.file,
          }
        );

        const index = this.patients.findIndex(
          (p) => p.id === updatedPatient.id
        );
        if (index !== -1) {
          this.patients.splice(index, 1, {
            id: updatedPatient.id,
            name: updatedPatient.name,
            phone: updatedPatient.phone, // <-- Add the updated phone property here
            file: updatedPatient.file,
          });
        }
        this.editPatientModalVisible = false;
      } catch (error) {
        console.error(error);
        // Handle the error here (e.g. show an error message to the user)
      }
    },
    async deletePatient(patient) {
      try {
        await axios.delete(
          `https://jsonplaceholder.typicode.com/photos/${patient.id}`
        );
        const index = this.patients.findIndex((p) => p.id === patient.id);
        if (index !== -1) {
          this.patients.splice(index, 1);
        }
      } catch (error) {
        console.error(error);
        // Handle the error here (e.g. show an error message to the user)
      }
    },
    closeAddDoctorModal() {
      this.addDoctorModalVisible = false;
    },
    closeEditPatientModal() {
      this.editPatientModalVisible = false;
      this.editPatient = null;
    },
  },
};
</script>
<style>
.main{
  height: 950px;
  padding-bottom: 30px;

}
section{
  width: 100%;
}
table{
width: 100%;
}

th{
  text-align: left;
}
</style>