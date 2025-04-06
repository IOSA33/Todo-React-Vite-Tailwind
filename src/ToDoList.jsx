import { useState, useEffect} from 'react';


function TodoList() {

    const [tasks, setTasks] = useState(() => {
        const savedTodos = localStorage.getItem('Todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem('Todos', JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    } 

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { text: newTask, done: false }]);
            setNewTask("");
        }
    }
    
    function deleteTask(index) {
        const updatedList = tasks.filter((_, i) => i !== index);
        setTasks(updatedList);
    }

    function moveTaskUp(index) {
        if(index > 0) {
            const updatedList = [...tasks];
            [updatedList[index], updatedList[index - 1]] = [updatedList[index - 1], updatedList[index]];
            setTasks(updatedList);
        }
    }

    function moveTaskDown(index) {
        if(index < tasks.length - 1) {
            const updatedList = [...tasks];
            [updatedList[index], updatedList[index + 1]] = [updatedList[index + 1], updatedList[index]];
            setTasks(updatedList);
        }
    }

    function done(index) {
      const updatedList = [...tasks];
      updatedList[index].done = !updatedList[index].done;
      setTasks(updatedList);
    }




    return (
        <div  className="mx-auto content-center">
            <div className="mx-auto max-w-6xl p-1">
              <h1 className="mx-auto m-3 mt-6 mb-6 text-2xl">To Do List</h1>

              <div className="mx-auto p-3 bg-gray-50 rounded-lg shadow-lg">

                <div className="flex space-x-4 mb-4 flex-wrap">
                    <input
                        className="max-w-xl mb-1 w-full h-10 border-2 border-solid border-gray-300 rounded-lg p-2"
                        type="text"
                        placeholder="Enter a Todo"
                        value={newTask}
                        onChange={handleInputChange} 
                      />

                    <button
                      className="px-10 h-10 mb-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      onClick={addTask} > Add  </button>
                  </div>

            
                <ul className="space-y-2">
                  {tasks.map((task, index) => (
                    <li key={index} className="justify-between bg-white p-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">

                      <div onClick={() => done(index)}>
                        <button 
                          className="text-green-500 hover:text-green-600 transition duration-200"> 
                          {task.done ? '✅' : '❌'} </button>
                        <span className=" cursor-pointer text-lg font-semibold text-gray-700 break-all"> {task.text} </span>
                      </div>

                      <div className="flex justify-between space-x-2">
                        <button
                          className="text-green-500 hover:text-green-600 transition duration-200"
                          onClick={() => moveTaskUp(index)}> ☝️ 
                        </button>

                        <button
                          className="text-yellow-500 hover:text-yellow-600 transition duration-200"
                          onClick={() => moveTaskDown(index)}> 👇 
                        </button>

                        <button
                          className="ml-auto text-red-500 hover:text-red-600 transition duration-200"
                          onClick={() => deleteTask(index)} > 🔥 
                        </button>
                      </div>

                    </li> ))}
                </ul>
              </div>
            </div>
        </div>
      );
      
      
      

}

export default TodoList; 