const app = Vue.createApp({
  data() {
    return {
      newTask: '',
      tasks: [],
      selectedFilter: 'all',
      filteredTasks: []
    };
  },
  mounted() {
    this.tasks = this.loadFromLocalStorage()
    this.filteredTasks = this.tasks
  },
  methods: {
    loadFromLocalStorage() {
      try {
        return JSON.parse(localStorage.getItem('tasks')) || [];

      }
      catch (err) {
        console.log("Failed to load from localStorage")
      }
    },
    saveToLocalStorage() {
      try {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));

      }
      catch (err) {
        console.log("Failed to save to localStorage")
      }
    },

    addTask() {
      try {
        if (this.newTask.trim() !== '') {
          this.tasks.push({ text: this.newTask, completed: false, isEditing: false });
          this.newTask = '';
          this.saveToLocalStorage()
        }

      }
      catch (err) {
        console.log("Failed to add task")
      }

    },
    removeTask(index) {
      try {
        this.tasks.splice(index, 1);
        this.saveToLocalStorage()

      }
      catch (err) {
        console.log("Failed to remove task")
      }



    },
    toggleComplete(index, completed) {
      try {
        this.tasks[index].completed = completed
        this.saveToLocalStorage()

      }
      catch (err) {
        console.log("Failed to toggle checkbox")
      }
    },
    toggleFilter(filterValue) {

      try {
        if (filterValue === "completed") {
          this.filteredTasks = this.tasks.filter((item) => item.completed)
        }
        else if (filterValue === "uncompleted") {
          this.filteredTasks = this.tasks.filter((item) => !item.completed) 
        }
        else {
          this.filteredTasks = this.tasks

        }
      }
      catch (err) {
        console.log("Failed to toggle filter")
      }

    }
    ,
    editTask(task) {
      try {
        task.isEditing = true;

      }
      catch (err) {
        console.log("Failed to edit task")
      }
    },
    saveTask(task, index) {
      try {
        task.isEditing = false;
        let newTask = { text: task.text, completed: task.completed, isEditing: task.isEditing }
        this.tasks[index] = newTask
        this.saveToLocalStorage()
      }
      catch (err) {
        console.log("Failed to save task")
      }
    }

  }
  ,
})
