import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
          padding: "20px",
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
          color: "#333",
        }}
      >
        <h1 style={{ fontSize: "3em", marginBottom: "0.5em" }}>404</h1>
        <h2 style={{ fontSize: "1.5em", marginBottom: "1em" }}>
          Page Not Found
        </h2>
        <p
          style={{
            fontSize: "1.1em",
            maxWidth: "400px",
            lineHeight: "1.5",
            marginBottom: "1.5em",
          }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
          Please check the URL or try navigating from our homepage.
        </p>
        <Link href="/" passHref>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "1em",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Go back to the homepage
          </button>
        </Link>
      </div>
    </>
  );
}
