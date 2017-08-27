<style lang="scss" scoped>
    @import "./index.scss";
</style>

<template>
    <div class="wrap">
        <!-- TODO github三方登录 -->
        <div @click="loginByGithub">github登录</div>
        <form>
            <div class="account">
                <label for="account">账号</label>
                <input id="account" type="text" v-model="account" @input="replaceCn">
            </div>
            <div class="password">
                <label for="password">密码</label>
                <input id="password" type="password" v-model="password">
            </div>
            <input type="submit" @click.prevent="signin">
        </form>
    </div>
</template>

<script>
    export default {

        name: 'index',

        data () {
            return {
                account: '',
                password: ''
            }
        },
        methods: {
            loginByGithub () {
                location.href = `https://github.com/login/oauth/authorize?client_id=b697b41af4fb82574436&amp;scope=user:email&amp;state=${ Math.random() }`
            },
            async signin () {
                try {
                    this.progress.start()
                    const res = await this.$http({
                        method: 'post',
                        url: `${this.url}signin`,
                        body: {
                            account: this.account,
                            password: this.password,
                        }
                    })
                    const resDate = res.body.res
                    this.$storeCommit('serUserInfo', {...resDate})
                    this.$router.push({
                        name: 'home'
                    })
                    this.notice.msg(res.body.msg, 'success', 1)
                    this.progress.done()
                } catch (err) {
                    this.notice.msg(err.body.msg, 'danger', 1)
                    this.progress.done('fail')
                }
            },
            replaceCn () {
                // 不允许输入中文
                const reg = /[\u4E00-\u9FA5]{1,}/
                this.account = this.account.replace(reg, '')
            },
        }
    }
</script>
