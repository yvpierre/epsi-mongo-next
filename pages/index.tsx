import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import MoviesList from "../components/moviesList";
import Navbar from "../components/navbar";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container">
      <Head>
        <title>EPSI Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <header>
            <Navbar/>
        </header>
      <main>
          <div className={"header"}>
              <h1 className="title">
                  API<br/>Movies
              </h1>
              <p>- Movies are filtered to only propose those over 8.5 on IMDb and with at least one director.<br/>- Movies fetched via API, app built with Next and Mongo</p>
              <p>To Be Done: Add a form to proceed CRUD on a list item (route already existing), auth (register and login btns not working rn) </p>
                <p>API Documentation available <a href="/swagger">here</a></p>
              <p>By Pierre Yvenou, 2024</p>

          </div>
          <MoviesList/>

      </main>

      <footer>
        <a
          href="https://www.linkedin.com/in/yvpierre/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pierre Yvenou - EPSI 2024
        </a>
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
