import  React,{ useEffect, useState} from 'react';

// import logo from './logo.svg';
import './App.css';



const ToDo = () => {
  const [catchVal, setCatchval] = useState('')
  const [tasklist, setTaskList] =useState(()=>{
    const todoItem = localStorage.getItem("Todos")
    return todoItem ? JSON.parse(todoItem) :[]
  })
  const[isEdit,setIsEdit]=useState(false)
  const [editTaskindex, setEditTaskIndex]= useState(null)
  const [filter,setFilter] =useState('all')

  useEffect(()=> {
    localStorage.setItem('Todos',JSON.stringify(tasklist))
  },[tasklist])

  const addTodos = (e) =>{
    e.preventDefault()
      
    const newTask ={
      id: Date.now() +"" ,
      task: catchVal
    }

    setTaskList([newTask, ...tasklist])

    setCatchval("")

    if(catchVal.trim() === ""){
      alert("Add a task")
      return
    }

    if(isEdit){
      const updatedList = tasklist.map((item,i) =>{
         return i === editTaskindex ? { ...item, task:catchVal} :item
      })

      setTaskList(updatedList)
      setIsEdit(false)
    }
    else{
      const newTask ={
      id: Date.now() + '',
      task: catchVal,
      status: 'pending'
    }

    }

    

    setTaskList([newTask,...tasklist]) 

    setCatchval('')
  }
  const deleteTask = (item)=>{
    const confirmDelete =window.confirm('Are you sure you want to delete this ${item.task} permanently') 
    if(confirmDelete){
      const updatedlist =FileList.filter((task) =>task.id !== item.id)
      setTaskList(updatedlist)
    }
  }

  const editTask =(index) =>{
      setIsEdit(true);
      setCatchval(tasklist[index].task);
      setEditTaskIndex(index);

  }
  const toggleStatus =(id) => {
      const updatedList = tasklist.map((item) =>
        item.id === id ?{...item,status: item.status === 'pending' ? "complete" :'pending'} : item)
        setTaskList(updatedList)
  }
  const filteredList = tasklist.filter((item)=>{
    if(filter=== 'complete') return item.status === 'complete'
    if(filter=== 'pending') return item.status === 'pending'
    return true
  })

  return(
    <div className='container'>
      <form onSubmit={addTodos}>
        <input type='text'
        value={catchVal}
        onChange={(e)=>{
           setCatchval(e.target.value)
           }} ></input>
        <button type='submit'> {isEdit ? 'update Tasks' :'Add task'}</button>
      </form>

      <div className='compen'> 
          <button onclick={()=>setFilter("all")}>All Task</button>
          <button onclick={()=>setFilter("pending")}>Pending</button>
          <button onclick={()=>setFilter("complete")}>Completed</button>
      </div>

      <div className='todocontainer'>

           {filteredList.lenght > 0? (
            filteredList.map((item,index) =>(
              <div className='tasks' key={item.id}>
            <div>
              <input  
              type='checkbox' 
              checked = {item.status === 'completed'}
              onChange={()=> toggleStatus(item.id)} ></input>
            </div>
            <div className='todo'>
              <span style={{textdecoration: item.status === "complete" ? 'line-trough': 'none'}}> {item.span}</span>
              <div className='btn'>
                <button className='edit' onClick={ (e)=>editTask (index)}>Edit</button>
                <button className='delete' onclick ={(e)=>deleteTask(item.id)}>Delete</button>
              </div>
            </div>
          </div>
            ))
           ) : (<p>
                 {filter==='complete' && "there is no complete tasks"}
                 {filter==='pending' && "there is no pending tasks"}
                 {filter==='all' && "No task available here"}
           </p>)}
          
      </div>

      <div className='counter'>
        {filter === 'all' && <span>All Task = {filteredList.lenght} </span>}
        {filter === 'complete' && <span>Complete task= {filteredList.lenght} </span>}
        {filter === 'pending' && <span>pending Task = {filteredList.lenght} </span>}
      </div>
    </div>

    
  )
}

export default ToDo;
