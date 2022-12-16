<template>
  <div class="main-page">
    <div class="todo-panel">
      <header class="heading">
        <div class="img-wrapper">
          <img src="./img/note.svg" alt="Note" />
        </div>
        <div class="title">To-Do List</div>
      </header>

      <div class="form-field">
        <h1 class="title">~ Today I need to ~</h1>
        <form class="form-wrapper">
          <div class="form-input">
            <input placeholder="Add new todo..." v-model="user_input" />
          </div>
          <button type="submit" class="submit-btn" @click="onSubmit"><span>Submit</span></button>
        </form>
      </div>

      <ul class="todos">
        <li
          v-for="(item, index) in list"
          :key="index"
          class="todos-item"
          :class="item.type === 'Completed' ? 'completed' : ''"
        >
          <button v-if="item.type === 'Completed'" class="check-btn" @click="onChange(index)">
            <svg
              class="svg-inline--fa fa-check fa-w-16 check"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="check"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                class=""
                fill="currentColor"
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
              />
            </svg>
          </button>
          <button v-else class="checkbox-btn" @click="onChange(index)"><div class="checkbox" /></button>
          <p class="content">{{ item.message }}</p>
          <button class="close-btn" @click="onClose(index)">
            <svg
              class="svg-inline--fa fa-times fa-w-11 close"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="times"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
            >
              <path
                class=""
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              />
            </svg>
          </button>
        </li>
      </ul>

      <footer class="options">
        <span>{{ list.length }} item left</span>
        <div class="filters">
          <span class="option active">All</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

// type: Completed Active
const user_input = ref("")
const list = ref([
  { message: "m", type: "Active" },
  { message: "m2", type: "Completed" }
])

const onSubmit = () => {
  console.log("onSubmit")
  const obj = {
    message: user_input.value.trim(),
    type: ""
  }
  list.value.push(obj)
  setTimeout(() => {
    user_input.value = ""
  }, 300)
}
const onClose = (index: number) => {
  list.value.splice(index, 1)
}
const onChange = (index: number) => {
  const obj_type = list.value[index].type
  list.value[index].type = obj_type === "Completed" ? "Active" : "Completed"
}
</script>

<style scoped>
.main-page {
  background-image: linear-gradient(90deg, #ffafbd, #ffc3a0);
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 50px 0;
}
.todo-panel {
  /* margin: 10px; */
  padding: 30px 40px 20px;
  text-align: center;
  width: 440px;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
}
.heading {
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-wrapper {
  width: 80px;
  margin-right: 10px;
}
.heading .title {
  transform: rotate(3deg);
  font-size: 21px;
  padding: 0.25em 0.8em 0.15em;
  border-radius: 20% 5% 20% 5%/5% 20% 25% 20%;
  color: #fff;
  background: #fe7345;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: Yanone Kaffeesatz, sans-serif;
}
.form-field {
  margin-top: 25px;
}
.form-field .title {
  font-size: 22px;
  margin-bottom: 18px;
  font-family: Yanone Kaffeesatz, sans-serif;
}
.form-wrapper {
  display: flex;
  justify-content: center;
}
.form-input {
  display: inline-block;
  flex-grow: 0.65;
  margin-right: 15px;
}

.form-input input {
  outline: none;
  border: none;

  width: 100%;
  border-bottom: 3px dashed #fe7345;
  padding: 5px 0 3px;
  font-size: 18px;
  background: transparent;
}
.submit-btn {
  position: relative;
  transform: rotate(4deg);
  border-radius: 6px;
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: transparent;
  cursor: pointer;
}
.todos {
  margin-top: 40px;
  perspective: 350px;
  padding: 0;
}
.todos-item {
  display: flex;
  align-items: center;
  padding: 8px 10px 8px 0;
  border-radius: 5px;
  cursor: pointer;
}
.todos-item .checkbox-btn {
  padding: 0 8px;
}
.todos-item .checkbox {
  padding: 5px;
  border-radius: 2px;
  border: 2px solid #494a4b;
}
.todos-item button {
  outline: none;
  border: none;

  background-color: transparent;
  cursor: pointer;
}
.todos-item .content {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 7px;
}
.todos-item .close-btn {
  margin: 0 -8px 0 auto;
  padding: 0 8px;
}
.todos-item .close-btn:hover .close {
  color: rgba(73, 74, 75, 0.7);
}

.todos-item .close {
  transition: color 0.2s ease-out;
}

svg:not(:root).svg-inline--fa {
  overflow: visible;
}

.svg-inline--fa.fa-w-11 {
  width: 0.6875em;
}

.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 100px;
  gap: 20px;
}
.options span {
  font-family: Yanone Kaffeesatz, sans-serif;
}
.options .filters {
  display: flex;
  align-items: center;
  gap: 6px;
}

.options .option.active,
.options .option:hover {
  color: #fff;
  background-color: #fe7345;
}
.options .option {
  padding: 0 0.6em;
  border-radius: 4px;
  transition: all 60ms ease-out;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.completed {
  background-color: #fe7345;
  -webkit-animation: flipInX-132cabf7 0.75s ease-in-out both;
  animation: flipInX-132cabf7 0.75s ease-in-out both;
}
</style>
