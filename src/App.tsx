import { ButtonHTMLAttributes, InputHTMLAttributes, useCallback, useState, ChangeEvent, useEffect } from "react";

interface TaskResponse {
  id: number;
  taskName: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputValue?: string;
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textBtn: string;
}

const tasks: TaskResponse[] = [
  {id: 1, taskName: 'Eat'},
  {id: 2, taskName: 'Sleep'},
  {id: 3, taskName: 'Code'},
  {id: 4, taskName: 'Repeat'},
];

const Input = ({placeholder = 'Введите задание', inputValue = 'Станд значение'}: InputProps) => {
  const [value, setInputValue] = useState<string>(inputValue);

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, [])

  return (
    <input placeholder={placeholder} value={value} onChange={handleInput}/>
  )
};

const Button = ({textBtn, onClick}: ButtonProps) => {
  return (
    <button onClick={onClick}>{textBtn}</button>
  )
};

const TasksApi = {
  getTasks: (): Promise<TaskResponse[]> => 
    new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks);
    }, 1000);
  }),
};

function App() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  useEffect(() => {
    TasksApi.getTasks().then(setTasks)
  }, [])

  const handleDelete = (id: number) => () => {
    setTasks((currentTask) => currentTask.filter(task => task.id !== id))
  }

  return (
    <>
      <h1>Todo App</h1>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <Input inputValue={task.taskName} />
            <Button textBtn="Удалить" onClick={handleDelete(task.id)}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default App