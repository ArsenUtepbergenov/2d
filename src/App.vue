<template>
  <main class="main">
    <router-view />
  </main>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  max-height: 100vh;
  margin: 0;
}

button {
  border: 0;
  background: #8bc34a;
  padding: 6px 22px;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #79af3c;
}

html,
body,
main {
  overflow: hidden;
}

canvas:focus {
  outline: 0;
}
</style>
