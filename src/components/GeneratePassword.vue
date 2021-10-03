<template>
  <div class="main-content">
    <v-container>
      <v-row class="align-center">
        <v-col cols="12" md="6">
          <div class="d-flex px-3">
            <div class="intro-icon">
              <v-icon color="deep-purple darken-4">
                mdi-lock-open-outline
              </v-icon>
            </div>
            <div class="pl-3">
              <h4 class="display-1 font-weight-black white--text">
                Generate Password
              </h4>
              <p class="white--text text-center font-weight-bold">
                Simple random password generator
              </p>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="@/assets/images/pass-img-bg.svg" class="intro-img" />
        </v-col>
      </v-row>

      <v-row class="card-box-handle">
        <v-col cols="12" md="6">
          <div class="generator-result">
            <h4>Password</h4>
            <v-row>
              <v-col cols="12" md="12">
                <div>
                  <v-text-field
                    name="input-10-2"
                    label="Error"
                    outlined
                  ></v-text-field>
                  <div class="buttons">
                    <v-btn color="success">Generate Password</v-btn>
                    <v-btn color="success">Copy Password</v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div class="options">
            <h4 class="display-3">Options</h4>
            <span>Password Length</span>
            <v-row>
              <v-text-field
                type="range"
                min="8"
                max="50"
                class="options-range"
                v-model="defaultLength"
              ></v-text-field>
              <v-text-field
                type="number"
                min="8"
                max="50"
                class="options-number"
                v-model="defaultLength"
              ></v-text-field>
            </v-row>
            <v-row>
              <h6><label for="">Password content</label></h6>
              <v-row v-for="type in passwordContents" :key="type.title">
                <span>{{ type.title }}</span>
                <input
                  type="checkbox"
                  :checked="type.checked"
                  v-on:click="type.checked = !type.checked"
                />
              </v-row>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultLength: 8,
      passwordContents: [
        {
          title: "UpperCase",
          value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          checked: false,
        },
        {
          title: "LowerCase",
          value: "abcdefghijklmnopqrstuwxyz",
          checked: true,
        },
        {
          title: "Numbers",
          value: "0123456789",
          checked: true,
        },
        {
          title: "Symbols",
          value: "`!@#$%^&*)(-_+=}{][/|?><",
          checked: false,
        },
      ],
      password: "",
    };
  },
};
</script>
