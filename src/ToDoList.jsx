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
        <div className="m-3 p-6 bg-gray-50 rounded-lg shadow-lg">
           
            <div className="flex space-x-4 mb-4 flex-wrap">
              <input
                  className="flex w-full md:w-auto border-2 border-solid border-gray-300 rounded-lg p-2  focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter a Todo"
                  value={newTask}
                  onChange={handleInputChange} 
                />

              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-100 md:w-auto mt-4 md:mt-0"
                onClick={addTask} > Add  </button>
            </div>

      
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li key={index} className="flex justify-between bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">

                <div onClick={() => done(index)}>
                  <button 
                    className="text-green-500 hover:text-green-600 transition duration-200"> 
                    {task.done ? '✅' : '❌'} </button>
                  <span className=" cursor-pointer text-lg font-semibold text-gray-700 break-all"> {task.text} </span>
                </div>


                <div className="space-x-2">
                  <button
                    className="text-red-500 hover:text-red-600 transition duration-200"
                    onClick={() => deleteTask(index)} > 🔥 
                  </button>

                  <button
                    className="text-green-500 hover:text-green-600 transition duration-200"
                    onClick={() => moveTaskUp(index)}> ☝️ 
                  </button>

                  <button
                    className="text-yellow-500 hover:text-yellow-600 transition duration-200"
                    onClick={() => moveTaskDown(index)}> 👇 
                  </button>
                </div>
                
              </li>
            ))}
          </ul>
        </div>
      );
      
      
      

}

export default TodoList; 