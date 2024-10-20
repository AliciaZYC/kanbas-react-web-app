import ReduxExamples from "./ReduxExamples";
import ArrayStateVariable from "./components/ArrayStateVariable";
import BooleanStateVariables from "./components/BooleanStateVariables";
import ClickEvent from "./components/ClickEvent";
import Counter from "./components/Counter";
import DateStateVariable from "./components/DateStateVariable";
import EventObject from "./components/EventObject";
import ObjectStateVariable from "./components/ObjectStateVariable";
import ParentStateComponent from "./components/ParentStateComponent";
import PassingDataOnEvent from "./components/PassingDataOnEvent";
import PassingFunctions from "./components/PassingFunctions";
import StringStateVariables from "./components/StringStateVariables";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab4" className="container-fluid">
      <h2>Lab4</h2>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <ReduxExamples />
    </div>
  );
}
