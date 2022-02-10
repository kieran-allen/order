import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { sortNames } from "../utils/sortNames";

type FormProps = {
  names: string;
};

const Home: NextPage = () => {
  const {
    query: { n: names },
    push: pushRoute,
  } = useRouter();

  const { register, handleSubmit } = useForm<FormProps>();

  const onSubmit = handleSubmit((values) => {
    const query = values.names
      .trim()
      .split(",")
      .filter((n) => !!n)
      .reduce((prev, curr, i) => (!i ? `?n=${curr}` : `${prev}&n=${curr}`), "");
    pushRoute(query);
  });

  // if we have an array of names.
  if (Array.isArray(names) && names.length) {
    return (
      <div className="card-container">
        <button onClick={() => pushRoute('/')} className="text-white text-sm underline self-start">
          &#8592; Go back
        </button>
        <header>
          <h1 className="text-4xl">Order:</h1>
        </header>
        {sortNames(names).map((n, i) => (
          <div className="card" key={i}>
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
