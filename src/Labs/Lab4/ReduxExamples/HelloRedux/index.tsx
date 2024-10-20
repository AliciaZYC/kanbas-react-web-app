import { useSelector, useDispatch } from "react-redux";
export default function HelloRedux() {
  const { message } = useSelector((state: any) => state.helloReducer);
  return (
    <div id="wd-hello-redux">
      <h2>Hello Redux</h2>
      <h4>{message}</h4> <hr />
    </div>
  );
}
