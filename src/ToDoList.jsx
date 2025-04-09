import { useState, useEffect} from 'react';
import React from 'react';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor , useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';


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
            setTasks([...tasks, { id: crypto.randomUUID(), text: newTask, done: false }]);
            setNewTask("");
        }
    }
    
    function deleteTask(id) {
        const updatedList = tasks.filter(task => task.id !== id);
        setTasks(updatedList);
    }

    function done(id) {
      const updatedList = tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      setTasks(updatedList);
    }

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    function handleDragEnd(event) {
      const { active, over } = event;

      if (active.id !== over.id) {
          setTasks((tasks) => {
              const oldIndex = tasks.findIndex(task => task.id === active.id);
              const newIndex = tasks.findIndex(task => task.id === over.id);
              return arrayMove(tasks, oldIndex, newIndex);
          });
      }
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

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>

                  <ul className="space-y-2">
                    {tasks.map((task) => (
                      <SortableItem  key={task.id} id={task.id}>

                        <li className="mb-2 justify-between bg-white p-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                            <div className="flex items-center h-3">
                              <input 
                                type='checkbox' 
                                onChange={() => done(task.id)}
                                checked={task.done}
                                className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-green-500 checked:border-green-500
                                        relative cursor-pointer transition-colors"
                              />
                              <span className="ml-2 cursor-pointer text-lg font-semibold text-gray-700 break-all">
                                {task.text}
                              </span>
                            </div>

                            <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteTask(task.id);
                                }} className="mt-3 ml-auto text-red-500 hover:text-red-600 transition duration-200" >
                                🔥
                            </button>


                        </li>

                      </SortableItem> 
                    ))}
                  </ul>

                </SortableContext>
              </DndContext>

              </div>
            </div>
        </div>
      );
      
    
      

}

export default TodoList; 