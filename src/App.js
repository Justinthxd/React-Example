import { useEffect, useState } from 'react';
import './App.css';

import { ref, set, onValue } from "firebase/database";
import { db } from './data/firebase';
import AppBar from './components/AppBar';
import Order from './components/Order';


function App() {
  const writeUserData = (title, items, note) => {
    let r = (Math.random() + 1).toString(36).substring(7);
    set(ref(db, 'orders/' + r), {
      title: title,
      items: items,
      note: note,
      status: 'Pending',
    });
  }


  // const [tasks, setTasks] = useState([]);

  // const [snapshot, setSnapshot] = useState({});

  // useEffect(() => {
  //   const data = localStorage.getItem('data');
  //   if (data) {
  //     setTasks(JSON.parse(data));
  //   }
  // }, []);

  // useEffect(
  //   () => {
  //     localStorage.setItem('data', JSON.stringify(tasks));
  //   }, [tasks]
  // );

  // useEffect(() => {
  //   const starCountRef = ref(db, 'users/');
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data);
  //     setSnapshot(data);
  //   });
  // }, []);

  // const createTask = (value) => {
  //   if (!tasks.find(task => task.name === value)) {
  //     setTasks([...tasks, { name: value, done: false }]);
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.items.value);
    const { title, items, note } = e.target;
    writeUserData(title.value, items.value, note.value);
    title.value = '';
    items.value = '';
    note.value = '';
  }

  const [orders, setOrders] = useState([]);

  const [keys, setKeys] = useState([]);


  useEffect(() => {
    const query = ref(db, "orders/");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      setOrders([]);
      setKeys([]);
      if (snapshot.exists()) {
        Object.values(data).map((order) => {
          setOrders((orders) => [...orders, order]);
        });
        Object.keys(data).map((key) => {
          setKeys((keys) => [...keys, key]);
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <AppBar />
      <div className="container col-6 p-5">
        <form onSubmit={handleSubmit} className='row gy-3'>
          <input name='title' placeholder='Title' type="text" className='form-control' />
          <input name='items' placeholder='Items' type="text" className='form-control' />
          <textarea name='note' placeholder='Note' className='form-control' rows="3"></textarea>
          <button className="btn btn-secondary">Send</button>
        </form>
        <hr />
        {
          orders.map((order, key) => (
            <Order key={key} order={order} id={keys[key]} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
