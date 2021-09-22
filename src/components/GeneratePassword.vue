<template>
    <div>
        <section class="section section section-shaped my-0 overflow-hidden">
            <div class="shape shape-style-1 bg-gradient-warning shape-skew">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="container py-0">
                <div class="row align-items-center">

                    <!--Man Image!-->
                    <div class="col-md-6 order-lg-2 ml-lg-auto">
                        <div class="position-relative pl-md-5">
                            <img src="@/assets/pass-img-bg.svg"
                                 class="img-center img-fluid"
                                 alt="man generate password">
                        </div>
                    </div>
                    <!--Man Image!-->

                    <!--Introduction!-->
                    <div class="col-lg-6 order-lg-1">
                        <div class="d-flex px-3">

                            <!-- Generate Password Icon!-->
                            <div>
                                <div class="icon icon-shape bg-gradient-white icon-lg shadow rounded-circle text-icon">
                                    <i class="material-icons">lock_open</i>
                                </div>
                            </div>
                            <!--Generate password Title introduction!-->
                            <div class="pl-4">
                                <h4 class="display-3 text-white">Generate Password</h4>
                                <p class="text-white intro">Simple random password generator</p>
                            </div>

                        </div>
                    </div>
                    <!--Introduction!-->

                </div>
            </div>

            <!--generate password card!-->
            <div class="container">

                <div class="row card-box-handle">

                    <!--Generate password Input!-->
                    <div class="col-md-6 col-sm-6">
                        <div class="generator">
                            <div class="generator-result">
                                <h4>Password</h4>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="input-group input-icon-bg">
                                            <input id="generator-password"
                                                   type="text"
                                                   :value="password"
                                                   disabled
                                            >
                                            <div class="buttons">
                                                <button class="btn pass-btn"
                                                        @click="generateNewPassword"
                                                >
                                                    Generate Password
                                                </button>
                                                <button class="btn pass-btn"
                                                        @click="copyPassword"
                                                >
                                                    Copy Password
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Options for generate password!-->
                    <div class="col-md-6 col-sm-6">

                        <div class="options">
                            <h4 class="display-3">Options</h4>
                            <div class="row o-m-15">
                                <span>Password Length</span>
                            </div>
                            <div class="row o-m-15 length">
                                <input type="range"
                                       min="8"
                                       max="50"
                                       class="options-range"
                                       v-model="defaultLength"

                                >
                                <input type="number"
                                       min="8"
                                       max="50"
                                       class="options-number"
                                       v-model="defaultLength"
                                >
                            </div>
                            <div class="row o-m-15">
                                <h6><label for="">Password content</label></h6>
                            </div>
                            <div class="row o-m-15 switch"
                                 v-for="type in passwordContents"
                                 :key="type.title"
                            >
                                <span>{{type.title}}</span>
                                <label class="switch-items">
                                    <input type="checkbox"
                                           :checked="type.checked"
                                           v-on:click="type.checked = !type.checked"
                                    >
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'GeneratePassword',
        /**
         * @inheritDoc
         * @returns {{defaultLength: number, passwordContents: [{checked: boolean, title: string, value: string}, {checked: boolean, title: string, value: string}, {checked: boolean, title: string, value: string}, {checked: boolean, title: string, value: string}]}}
         */
        data() {
            return {
                defaultLength   : 8,
                passwordContents: [
                    {
                        title  : 'UpperCase',
                        value  : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                        checked: false,
                    },
                    {
                        title  : 'LowerCase',
                        value  : 'abcdefghijklmnopqrstuwxyz',
                        checked: true,
                    },
                    {
                        title  : 'Numbers',
                        value  : '0123456789',
                        checked: true,
                    },
                    {
                        title  : 'Symbols',
                        value  : '`!@#$%^&*)(-_+=}{][/|?><',
                        checked: false,
                    },
                ],
                password        : '',
            };
        },
        methods: {
            /**
             * Generate New Random Password
             */
            generateNewPassword() {
                let resultPass = '';
                let charsVal = '';
                for (let i = 0; i < this.passwordContents.length; i++) {
                    if (this.passwordContents[i].checked) {
                        charsVal += this.passwordContents[i].value;
                    }
                }
                for (let j = 0; j < this.defaultLength; j++) {
                    resultPass += charsVal.charAt(Math.floor(Math.random() * charsVal.length));
                }
                this.password = resultPass;
            },
            /**
             * Copy Password
             */
            copyPassword() {
                let copyPassText = this.password;
                navigator.clipboard.writeText(copyPassText).then(() => {
                    console.log('Copied!');
                }, function () {
                    console.log('Error happen');
                });
            },
        },
    };
</script>