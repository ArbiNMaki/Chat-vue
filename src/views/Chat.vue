<template>
  <div class="container-fluid">
    <b-row>
      <b-col lg="12">
        <b-row>
          <b-col lg="3">
            <b-row>
              <div class="chat-header">
                <b-col lg="12">
                  <b-row class="pt-4">
                    <b-col lg="9" cols="9">
                      <h4 class="text-left title">Telegram</h4>
                    </b-col>
                    <b-col lg="2" cols="2">
                      <b-col class="text-right text-white">
                        <b-dropdown
                          id="dropdown-dropleft"
                          dropleft
                          text="Drop-Left"
                          variant="violet"
                        >
                          <template v-slot:button-content>
                            <b-icon-justify-left
                              class="icon"
                            ></b-icon-justify-left>
                          </template>
                          <div class="dropdown-setting">
                            <b-dropdown-item v-b-toggle.sidebar-profile
                              ><b-icon-gear class="mr-3"></b-icon-gear>
                              Setting</b-dropdown-item
                            >
                            <b-dropdown-item @click="location()"
                              ><b-icon-box-arrow-right
                                class="mr-3"
                              ></b-icon-box-arrow-right>
                              Location</b-dropdown-item
                            >
                            <b-dropdown-item @click="logout()"
                              ><b-icon-box-arrow-right
                                class="mr-3"
                              ></b-icon-box-arrow-right>
                              Logout</b-dropdown-item
                            >
                          </div>
                        </b-dropdown>
                      </b-col>
                      <Profile />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col lg="12" cols="12" class="text-left py-2">
                      <h4>@{{ username }}</h4>
                    </b-col>
                  </b-row>
                  <b-row class="pb-4 px-3">
                    <b-col lg="10" cols="10" class="search">
                      <b-row class="py-2">
                        <div class="input-group px-3">
                          <div class="input-group-prepend">
                            <button
                              class="btn btn-outline-secondary"
                              type="button"
                              id="button-addon1"
                            >
                              <img src="../assets/img/Search.png" alt="" />
                            </button>
                          </div>
                          <input
                            type="text"
                            class="form-control"
                            placeholder=""
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                          />
                        </div>
                      </b-row>
                    </b-col>
                    <b-col lg="2" cols="2" class="py-2">
                      <button class="btn">
                        <img
                          src="../assets/img/Plus.png"
                          style="text-align: center"
                        />
                      </button>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col lg="12" class="pb-3">
                  <b-row>
                    <b-col lg="3" cols="3">
                      <h5 class="pt-2">All</h5>
                    </b-col>
                    <b-col lg="5" cols="5" class="important text-white">
                      <h5 class="pt-2">Important</h5>
                    </b-col>
                    <b-col lg="4" cols="4">
                      <h5 class="pt-2">Unread</h5>
                    </b-col>
                  </b-row>
                </b-col>
              </div>
              <div class="chat-list">
                <b-col lg="12" v-for="(item, index) in listUsers" :key="index">
                  <b-row v-if="username !== item.username">
                    <b-col lg="2" cols="2">
                      <div
                        class="profile-image"
                        :style="`background-image: url(http://localhost:3008/${item.image});`"
                      ></div>
                    </b-col>
                    <b-col
                      lg="7"
                      cols="7"
                      @click="
                        selectUser(item.username, item.image, item.online)
                      "
                      class="btn"
                    >
                      <b-row class="text-left pl-4 pt-1">
                        <b-col lg="12" cols="12">
                          <h6>{{ item.username }}</h6>
                        </b-col>
                        <b-col lg="12" cols="12" class="message-look">
                          <p @click="cek(item.id)">Lorem ...</p>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col lg="2" cols="2">
                      <b-row>
                        <b-col lg="12" class="text-left">
                          <p style="text-align: center">15.20</p>
                        </b-col>
                        <b-col lg="12" class="text-right pl-3">
                          <div class="notification">
                            <p class="text-white" style="text-align: center">
                              212
                            </p>
                          </div>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-col>
              </div>
            </b-row>
          </b-col>
          <b-col lg="9" class="select-chat">
            <div v-if="userReceiver === null">
              <EmptyChat />
            </div>
            <div v-else>
              <b-row>
                <b-col lg="2" class="mt-4">
                  <b-row class="text-left">
                    <b-col lg="12">
                      <h5>{{ userReceiver }}</h5>
                    </b-col>
                    <b-col lg="12" class="online text-left">
                        <p style="color: green">Online</p>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col lg="12">
                  <div class="card">
                    <div class="card-body">
                      <div class="message">
                        <!-- nanti untuk pesan -->

                        <div v-if="userReceiver !== null">
                          <div
                            class="text-left"
                            v-for="(item, index) in historyMessages"
                            :key="index"
                          >
                            <div v-if="item.sender !== username">
                              <p
                                class="text-left mr-auto chat-from text-white my-2"
                              >
                                {{ item.message }}
                              </p>
                            </div>

                            <div v-else>
                              <div>
                                <div>
                                  <b-dropdown
                                    variant="outline"
                                    menu-class="dropmenu"
                                    no-caret
                                  >
                                    <template v-slot:button-content>
                                      <img
                                        src="../assets/img/back.png"
                                        width="80%"
                                        id="btn-menu-delete"
                                      />
                                    </template>

                                    <b-dropdown-item-button
                                      class="mt-2 mb-2"
                                      @click="deleteMsg(item.id, index)"
                                    >
                                      Delete Message
                                    </b-dropdown-item-button>
                                  </b-dropdown>
                                </div>
                                <p
                                  class="text-right chat-to ml-auto text-white"
                                >
                                  {{ item.message }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            class="text-right"
                            v-for="(item, index) in privateMessages"
                            :key="index"
                          >
                            <!-- {{item.message}} -->
                            <div v-if="item.sender !== username" class="mt-4">
                              <p
                                class="text-left mr-auto chat-from text-white my-2"
                              >
                                {{ item.message }}
                              </p>
                            </div>

                            <div v-else>
                              <p class="text-right chat-to ml-auto text-white">
                                {{ item.message }}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <div
                            v-for="(item, index) in listMessages"
                            :key="index"
                          >
                            {{ item.message }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <form @submit.prevent="sendMessage">
                        <div class="input-group mb-3">
                          <input
                            v-model="message"
                            type="text"
                            class="form-control"
                            placeholder="Message ..."
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-outline-secondary"
                              type="button"
                            >
                              <img src="../assets/img/Plus.png" alt="" />
                            </button>
                            <button
                              class="btn btn-outline-secondary"
                              type="button"
                            >
                              <img src="../assets/img/Vector.png" alt="" />
                            </button>
                            <button
                              class="btn btn-outline-secondary"
                              type="button"
                            >
                              <img src="../assets/img/Group 181.png" alt="" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import EmptyChat from '../components/EmptyChat'
import { mapActions, mapGetters } from 'vuex'
import io from 'socket.io-client'
import Profile from '../components/Profile'

export default {
  components: {
    EmptyChat,
    Profile
  },
  data () {
    return {
      usersData: JSON.parse(localStorage.getItem('datauser')),
      username: localStorage.getItem('username'),
      listUsers: [],
      listMessages: [],
      privateMessages: [],
      historyMessages: [],
      message: '',
      userReceiver: null,
      imgReceiver: null,
      socket: io('http://localhost:3008')
    }
  },
  computed: {
    ...mapGetters({
      detailUser: 'auth/getDetailUser'
    })
  },
  methods: {
    ...mapActions({
      onLogout: 'auth/logout',
      onGetDetail: 'auth/getDetailUser'
    }),
    cek (id) {
      alert(id)
    },
    logout () {
      this.onLogout().then((response) => {
        window.location = '/login'
      })
    },
    location () {
      window.location = '/map'
    },
    selectUser (username) {
      this.privateMessages = []
      this.listMessages = []
      this.userReceiver = username
      this.getPrivateMessages()
      this.socket.emit('get-history-message', {
        sender: this.username,
        receiver: username
      })
      this.getHistoryMessages()
    },
    getPrivateMessages () {
      const privateMessage = this.listMessages.filter(
        (item) =>
          item.sender === this.userReceiver || item.sender === this.username
      )
      this.privateMessages = privateMessage
    },
    getHistoryMessages () {
      this.socket.on('history-list-messages', (data) => {
        this.historyMessages = data
      })
    },
    deleteMsg (id, index) {
      this.socket.emit('delete-message', id)
      this.historyMessages.splice(index, 1)
    },
    sendMessage () {
      const msg = `${this.message}`
      this.listMessages = [
        ...this.listMessages,
        {
          sender: this.username,
          message: msg,
          receiver: this.userReceiver
        }
      ]
      this.getPrivateMessages()
      this.socket.emit('send-message', {
        sender: this.username,
        message: this.message,
        receiver: this.userReceiver
      })
      this.message = ''
    }
  },
  mounted () {
    this.socket.emit('get-all-users', [])
    this.socket.on('list-users', (data) => {
      this.listUsers = data
    })
    this.socket.emit('join-room', {
      user: this.username
    })
    this.socket.on('list-messages', (message) => {
      this.listMessages = [...this.listMessages, message]
      if (this.userReceiver !== null) {
        this.$toasted.show(`<b-icon-bell></b-icon-bell> Ada Pesan dari ${message.sender}`, {
          type: 'danger',
          duration: 5000,
          keepOnHover: true
        })
        this.getPrivateMessages()
      }
    })
    this.getHistoryMessages()
    this.onGetDetail(this.usersData.id).then((result) => {
      const dataOld = result
      this.username = dataOld.username
    })
  }
}
</script>
<style scoped>
.important {
  background: #7e98df;
  border-radius: 20px;
}
.user-login img {
  width: 40px;
  height: 40px;
  border-radius: 30px;
}
.select-chat {
  background: #fafafa;
}
.message-look {
  letter-spacing: -0.165px;
  color: #7e98df;
}
.notification {
  width: 20px;
  height: 20px;
  background: #7e98df;
  border-radius: 30px;
}
.profile-img {
  width: 64px;
  height: 64px;
  border-radius: 10px;
}
.profile-chat {
  width: 50px;
  background-size: cover;
  height: 50px;
  border-radius: 70px;
}
.profile-image {
  width: 50px;
  background-size: cover;
  height: 50px;
  border-radius: 70px;
}
.online p {
  letter-spacing: -0.165px;
  color: #7e98df;
}
.title {
  color: #7e98df;
}
.search {
  background: #fafafa;
  border-radius: 15px;
  outline: none;
}
.message {
  height: 60vh;
  overflow: auto;
}
.chat-message {
  position: fixed;
}
.chat-from {
  width: fit-content;
  background: #7e98df;
  padding: 15px 20px;
  margin-left: 10px;
  border-radius: 10px 35px 35px 35px;
}
.chat-to {
  width: fit-content;
  background: #e84466;
  padding: 15px 20px;
  margin-right: 10px;
  border-radius: 35px 10px 35px 35px;
}
.chat-to p {
  color: white;
}
.tombol {
  width: 50px;
  height: 30px;
}
.dropdown-setting {
  background: #7e98df;
  border-radius: 35px 10px 35px 35px;
}
</style>
