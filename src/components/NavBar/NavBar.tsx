import Link from "next/link";
import logo from "@/assets/Logo.png";
import styles from '@/components/NavBar/styles.module.css'
import Image from "next/image";

function NavBar(): JSX.Element {
  return (
    <div className="row navbar navbar-dark bg-dark ">
      <div className="w-25 col-2 ms-4">
        <Image src={logo} alt="logo" layout="intrinsic" />
      </div>
      <nav className="col-8 " >
        <ul className="d-flex mt-4 text-decoration-none">
          <li className="me-4">
            <Link href="/popular" className={styles.link}>Popular</Link>
          </li>
          <li>
            <Link href="/favoritos" className={styles.link}>Favoritos</Link>
          </li>
        </ul>
        <span className="bi bi-person-circle"></span>
      </nav>
    </div>
  );
}
export default NavBar;
