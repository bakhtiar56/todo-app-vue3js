const app = Vue.createApp({
    data() {
        return {
          newTask: '',
          tasks: [],
          selectedFilter:'all',
          filteredTasks:[]
        };
      },
      mounted() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    },
     methods: {
        addTask() {
          if (this.newTask.trim() !== '') {
            this.tasks.push({ text: this.newTask, completed: false, isEditing: false });
            this.newTask = '';
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
          }
        },
        removeTask(index) {
          this.tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        toggleComplete(index,completed){
         this.tasks[index].completed=completed
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
    
    
    
        },
        toggleFilter(filterValue){
          console.log(filterValue)
          if(filterValue==="completed"){
            this.filteredTasks=this.tasks.filter((item)=>item.completed)
          }
          else if(filterValue==="uncompleted"){
            this.filteredTasks=this.tasks.filter((item)=>!item.completed)
    
    
          }
        }
        ,
        editTask(task) {
          task.isEditing = true;
        },
        saveTask(task, index) {
          task.isEditing = false;
          let newTask={text: task.text, completed: task.completed, isEditing: task.isEditing }
          this.tasks[index]=newTask
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
      }
    ,
})
    