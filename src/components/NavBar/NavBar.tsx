import Link from "next/link";
import logo from "@/assets/Logo.png";
import styles from "@/components/NavBar/styles.module.css";
import Image from "next/image";

function NavBar(): JSX.Element {
  return (
    <div className="row navbar navbar-dark bg-dark ">
      <div className="d-flex align-items-center">
        <Link href="/" className={styles.link}>
          <div className="col-auto ms-4">
            <Image src={logo} alt="logo" layout="intrinsic" />
          </div>
        </Link>
        <nav className="col-auto">
          <ul className="d-flex mt-4 text-decoration-none">
            <li className="me-4">
              <Link href="/popular" className={styles.link}>
                Popular
              </Link>
            </li>
            <li>
              <Link href="/favoritos" className={styles.link}>
                Favoritos
              </Link>
            </li>
          </ul>
        </nav>
        <div className="ms-auto">
          <div className="d-flex align-items-center">
            <span className="bi bi-person-circle me-3"></span>
            <Image
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Avatar"
              className="rounded-circle"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
