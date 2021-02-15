<template>
  <div>
    <b-sidebar id="sidebar-profile" width="360px" shadow>
      <b-row>
        <b-col lg="12">
          <b-row>
            <b-col lg="6" class="pl-5 text-left text-violet">
              <h5>Settings</h5>
            </b-col>
            <b-col lg="1" class="pr-5 text-right">
              <button class="btn" v-b-modal.modal-edit>Edit</button>
            </b-col>
            <b-col lg="12" class="user-profile">
              <div
                class="img-profile"
                :style="`background-image: url(http://localhost:3008/${getDataUser.image});`"
              >
                <form
                  class="form-image"
                  enctype="multipart/form-data"
                  @change.prevent="updateImage"
                >
                  <label class="custom-file-upload">
                    <input type="file" @change="upload($event)" />
                    <b-icon icon="camera2" scale="2" class="mt-1"></b-icon>
                  </label>
                </form>
              </div>
            </b-col>
            <b-col lg="12" class="mt-3">
              <div v-if="users.fullname === null || users.fullname === ''">
                <h4>Please set Profile first</h4>
              </div>
              <div v-else>
                <h4>{{ users.fullname }}</h4>
              </div>
              <p style="color: green">Online</p>
            </b-col>
            <b-col lg="12">
              <h4 class="text-left ml-4 mb-4"><strong>Account</strong></h4>
            </b-col>
            <b-col lg="12" class="text-left ml-4">
              <div v-if="users.phone === null || users.phone === ''">
                <h4>Add phone number</h4>
              </div>
              <div v-else>
                <h4>{{ users.phone }}</h4>
              </div>
              <p>Phone Number</p>
            </b-col>
            <b-col lg="12" class="text-left ml-4">
              <h6>
                <strong>@{{ users.username }}</strong>
              </h6>
              <p>Username</p>
            </b-col>
            <b-col lg="12" class="text-left ml-4">
              <div v-if="users.bio === null || users.bio === ''">
                <h4>Add Bio</h4>
              </div>
              <div v-else>
                <h6>
                  <strong>{{ users.bio }}</strong>
                </h6>
              </div>
              <p>Bio</p>
            </b-col>
            <b-col lg="12">
              <h4 class="text-left ml-4 my-4"><strong>Settings</strong></h4>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-sidebar>

    <div>
      <b-modal id="modal-edit" hide-footer sm hide-header centered>
            <b-col lg="12">
              <h4 class="my-4">Edit Profile</h4>
            </b-col>
            <form>
              <b-col lg="12">
                <div class="form-group">
                  <label>Fullname</label>
                  <input
                    v-model="users.fullname"
                    type="text"
                    class="form-control"
                    placeholder="Masukan nama lengkap"
                  />
                </div>
              </b-col>
              <b-col lg="12">
                    <div class="form-group">
                      <label>Phone Number</label>
                      <input
                        v-model="users.phone"
                        type="text"
                        class="form-control"
                        placeholder="Masukan nama lengkap"
                      />
                    </div>
              </b-col>
              <b-col lg="12">
                <div class="form-group">
                  <label>Bio</label>
                  <textarea
                    v-model="users.bio"
                    class="form-control"
                    rows="5"
                    placeholder="Bio anda"
                  ></textarea>
                </div>
              </b-col>
            </form>
            <b-col lg="12" class="text-right">
              <button class="btn" @click="saveDataUser()">Save</button>
            </b-col>
      </b-modal>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      detailuser: JSON.parse(localStorage.getItem('detail')),
      users: {
        fullname: '',
        username: '',
        phone: '',
        bio: '',
        image: ''
      }
    }
  },
  methods: {
    ...mapActions({
      dataUser: 'auth/getDetailUser',
      updateUser: 'auth/updateProfile',
      updateImageData: 'auth/updateImage'
    }),
    upload (event) {
      this.users.image = event.target.files[0]
    },
    updateImage () {
      const dataimage = {
        image: this.users.image,
        id: this.detailuser.id
      }
      this.updateImageData(dataimage).then((result) => {
        if (result === 'Update success') {
          Swal.fire('Good job!', 'Success Update Users', 'success')
          location.reload()
        }
        // console.log(result)
      })
    },
    saveDataUser () {
      this.users.id = this.detailuser.id
      this.updateUser(this.users).then((response) => {
        if (response === 'Update success') {
          Swal.fire('Good job!', 'Success Update Users', 'success')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response}`
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getDataUser: 'auth/getDetailUser'
    })
  },
  mounted () {
    this.dataUser(this.detailuser.id).then((result) => {
      const dataOld = result
      this.users.fullname = dataOld.fullname
      this.users.username = dataOld.username
      this.users.phone = dataOld.phone
      this.users.bio = dataOld.bio
    })
  }
}
</script>

<style scoped>
.img-profile {
  width: 120px;
  height: 120px;
  margin-top: 20px;
  margin-left: 120px;
  background-size: cover;
  border-radius: 70px;
  cursor: pointer;
}
.custom-file-input::-webkit-file-upload-button {
  cursor: pointer;
  height: 78px;
  width: 78px;
}
.form-image {
  height: 100%;
  border-radius: 30px;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-image:hover {
  background-color: rgba(5, 5, 5, 0.3);
}
.custom-file-upload input[type="file"] {
  display: none;
  border-radius: 10px;
  font-weight: bold;
  padding: 8px;
  margin: 20px auto;
}
.custom-file-upload {
  color: white;
  padding: 25px 20px;
  opacity: 0;
}
.custom-file-upload:hover {
  opacity: 1;
}
</style>
