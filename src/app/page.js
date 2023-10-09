import styles from "./page.module.css";

export default function Home() {

  return (
    <main>
      <div className={styles.homepage}>

        <a
          href="/products"
        >
          <button>
          <h2>
            Products Listing Page
          </h2>
          </button>
        </a>

      </div>
    </main>
  )
}
