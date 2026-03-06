import Items from "./components/Items";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { nanoid } from "nanoid";
import Form from "./components/Form";

const getLocalStorage = () => {
    let list = localStorage.getItem("grocery-list");
    if (list) {
        return JSON.parse(list);
    }
    return [];
};

const setLocalStorage = (items) => {
    localStorage.setItem("grocery-list", JSON.stringify(items));
};

const initialList = getLocalStorage();

const App = () => {
    const [items, setItems] = useState(initialList);
    const [editId, setEditId] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (editId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editId]);

    const addItem = (itemName) => {
        const newItem = {
            name: itemName,
            completed: false,
            id: nanoid(),
        };
        const newItems = [...items, newItem];
        setItems(newItems);
        setLocalStorage(newItems);
        toast.success("item added to the list");
    };

    const editCompleted = (itemId) => {
        const newItems = items.map((item) => {
            if (item.id === itemId) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        setItems(newItems);
        setLocalStorage(newItems);
    };

    const removeItem = (itemId) => {
        const newItems = items.filter((item) => item.id !== itemId);
        setItems(newItems);
        setLocalStorage(newItems);
        toast.success("item deleted");
    };

    const updateItemName = (newName) => {
        const newItems = items.map((item) => {
            if (item.id === editId) {
                return { ...item, name: newName };
            }
            return item;
        });
        setItems(newItems);
        setEditId(null);
        setLocalStorage(newItems);
        toast.success("item updated");
    };

    return (
        <section className="section-center">
            <ToastContainer position="top-center" />
            <Form
                addItem={addItem}
                updateItemName={updateItemName}
                editItemId={editId}
                itemToEdit={items.find((item) => item.id === editId)}
                inputRef={inputRef}
            />
            <Items
                items={items}
                editCompleted={editCompleted}
                removeItem={removeItem}
                setEditId={setEditId}
            />
        </section>
    );
};

export default App;
