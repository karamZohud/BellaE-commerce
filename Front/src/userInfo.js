import { useState } from 'react';
import './App.css';

function userInfo() {
  const [userInfo,setUserInfo]=useState({
    email:'',
passwors:'',
rePassword:'',
text:'',
  })

function handleForm(e){
  setUserInfo({...userInfo,[e.target.name]: e.target.value});
}

  return (
   <div className="container mt-3">
  <h2>Stacked form</h2>
  <form action="/action_page.php">
    <div className="mb-3 mt-3">
      <label htmlFor="email">Email:</label>
      <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={userInfo.email} onChange={handleForm}  />
    </div>
    <div className="mb-3">
      <label htmlFor="pwd">Password:</label>
      <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="passwors" value={userInfo.passwors} onChange={handleForm}/>
    </div>
    <div className="mb-3">
      <label htmlFor="rpwd">Password confirmation:</label>
      <input type="password" className="form-control" id="rpwd" placeholder="Enter password again" name="rePassword" value={userInfo.rePassword} onChange={handleForm} />
    </div>
    <div className=" mb-3">
      <label className="form-label">Text area</label>
      <textarea className="form-control" type="text" name="text" value={userInfo.text} onChange={handleForm} ></textarea>

    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>


  );
}

export default userInfo;
