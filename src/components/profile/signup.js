import {useState} from "react";
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const [newUser, setNewUser] = useState({});
  const navigate = useNavigate();
  const signup = () => service.signup(newUser).then(() => navigate('/profile')).catch(e => alert(e));
  return (
    <div>
      <h1>Signup</h1>
        <input onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
               placeholder="First Name"
               className="mb-2 form-control"/>
        <input onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
               placeholder="Last Name"
               className="mb-2 form-control"/>
      <input onChange={(e) => setNewUser({...newUser, username: e.target.value})}
             placeholder="Username"
             className="mb-2 form-control"/>
      <input onChange={(e) => setNewUser({...newUser, password: e.target.value})}
             type="password"
             placeholder="Password"
             className="mb-2 form-control"/>
      <input onChange={(e) => setNewUser({...newUser, email: e.target.value})}
             type="email"
             placeholder="Email"
             className="mb-2 form-control"/>
      <button onClick={signup}
              className="btn btn-primary mb-5">Signup</button>
    </div>
  );
}
export default Signup;

