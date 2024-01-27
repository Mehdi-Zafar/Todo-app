<script setup>
import { ref } from "vue";
import { MdDelete } from "oh-vue-icons/icons";
import { OhVueIcon } from "oh-vue-icons";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { useRouter } from "vue-router";

const router = useRouter();

const inputs = ref([
  { label: "Title", type: "text", name: "title" },
  { label: "Point 1", type: "text", name: "point1" },
]);

const func = (e) => {
  inputs.value = inputs.value.map((input) => {
    if (e.target.name === input.name) {
      return {
        label: input.label,
        type: "text",
        name: input.name,
        value: e.target.value,
      };
    } else {
      return input;
    }
  });
};

const addPoint = (e) => {
  e.preventDefault();
  inputs.value.push({
    label: `Point ${inputs.value.length}`,
    type: "text",
    name: `point${inputs.value.length}`,
  });
};

const deletePoint = (e, input) => {
  e.preventDefault();
  inputs.value = inputs.value.filter((i) => i !== input);
};

const handleForm = (e) => {
  e.preventDefault();
  const newTodo = {
    id: Math.random(),
    title: inputs.value[0].value,
    body: inputs.value.slice(1).map((input) => {
      return input.value;
    }),
    completed: false,
  };
  axios
    .post("/todos", newTodo)
    .then((res) => console.log(res.data))
    .catch((error) => {
      console.error("Error creating post:", error);
    });
  const $toast = useToast();
  let instance = $toast.success("Todo Created!");
  setTimeout(() => {
    router.push("/");
  }, 1500);
};
</script>

<template>
  <h2>Create Todo</h2>
  <div class="input-container">
    <div v-for="input in inputs" class="input">
      <label>{{ input.label }}</label>
      <!-- <input v-if="input !== inputs[inputs.length - 1]" :type="input.type" /> -->
      <div class="last-point">
        <input :type="input.type" :name="input.name" @change="func" />
        <button
          v-if="input === inputs[inputs.length - 1] && input !== inputs[1]"
          class="delete-btn"
          @click="(e) => deletePoint(e, input)"
        >
          <v-icon name="md-delete" />
        </button>
        <button
          v-if="input === inputs[inputs.length - 1]"
          class="add-btn"
          @click="addPoint"
        >
          +
        </button>
      </div>
    </div>
    <button class="submit-btn" @click="handleForm">Create</button>
  </div>
</template>

<style scoped>
.input-container {
  width: 350px;
  margin: 20px auto;
}

h2 {
  text-align: center;
}

.input {
  margin: 10px 0;
}

label {
  display: block;
  font-weight: 600;
  font-size: 1.1rem;
}

input {
  width: 100%;
  border: none;
  outline: none;
  margin: 5px auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
}

.delete-btn {
  background-color: #30415b;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  width: 30px;
  height: 27px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn {
  background-color: #30415b;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  width: 30px;
  height: 27px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn {
  width: 100%;
  background-color: #30415b;
  color: #fff;
  border: none;
  padding: 10px 5px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px auto;
}

.last-point {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 575px) {
  .input-container {
    width: 90%;
  }
}
</style>
