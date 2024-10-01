import Add from "./components/Add";
import AddPathParameters from "./components/AddPathParameters";
import AddingAndRemovingToFromArrays from "./components/AddingAndRemovingToFromArrays";
import ArrayIndexAndLength from "./components/ArrayIndexAndLength";
import ArrowFunctions from "./components/ArrowFunctions";
import BooleanVariables from "./components/BooleanVariables";
import Classes from "./components/Classes";
import ConditionalOutputIfElse from "./components/ConditionalOutputIfElse";
import ConditionalOutputInline from "./components/ConditionalOutputInline";
import Destructing from "./components/Destructing";
import DestructingImports from "./components/DestructingImports";
import FilterFunction from "./components/FilterFunction";
import FindFunction from "./components/FindFunction";
import FindIndex from "./components/FindIndex";
import ForLoops from "./components/ForLoops";
import FunctionDestructing from "./components/FunctionDestructing";
import Highlight from "./components/Highlight";
import House from "./components/House";
import IfElse from "./components/IfElse";
import ImpliedReturn from "./components/ImpliedReturn";
import JsonStringify from "./components/JsonStringify";
import LegacyFunctions from "./components/LegacyFunctions";
import MapFunction from "./components/MapFunction";
import PathParameters from "./components/PathParameters";
import SimpleArrays from "./components/SimpleArrays";
import Spreading from "./components/Spreading";
import Square from "./components/Square";
import Styles from "./components/Styles";
import TemplateLiterals from "./components/TemplateLiterals";
import TernaryOperator from "./components/TernaryOperator";
import VariableTypes from "./components/VariableTypes";
import VariablesAndConstants from "./components/VariablesAndConstants";
import TodoItem from "./components/todos/TodoItem";
import TodoList from "./components/todos/TodoList";

export default function Lab3() {
  console.log("Hello World!");
  return (
    <div id="wd-lab3" className="container-fluid">
      <h3>Lab 3</h3>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals />
      <SimpleArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FindIndex />
      <FilterFunction />
      <JsonStringify />
      <House />
      <TodoItem />
      <TodoList />
      <Spreading />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />
      <Classes />
      <Styles />
      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione
        eaque illo minus cum, saepe totam vel nihil repellat nemo explicabo
        excepturi consectetur. Modi omnis minus sequi maiores, provident
        voluptates.
      </Highlight>
      <PathParameters />
      <AddPathParameters />
    </div>
  );
}
