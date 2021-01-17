import React from "react";
import Form from "./Form";
import TodoList from "./TodoList";

export default function CheckList({ boardId, indexCard, indexList }) {
  return (
    <>
      <TodoList indexCard={indexCard} boardId={boardId} indexList={indexList} />
      <Form indexCard={indexCard} boardId={boardId} indexList={indexList} />
    </>
  );
}
