import {PropagateLoader} from "react-spinners";


export default function Spinner({fullwidth}) {
  return (
    <div className="flex justify-center" fullwidth={fullwidth}>
      <PropagateLoader speedMultiplier={3} color={'#555'} />
    </div>
  );
}