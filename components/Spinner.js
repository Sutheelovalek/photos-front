import {PropagateLoader} from "react-spinners";


export default function Spinner({fullWidth}) {
  return (
    <div className="flex justify-center" fullWidth={fullWidth}>
      <PropagateLoader speedMultiplier={3} color={'#555'} />
    </div>
  );
}