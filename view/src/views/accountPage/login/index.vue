<style lang="scss" scoped>
    @import "./index.scss";
</style>

<template>
    <div class="wrap">
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
                    switch (res.body.tatus) {
                        case 0:
                            console.log('查询时出错')
                            this.progress.done('fail')
                        break;
                        case 1:
                            this.progress.done()
                            this.storeCommit('serUserInfo', {...resDate})
                            this.$router.push({
                                name: 'home'
                            })
                        break;
                        case 2:
                            console.log('没有该账户')
                            this.progress.done('fail')
                        break;
                    }
                } catch (err) {
                    console.log(err)
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
