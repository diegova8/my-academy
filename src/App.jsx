import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center my-8">Authentication</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl mb-4">Register</h2>
          <RegisterForm />
        </div>
        <div>
          <h2 className="text-2xl mb-4">Login</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default App;
