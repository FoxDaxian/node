<style lang="scss" scoped>
    @import "./index.scss";
</style>

<template>
    <div class="wrap">
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
            async github () {
                console.log('发送请求');
                try {
                    const res = await this.$http({
                        method: 'post',
                        url: `${ this.url }github`,
                        body: {
                            code: this.$route.query.code
                        }
                    })
                    console.log(res)
                } catch (err) {
                    console.log(err)
                }
            },
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
            this.$route.query.code && this.github()
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

