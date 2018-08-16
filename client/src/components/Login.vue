<template>
    <div class="centerDiv">
        <form @submit.prevent="login">
            <table cellpadding="5" cellspacing="2">
                <tr>
                    <td><label>Nick Name</label></td>
                    <td><input v-model="username" type="text" name="userName" /></td>
                </tr>
                <tr>
                    <td><label>Age</label></td>
                    <td><input v-model="age" type="number" name="password" min="18" max="60" /></td>
                </tr>
                <tr>
                    <td><input type="checkbox" /><small>Remember Me</small></td>
                    <td align="right"><input type="submit" value="Login" /></td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: function () {
        return {
            username: 'John Doe',
            age: 24,
        }
    },
    methods: {
        login: function(){
            this.$session.start()
            this.$session.set('username', this.username)
            this.$session.set('age', this.age);
            this.$store.state.user.username = this.$session.get(this.username)
            this.$store.state.user.age = this.$session.get(this.age)
            // console.log(this.$store.state.user.age)
            console.log('setting COOKIE :username ' + this.$session.get('username'))
            console.log('done')

            this.$router.push('/')
        }
    },
}
// all the JS scripts goes here
</script>

<style scoped>
    /* all the styles goes here */
.centerDiv {
    width: 325px;
    height: 100px;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border:1px solid red;
    padding:15px;
}
</style>
