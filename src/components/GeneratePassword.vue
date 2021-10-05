<template>
  <div class="main-content section-shaped overflow-hidden">
    <div class="shape shape-style-1 bg-gradient-warning shape-skew">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
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
    </v-container>
    <v-container>
      <v-row class="card-box-handle">
        <v-col cols="12" md="6">
          <div class="result">
            <h4>Password</h4>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  id="generator-password"
                  type="text"
                  :value="password"
                  disabled
                  outlined
                ></v-text-field>
                <div class="buttons">
                  <v-btn color="primary">Generate Password</v-btn>
                  <v-btn color="secondary">Copy Password</v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="options">
            <h4 class="display-1 font-weight-bold">Options</h4>
            <v-row>
              <v-col cols="12" md="12">
                <span>Password Length</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-slider
                  v-model="defaultLength"
                  :min="8"
                  :max="50"
                  class="align-center"
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model="defaultLength"
                      class="mt-0 pt-0"
                      type="number"
                      style="width: 60px"
                      outlined
                    ></v-text-field>
                  </template>
                </v-slider>
              </v-col>
              <v-col cols="12" md="12">
                <h6>Password content</h6>
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                    v-for="type in passwordContents"
                    :key="type.title"
                    class="d-flex align-baseline justify-space-between"
                  >
                    <span>{{ type.title }}</span>
                    <v-switch
                      v-model="containing"
                      color="red"
                      :checked="type.checked"
                      v-on:click="type.checked = !type.checked"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-col>
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
      ex3: { label: "thumb-color", val: 50, color: "red" },
      password: "",
      containing: "",
    };
  },
};
</script>
