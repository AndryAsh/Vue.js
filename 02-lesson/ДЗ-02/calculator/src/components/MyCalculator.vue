<template>
  <div class="hello">
    <h1>{{ message }}</h1>

    <div class="display">
      <div class="display-item">
        <input v-model.number="operand1" type="number" />
        <input v-model.number="operand2" type="number" />
        <span> = {{ resultComputed }}</span>
      </div>
      <div class="display-item">
        fib(<input v-model.number="operand1" />) fib(<input
          v-model.number="operand2"
        />)
        <span> = {{ fibResultComputed }}</span>
      </div>
    </div>

    <div class="error" v-show="error">Ошибка! {{ error }}</div>

    <div class="strange-message" v-show="result">
      <template v-if="result < 0">Получилось отрицательное число</template>
      <template v-else-if="result < 100">Результат в первой сотне</template>
      <template v-else>Получилось слишком большое число!</template>
    </div>

    <div class="keyboard">
      <button
        v-for="operand in operands"
        :key="operand"
        :disabled="getBtnStatusDisabled(operand)"
        :name="operand"
        @click="calculate(operand)"
      >
        {{ operand }}
      </button>
    </div>

    <input type="checkbox" id="checkbox" v-model="checkedKeyboard" />
    <label for="checkbox">Отобразить экранную клавиатуру</label>

    <div class="keyboard" v-show="screenKeyboard">
      <button
        v-for="item in numberButtons"
        :key="item"
        @click="numberKeyDown(item)"
      >
        {{ item }}
      </button>
      <button @click="numberKeyDown('backspace')">&#10229;</button>

      <div class="operand-select" @click="operandSelect($event)">
        <span class="radio-selector">
          <input type="radio" id="operand1" name="radioSelect" />
          <label for="operand1">Операнд 1</label>
        </span>
        <span class="radio-selector">
          <input type="radio" id="operand2" name="radioSelect" />
          <label for="one">Операнд 2</label>
        </span>
      </div>
    </div>

    <div class="logs">
      <div v-for="(value, id) in log" :key="id">{{ id }} ----- {{ value }}</div>
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
      error: "",
      operands: ["+", "-", "*", "/", "^", "int"],
      log: {},
      fibResult: 0,
      checkedKeyboard: false,
      numberButtons: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      picOperand1: false,
      picOperand2: false,
    };
  },
  methods: {
    calculate(operation) {
      this.error = "";
      switch (operation) {
        case "+":
          this.summ();
          break;
        case "-":
          this.diff();
          break;
        case "*":
          this.multiply();
          break;
        case "/":
          this.divide();
          break;
        case "^":
          this.degree();
          break;
        case "int":
          this.intDivide();
          break;
      }
      const key = Date.now();
      const value = `${this.operand1} ${operation} ${this.operand2} = ${this.result}`;
      this.$set(this.log, key, value);
    },
    summ() {
      const { operand1, operand2 } = this;
      this.result = operand1 + operand2;
      this.fibResult = this.fibb1 + this.fibb2;
    },
    diff() {
      const { operand1, operand2 } = this;
      this.result = operand1 - operand2;
      this.fibResult = this.fibb1 - this.fibb2;
    },
    divide() {
      const { operand1, operand2 } = this;
      if (operand2 === 0) {
        this.error = "Делить на 0 нельзя!";
      } else {
        this.result = operand1 / operand2;
        this.fibResult = this.fibb1 / this.fibb2;
      }
    },
    multiply() {
      const { operand1, operand2 } = this;
      this.result = operand1 * operand2;
      this.fibResult = this.fibb1 * this.fibb2;
    },
    degree() {
      const { operand1, operand2 } = this;
      this.result = Math.pow(operand1, operand2);
      this.fibResult = Math.pow(this.fibb1, this.fibb2);
    },
    intDivide() {
      const { operand1, operand2 } = this;
      if (operand2 === 0) {
        this.error = "Делить на 0 нельзя!";
      } else {
        this.result = Math.floor(operand1 / operand2);
        this.fibResult = Math.floor(this.fibb1 / this.fibb2);
      }
    },
    getBtnStatusDisabled(op) {
      if ((op === "/" && !this.operand2) || (op === "int" && !this.operand2)) {
        return true;
      }
      return false;
    },
    fib(n) {
      return n <= 1 ? n : this.fib(n - 1) + this.fib(n - 2);
    },
    numberKeyDown(key) {
      if (key === "backspace") {
        if (this.radioOperand1 && !this.radioOperand2) {
          this.operand1 = Number(String(this.operand1).slice(0, -1));
        } else if (this.radioOperand2 && !this.radioOperand1) {
          this.operand2 = Number(String(this.operand2).slice(0, -1));
        }
      } else if (this.radioOperand1 && !this.radioOperand2) {
        this.operand1 = Number(String(this.operand1).concat(key));
      } else if (this.radioOperand2 && !this.radioOperand1) {
        this.operand2 = Number(String(this.operand2).concat(key));
      }
    },
    operandSelect(event) {
      if (event.target.id === "operand1") {
        this.picOperand1 = true;
        this.picOperand2 = false;
      } else if (event.target.id === "operand2") {
        this.picOperand2 = true;
        this.picOperand1 = false;
      }
    },
  },
  computed: {
    fibb1() {
      return this.fib(this.operand1);
    },
    fibb2() {
      return this.fib(this.operand2);
    },
    resultComputed() {
      return this.result;
    },
    fibResultComputed() {
      return this.fibResult;
    },
    screenKeyboard() {
      return this.checkedKeyboard;
    },
    radioOperand1() {
      return this.picOperand1;
    },
    radioOperand2() {
      return this.picOperand2;
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
.display-item,
.operand-select {
  margin: 0.5rem auto;
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
.error {
  margin: 0.5rem auto;
  color: red;
  font-weight: bold;
}
.strange-message {
  margin: 0.5rem auto;
  color: green;
  font-weight: bold;
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
button:not(:first-child),
.radio-selector:not(:first-child) {
  margin-left: 0.5rem;
}
a {
  color: #42b983;
}
.logs {
  margin: 0.5rem auto;
  width: 28%;
  text-align: left;
}
.log {
  display: block;
  text-align: left;
}
</style>
