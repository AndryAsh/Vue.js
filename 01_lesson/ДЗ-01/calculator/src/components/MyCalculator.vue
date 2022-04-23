<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <div class="display">
      <input v-model.number="operand1" type="number" />
      <input v-model.number="operand2" type="number" />
      <span> = {{ result }}</span>
    </div>
    <div class="keyboard">
      <button v-on:click="result = operand1 + operand2">+</button>
      <button @click="result = operand1 - operand2">-</button>
      <button @click="multiply">x</button>
      <button @click="divide(operand1, operand2)" :disabled="!operand2">
        /
      </button>
      <button @click="degree">^</button>
      <button @click="intDivide" :disabled="!operand2">int</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCalculator",
  props: {},
  data() {
    return {
      message: "Calculator for Vue.js",
      operand1: 0,
      operand2: 0,
      result: 0,
    };
  },
  methods: {
    divide(op1, op2) {
      this.result = op1 / op2;
    },
    multiply() {
      const { operand1, operand2 } = this;
      this.result = operand1 * operand2;
    },
    degree() {
      const { operand1, operand2 } = this;
      this.result = Math.pow(operand1, operand2);
    },
    intDivide() {
      const { operand1, operand2 } = this;
      this.result = Math.floor(operand1 / operand2);
    },
  },
};
</script>

<style scoped>
h1::after {
  display: block;
  margin: 1em auto;
  content: "";
  width: 50%;
  height: 2px;
  background-color: #a8a8a8;
}
input {
  text-align: center;
  font-weight: bold;
}
span {
  font-weight: bold;
}
.keyboard {
  margin: 0.5rem;
}
button {
  width: 1.5rem;
  height: 1.5rem;
  font-weight: bold;
  /* text-align: center; */
  padding: 0;
  border: 1px solid #000;
  border-radius: 0.3rem;
}
button:not(:first-child) {
  margin-left: 0.5rem;
}
a {
  color: #42b983;
}
</style>
