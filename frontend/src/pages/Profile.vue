<template>
<page>

  <page-header
    title=""
    :breadcrumbs="pageheader.breadcrumbs"
  >
  </page-header>
  <willow-messages v-for="(message, i) in messages" :key="i" :type="message.type" >{{message.msg}}</willow-messages>

  <willow-layout>
  <!-- CARD -->
    <willow-annotated-section title="Profile">
       <b-card class="mb-2">
        <h6>Profile</h6>
        <b-row class="mb-4">
          <b-col :cols="3">
            <willow-avatar :username="user.firstName + ' ' + user.lastName" :src="user.avatar"></willow-avatar>
          </b-col>
          <b-col :cols="4">
            <willow-file-input :url="'http://localhost:3000/api/users/'+ user.id + '/avatar'" :identifier="'avatar'">Update Avatar</willow-file-input>
          </b-col>
          <b-col :cols="4">
            <willow-button :disabled="user.avatar !== null">Delete Avatar</willow-button>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <label for="inputLive">First Name</label>
            <b-form-input
                  :value="user.firstName"
                  type="text"
                  placeholder="First">
            </b-form-input>
          </b-col>
          <b-col class="mb-4">
            <label for="inputLive">Last</label>
            <b-form-input
                  :value="user.LastName"
                  type="text"
                  placeholder="Last">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <label for="inputLive">Email</label>
            <b-form-input
                  :value="user.email"
                  type="text"
                  placeholder="">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <label for="inputLive">Phone</label>
            <b-form-input
                  :value="user.phoneNumber"
                  type="tel"
                  placeholder="Phone"
                  >
            </b-form-input>
          </b-col>
        </b-row>

        <h6>Password Reset</h6>
        <b-row class="mb-4">
          <b-col>
            <label for="inputLive">New Password</label>
            <b-form-input
                  :value="passwordForm.newPassword"
                  type="password"
                  v-model="passwordForm.newPassword"
                  >
            </b-form-input>
          </b-col>
          <b-col>
            <label for="inputLive">Confirm Password</label>
            <b-form-input
                  :value="passwordForm.confirmPassword"
                  type="text"
                  v-model="passwordForm.confirmPassword"
                  >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row>
           <b-col>
            <willow-button class="float-right mt-0" @click.native="updatePassword()">Reset Password</willow-button>
           </b-col>
        </b-row>
       </b-card>
    </willow-annotated-section>
  </willow-layout>

  <page-actions>
    <template slot="action-right">
      <willow-button primary>Save</willow-button>
    </template>
  </page-actions>

</page>
</template>

<script>
import api from '@/api/api'
export default {
  mounted () {
    this.fetch()
  },

  data () {
    return {
      pageheader: {
        breadcrumbs: [
          {
            text: 'Accounts',
            href: '/Admin/Settings/Accounts'
          }
        ]
      },
      user: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        avatar: null
      },
      passwordForm: {
        newPassword: null,
        confirmPassword: null
      },
      messages: null
    }
  },

  methods: {
    fetch () {
      var user = this.$store.getters.getUser
      this.user.id = user.Id
      this.user.firstName = user.FirstName
      this.user.lastName = user.LastName
      this.user.email = user.Email
      this.user.phoneNumber = user.PhoneNumber
      this.user.avatar = user.Avatar
    },

    updatePassword () {
      var params = {
        id: this.user.id,
        password: this.passwordForm.newPassword,
        confirmPassword: this.passwordForm.confirmPassword
      }
      console.log(params)
      api.updatePassword(params)
        .then(res => {
          this.$router.go()
        })
        .catch(error => {
          var messages = error.response.data.errors

          messages.forEach(message => {
            message.type = 'danger'
          })

          this.messages = messages
        })
    }
  }
}
</script>
