import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { ButtonGroup, Form } from "react-bootstrap";

interface ModalLoginProps {
  show: boolean;
  handleClose: () => void;
  register: boolean;
  handleChangeRegister: (isRegister: boolean) => void;
  onLoginSuccess?: () => void; // Callback para manejar el éxito del login
}

// API call for registration
async function registerUser(name: string, email: string, password: string) {
  const res = await fetch("https://nest-postgres-blpc.onrender.com/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  return data;
}

// API call for login
async function loginUser(email: string, password: string) {
  const res = await fetch("https://nest-postgres-blpc.onrender.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return data;
}

function ModalLogin({
  show,
  handleClose,
  register,
  handleChangeRegister,
  onLoginSuccess, // Prop para manejar el éxito del login
}: ModalLoginProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (register) {
      // Manejar registro
      const result = await registerUser(name, email, password);
      console.log("Registration result: ", result);
    } else {
      // Manejar login
      const result = await loginUser(email, password);
      console.log("Login result: ", result);

      if (result.token) {
        // Guardar token en localStorage
        localStorage.setItem("token", result.token);

        // Llamar al callback para manejar redirección
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        console.error("Login failed, no token received");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} data-bs-theme="dark">
      <Modal.Header closeButton>
        <ButtonGroup size="lg" className="mb-2">
          <Button
            variant={register ? "outline-warning" : "warning"}
            onClick={() => handleChangeRegister(true)}
          >
            Sign up
          </Button>
          <Button
            variant={!register ? "outline-success" : "success"}
            onClick={() => handleChangeRegister(false)}
          >
            Log In
          </Button>
        </ButtonGroup>
      </Modal.Header>
      <Modal.Body>
        <div className="row text-light">
          <div className="col-7">
            <h6 className="mb-4">{register ? "Register" : "Log In"}</h6>
            <Form onSubmit={handleSubmit}>
              {register && (
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {register ? "Sign Up" : "Log In"}
              </Button>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalLogin;
