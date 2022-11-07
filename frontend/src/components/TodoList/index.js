import React from "react";
import { Typography, Button, Icon, Box, Checkbox } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import dateformat from "dateformat";
import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles({
  todoContainer: {
    borderTop: "1px solid #bfbfbf",
    marginTop: 5,
    "&:first-child": {
      margin: 2,
      borderTop: "none",
    },
    "&:hover": {
      "& $deleteTodo": {
        visibility: "visible",
      },
    },
  },
  todoTextCompleted: {
    textDecoration: "line-through",
  },

  deleteTodo: {
    visibility: "hidden",
  },
});

const TodoList = React.forwardRef(
  ({ todo, index, deleteTodo, toggleTodoCompleted }, ref) => {
    const classes = useStyles();

    return (
      <Box ref={ref ?? null} data-testid="todo-list">
        <Draggable key={todo._id} draggableId={todo._id} index={index}>
          {(provided) => (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              className={classes.todoContainer}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <Checkbox
                name="completed"
                checked={!!todo.completed}
                onChange={() => toggleTodoCompleted(todo._id)}
              ></Checkbox>

              <Box flexGrow={1}>
                <Typography
                  className={todo.completed ? classes.todoTextCompleted : ""}
                  variant="body1"
                >
                  {todo.text}
                </Typography>
              </Box>

              <Box sx={{ paddingX: 2, color: "gray" }}>
                <Typography
                  className={todo.completed ? classes.todoTextCompleted : ""}
                  variant="body1"
                  color="gray"
                >
                  {dateformat(new Date(todo.due_date), "dd-mmm-yyyy")}
                </Typography>
              </Box>

              <Button
                className={classes.deleteTodo}
                startIcon={<Icon>delete</Icon>}
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </Button>
            </Box>
          )}
        </Draggable>
      </Box>
    );
  }
);

TodoList.propTypes = {
  index: PropTypes.number.isRequired,
  todo: PropTypes.object.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
