import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");
  const [highlight, sethighlight] = useState({
    btnSelect: "all",
    active: false,
  });

  const registerClick = (event) => {
    //console.log(event.target.value);
    const initial = highlight.active.value;
    sethighlight({
      btnSelect: event.target.value,
      active: !initial,
    });
  };

  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          className={highlight.btnSelect === "active" ? "active" : " "}
          value="active"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(event) => {
            setSort("active");
            registerClick(event);
          }}
        >
          Active
        </motion.button>
        <motion.button
          className={highlight.btnSelect === "complete" ? "active" : " "}
          value="complete"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(event) => {
            setSort("completed");
            registerClick(event);
          }}
        >
          Completed
        </motion.button>
        <motion.button
          className={highlight.btnSelect === "all" ? "active" : " "}
          value="all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(event) => {
            setSort("all");
            registerClick(event);
          }}
        >
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {/* Show active items */}
          {props.todos.length > 0 && sort === "active"
            ? props.todos.map((item) => {
                return (
                  item.completed === false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}

          {/* Show completed items */}
          {props.todos.length > 0 && sort === "completed"
            ? props.todos.map((item) => {
                return (
                  item.completed === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}

          {/* Show all items */}
          {props.todos.length > 0 && sort === "all"
            ? props.todos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    completeTodo={props.completeTodo}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
