import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { generateNewQueryParams } from "../utils/generateNewQueryParams";
import { getRound } from "../utils/getRound";

import { sortNames } from "../utils/sortNames";

type FormProps = {
  names: string;
};

const Home: NextPage = () => {
  const {
    query: { n: names, r: round = "0" },
    push: pushRoute,
  } = useRouter();

  const { register, handleSubmit } = useForm<FormProps>();

  const onSubmit = handleSubmit((values) => {
    const query = values.names
      .trim()
      .split(",")
      .filter((n) => !!n)
      .reduce(
        (prev, curr, i) => (!i ? `?r=${round}&n=${curr}` : `${prev}&n=${curr}`),
        ""
      );
    pushRoute(query);
  });

  // if we have an array of names.
  if (Array.isArray(names) && names.length) {
    return (
      <div className="card-container">
        <button
          onClick={() => pushRoute("/")}
          className="text-white text-sm underline self-start"
        >
          &#8592; Go back
        </button>
        <div className="flex place-content-between">
          <button
            onClick={() =>
              pushRoute(generateNewQueryParams(names, getRound(round) + 1))
            }
            className="text-white text-sm underline self-start"
          >
            🎲 Reorder
          </button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/kieran-allen/order"
            className="text-white text-sm underline self-start"
          >
            GitHub
          </a>
        </div>
        <header>
          <h1 className="text-4xl">Order:</h1>
        </header>
        {sortNames(names, getRound(round)).map((n, i) => (
          <div className="card" tabIndex={0} key={i}>
            {i + 1}. {n}
          </div>
        ))}
      </div>
    );
  }

  return (
    <form className="name-input-form" onSubmit={onSubmit}>
      <label className="name-input-label" htmlFor="name-input">
        Enter a list of names:
      </label>
      <input
        {...register("names")}
        id="name-input"
        className="name-input"
        placeholder="foo,bar,baz"
        autoFocus={true}
      />
      <button className="name-input-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Home;
