import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { useEffect, useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
	{ id: 1, text: "Aprender React" },
	{ id: 2, text: "Hacer ejercicio" },
	{ id: 3, text: "Hacer comida" },
	{ id: 4, text: "Hacer Tarea" },
	{ id: 5, text: "Meditar" },
];

const App = () => {
	const [todos, setTodos] = useState(initialTodos);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);
	const handleDragEnd = (result) => {
		if (!result.destination) return;

		const origenIndex = result.source.index;
		const destinoIndex = result.destination.index;

		const copyTodos = [...todos];

		const [reorderedItem] = copyTodos.splice(origenIndex, 1);
		console.log(reorderedItem);
		copyTodos.splice(destinoIndex, 0, reorderedItem);

		setTodos(copyTodos);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<h1>Todos?</h1>
			<Droppable droppableId='todos'>
				{(droppableProvider) => (
					<ul
						ref={droppableProvider.innerRef}
						{...droppableProvider.droppableProps}
					>
						{todos.map((todo, index) => (
							<Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
								{(draggableProvider) => (
									<li
										ref={draggableProvider.innerRef}
										{...draggableProvider.draggableProps}
										{...draggableProvider.dragHandleProps}
									>
										{todo.text}
									</li>
								)}
							</Draggable>
						))}
						{droppableProvider.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default App;
