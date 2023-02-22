import { useEffect, useState } from "react"
import AddNew from "../components/AddNew"
import { MdDelete } from "react-icons/md";

export default function Home() {

  const [todoList, setTodoList] = useState([]);

  const addNew = (todo) => {
    todo !== "" && setTodoList(prev => [...prev, { id: Date.now(), todo }]);
  }

  useEffect(() => {
    const list = document.getElementById("ul");
    list.style.display = todoList.length !== 0 ? "block" : "none";
    list.addEventListener("click", handleClick);
    return () => { list.removeEventListener("click", handleClick) };
  }, [todoList])

  const handleClick = (e) => {
    e.target.tagName === "INPUT" ? (e.target.parentNode.classList.toggle("clicked")): "hello";
  }

  const removeItem = id => {
    setTodoList(todoList.filter(item=>{return item.id !== id}));
  }

  return (
    <>
      <AddNew
        addNew={addNew}
      />
      <ul id="ul">
        {todoList.map((item) => <li className="list" key={item.id}><label><input type="checkbox"></input><span></span> {item.todo} </label><MdDelete onClick={()=>removeItem(item.id)} className="deleteIcon" /></li>)}
      </ul>
    </>
  )
}