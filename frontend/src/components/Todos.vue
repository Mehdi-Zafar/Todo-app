<script setup>
import axios from "axios";
import { ref, watch, onMounted } from "vue";

const todos = ref([]);

const getTodos = () => {
  axios.get("/todos").then((res) => {
    todos.value = res.data;
  });
};

onMounted(() => {
  getTodos();
});

const deletePoint = (todo) => {
  axios
    .delete(`/todos/${todo.id}`)
    .then((res) => {
      getTodos();
    })
    .catch((error) => {
      console.error("Error deleting resource:", error);
    });
};
</script>

<template>
  <div class="todos">
    <div v-for="todo in todos" class="todo-box">
      <h3 class="title">{{ todo.title }}</h3>
      <ul>
        <li v-for="body in todo.body" class="desc">{{ body }}</li>
      </ul>
      <button class="delete-btn" @click="() => deletePoint(todo)">
        <v-icon name="io-close" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.todos {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  margin: 30px auto 20px;
}

div.todo-box {
  width: 280px;
  padding: 1px 15px 5px;
  border-radius: 15px;
  min-height: 200px;
  position: relative;
}

div.todo-box:nth-of-type(4n + 1) {
  background-color: #eefc9e;
}

div.todo-box:nth-of-type(4n + 2) {
  background-color: #e6e6fa;
}

div.todo-box:nth-of-type(4n + 3) {
  background-color: #d0f0c0;
}

div.todo-box:nth-of-type(4n) {
  background-color: #ffc0a5;
}

.title {
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
}

.desc {
  font-size: 1rem;
  font-weight: 500;
}

ul {
  padding-left: 20px;
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 5px;
  background-color: transparent;
  border: none;
  color: #30415b;
  cursor: pointer;
}
</style>
