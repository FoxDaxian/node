<style lang="scss" scoped>
    @import "./index.scss";
</style>

<template>
    <div class="wrap">
        <!-- TODO github三方登录 -->
        <a href="https://github.com/login/oauth/authorize?client_id=b697b41af4fb82574436&scope=user:email">测试github</a>
        <div class="taps">
            <div class="centerWrap">
                <div class="login" @click='login' :class="{activeClass: activePage === 'login'}">登录</div>
            </div>
            <div class="centerWrap">
                <div class="register" @click="register" :class="{activeClass: activePage === 'register'}">注册</div>
            </div>
        </div>
        <!-- 保存用户输入的状态 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {

        name: 'index',

        data () {
            return {
                curPage: ''
            }
        },
        methods: {
            login () {
                this.$router.push({
                    name: 'login'
                })
            },
            register () {
                this.$router.push({
                    name: 'register'
                })
            }
        },
        computed: {
            activePage () {
                return this.curPage
            }
        },
        mounted () {
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.curPage = to.name
            })
        },
        beforeRouteUpdate (to, from, next) {
            this.curPage = to.name
            next()
        }
    }
</script>

