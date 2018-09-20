<template>
  <div>
    <div class="chat-header">
      #{{id}}: {{prefix}} {{name}}
    </div>
    <div class="chat-body" ref="conversation">
      <div v-for="(m, i) in messages" :key="i">
        <div class="message-left" v-if="m.sender === 'user'">
          <img :src="thread.img">
          <span>{{ m.message }}</span>
        </div>
        <div class="message-right" v-else>
          <img src="https://is3-ssl.mzstatic.com/image/thumb/Purple128/v4/86/70/a5/8670a5dc-5351-6c83-5145-f6fa2c11f6d4/source/512x512bb.jpg">
          <span>{{ m.message }}</span>
        </div>
      </div>
    </div>
    <div class="chat-type-box">
      <input v-model="inputMessageBox"
      type="text"
      class="type-box"
      placeholder="Say hi ..."
      @keyup.enter="sendMessage">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  props: {
    thread: Object,
    name: String,
    prefix: String,
    id: Number,
    msg: Array
  },
  data () {
    return {
      inputMessageBox: '',
      messages: this.msg
    }
  },
  methods: {
    sendMessage () {
      if (!this.inputMessageBox) return
      const payload = { sender: 'admin', message: this.inputMessageBox }
      this.messages.push(payload)
      this.inputMessageBox = ''
      this.$nextTick(() => {
        this.$refs.conversation.scrollTop = this.$refs.conversation.scrollHeight
      })
      this.$emit('sendMessage', payload)
    }
  }
}
</script>
<style scoped>
.chat-header {
  float: left;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, .10);
  height: 60px;
  line-height: 60px;
}
.chat-body {
  float: left;
  width: 100%;
  height: calc(100vh - 60px - 60px);
  overflow: scroll;
}
.chat-type-box {
  float: left;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, .10);
  height: 60px;
  line-height: 60px;
}
.type-box {
  float: left;
  width: 100%;
  height: 100%;
  border: 0;
  padding-left: 20px;
  font-size: 16px;
  outline: none;
}
.message-left {
  float: left;
  width: 100%;
  text-align: left;
  margin: 10px 0;
}
.message-left img {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin: 0 10px;
}
.message-left span {
  float: left;
  line-height: 60px;
}
.message-right {
  float: right;
  width: 100%;
  text-align: right;
  margin: 10px 0;
}
.message-right img {
  float: right;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin: 0 10px;
}
.message-right span {
  float: right;
  line-height: 60px;
}
</style>
