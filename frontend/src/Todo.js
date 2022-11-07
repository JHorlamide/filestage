import React, { useState, useRef, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import makeStyles from "@mui/styles/makeStyles";
import { Container, Typography, Paper, Box } from "@mui/material";
import CreateTodoForm from "./components/CreateTodoForm";
import TodoList from "./components/TodoList";
import useTodoHandler from "./hooks/useTodoHandler";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import FilterTodo from "./components/FilterTodo";

const useStyles = makeStyles({
  todosContainer: { marginTop: 10, padding: 10 },
});

const Todo = () => {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(0);
  const intObserver = useRef();
  const {
    error,
    loading,
    isError,
    filter,
    hasNextPage,
    filteredTodo,
    filterTodo,
    setTodos,
    deleteTodo,
    handleOnDragEnd,
    toggleTodoCompleted,
  } = useTodoHandler(pageNumber);

  const lastTodosRef = useCallback(
    (todo) => {
      if (loading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((todo) => {
        if (todo[0].isIntersecting && hasNextPage) {
          console.log("We are near the last the last todo");
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (todo) intObserver.current.observe(todo);
    },

    [hasNextPage, loading]
  );

  if (isError) {
    return <Typography variant="body1">{error.message}</Typography>;
  }

  const content = filteredTodo.map((todo, index) => (
    <TodoList
      key={index}
      index={index}
      todo={todo}
      ref={index + 1 === filteredTodo.length ? lastTodosRef : null}
      rowKey={(todo) => todo._id}
      deleteTodo={deleteTodo}
      toggleTodoCompleted={toggleTodoCompleted}
    />
  ));

  return (
    <Container maxWidth="md">
      <Toaster toastOptions={{ duration: "5000" }} />

      {/* Create Todo Component */}
      <CreateTodoForm setTodos={setTodos} />

      <Paper className={classes.todosContainer}>
        {/* Filter Todo Component */}
        <FilterTodo filter={filter} filterTodo={filterTodo} />

        {/* Todo List Wrapper */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="stretch"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {content}
                {filteredTodo.length === 0 && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      backgroundColor: "#d4edda",
                      padding: 3,
                      marginY: 3,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body1">
                      Congratulations your todo list is empty!
                    </Typography>
                  </Box>
                )}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

        {loading && <Typography variant="body1">Loading...</Typography>}
      </Paper>
    </Container>
  );
};

export default Todo;
